import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user/user.interface';
import { StatusMessage } from './../../shared/components/status-message/model/status-message.interface';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  private userId: string = '';
  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
  });

  public submitInfo: StatusMessage = {
    message: '',
    type: '',
    show: false,
  };

  constructor(
    private user: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(() => {
      const { id } = this.activatedRoute.snapshot.params;

      if (id && id.length > 0) {
        this.userId = id;

        this.user.getUserById(this.userId).subscribe((user: User) => {
          const { name, email, birthday, type } = user;

          this.form.setValue({
            name,
            email,
            birthday: birthday ? birthday : '',
            type,
            password: '',
            confirmPassword: '',
          });
        });
      }
    });
  }

  public submitForm() {
    this.submitInfo.show = true;

    const data: User = {
      name: '',
      email: '',
      birthday: '',
      type: '',
    };

    const {
      name,
      email,
      birthday,
      type,
      password,
      confirmPassword,
    } = this.form.value;

    data.name = name;
    data.email = email;
    data.birthday = birthday;
    data.type = type;
    data.id = this.userId;

    if (password !== '' || confirmPassword !== '') {
      data.password = password;
      data.confirmPassword = confirmPassword;
    }

    this.user.updateUser(data).subscribe(
      () => {
        this.submitInfo.message = 'Dados atualizados com sucesso!';
        this.submitInfo.type = 'success';
        this.form.setValue(data);
      },
      () => {
        this.submitInfo.message = 'Não foi possível atualizar os dados!';
        this.submitInfo.type = 'danger';
      }
    );
  }
}
