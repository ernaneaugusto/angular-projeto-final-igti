import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { User } from './../../shared/models/user/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup = new FormGroup({
    loginEmail: new FormControl('', [Validators.required, Validators.email]),
    loginPassword: new FormControl('', [Validators.required]),
  });

  public formRegister: FormGroup = new FormGroup({
    registerName: new FormControl('', [Validators.required]),
    registerEmail: new FormControl('', [Validators.required, Validators.email]),
    registerPassword: new FormControl('', [Validators.required]),
    registerConfirmPassword: new FormControl('', [Validators.required]),
    registerType: new FormControl('C', [Validators.required]),
  });

  public registerSuccess: boolean = false;
  public errorSubmit: boolean = false;
  public submitInfo = {
    message: '',
    type: '',
    show: false,
  };

  constructor(private user: UserService) {}

  public submitFormRegister(): void {
    const form = this.formRegister;

    if (form.valid) {
      this.registerSuccess = false;
      this.submitInfo.show = true;

      const f = form.value;
      const data: User = {
        name: f.registerName,
        email: f.registerEmail,
        password: f.registerPassword,
        confirmPassword: f.registerConfirmPassword,
        type: f.registerType,
      };

      this.user.setRegisterUser(data).subscribe(
        () => {
          this.formRegister.reset();
          this.registerSuccess = true;
          this.submitInfo.message =
            'Usuário cadastrado com sucesso! Faça login e aproveite as Promoções dos nossos parceiros';
          this.submitInfo.type = 'success';
        },
        () => {
          this.registerSuccess = false;
          this.errorSubmit = true;
          this.submitInfo.message = 'Erro ao cadastrar novo Usuário!';
          this.submitInfo.type = 'danger';
        }
      );
    }
  }

  ngOnInit(): void {}
}
