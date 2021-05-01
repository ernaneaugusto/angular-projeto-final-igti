import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user/user.interface';
import { StatusMessage } from './../../shared/components/status-message/model/status-message.interface';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  private userId: string = '';
  public userType: string = '';
  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  public submitInfo: StatusMessage = {
    message: '',
    type: '',
    show: false,
  };

  constructor(
    private user: UserService,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userType = this.loginService.getUserLocalStorage().type;
    
    this.activatedRoute.params.subscribe(() => {
      const idParms = this.activatedRoute.snapshot.params.id;
      // @TODO: verificar se a regra abaixo esta funcionando corretamente
      const id = idParms ? idParms : this.loginService.getUserLocalStorage().id;

      if (id && id.length > 0) {
        this.userId = id;

        this.user.getUserById(this.userId).subscribe((user: User) => {
          console.log("## data", user);
          
          const {
            name,
            email,
            birthday,
            type,
            address,
            city,
            district,
            state
          } = user;

          this.form.setValue({
            name,
            email,
            birthday: birthday ? birthday : '',
            type,
            password: '',
            confirmPassword: '',
            address: address ? address : '',
            city: city ? city : '',
            district: district ? district : '',
            state: state ? state : '',
          });
        });
      }
    });
  }

  public submitForm() {
    this.submitInfo.show = true;

    const data: User = {
      id: this.userId,
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
      address,
      city,
      district,
      state
    } = this.form.value;

    data.name = name;
    data.email = email;
    data.birthday = birthday;
    data.type = type;
    data.address = address;
    data.city = city;
    data.district = district;
    data.state = state;
    data.id = this.userId;

    if (password !== '' || confirmPassword !== '') {
      data.password = password;
      data.confirmPassword = confirmPassword;
    }

    this.user.updateUser(data).subscribe(
      () => {
        this.submitInfo.message = 'Dados atualizados com sucesso!';
        this.submitInfo.type = 'success';
        
        // Seta os campos como vazio por seguranca
        this.form.patchValue(
          {
            password: '',
            confirmPassword: ''
          }
        );

        // Os campos de Senha e Confirmar Senha sao obrigatorios
        // com isso atualizamos o status do form para untouched
        // para que as mensagens de validacao deles nao apareca 
        this.form.markAsUntouched();
        this.form.updateValueAndValidity();
      },
      () => {
        this.submitInfo.message = 'Não foi possível atualizar os dados!';
        this.submitInfo.type = 'danger';
      }
    );
  }
}
