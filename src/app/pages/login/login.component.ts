import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { User } from './../../shared/models/user/user.interface';
import { StatusMessage } from './../../shared/components/status-message/model/status-message.interface';
// import { v4 as 'uuidv4 '} from 'uuid';
import { LoginService } from './../../services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
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

  public submitInfo: StatusMessage = {
    message: '',
    type: '',
    show: false,
  };

  private subs$: Subscription = new Subscription();

  constructor(private user: UserService, private loginService: LoginService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }

  public login() {
    const form = this.formLogin;

    if (form.valid) {
      const { loginEmail, loginPassword } = form.value;
      this.subs$.add(this.loginService.login(loginEmail, loginPassword));
    }
  }

  public submitFormRegister(): void {
    const form = this.formRegister;

    if (form.valid) {
      this.submitInfo.show = true;

      const f = form.value;
      const data: User = {
        // @TODO: colocar uuidv4() em id: uuidv4()
        id: '',
        name: f.registerName,
        email: f.registerEmail,
        password: f.registerPassword,
        confirmPassword: f.registerConfirmPassword,
        type: f.registerType,
        promotions: [],
      };
      this.subs$.add(
        this.user.setRegisterUser(data).subscribe(
          () => {
            this.formRegister.reset();
            this.submitInfo.message =
              'Usuário cadastrado com sucesso! Faça login e aproveite as Promoções dos nossos parceiros';
            this.submitInfo.type = 'success';
          },
          () => {
            this.submitInfo.message = 'Erro ao cadastrar novo Usuário!';
            this.submitInfo.type = 'danger';
          }
        )
      );
    }
  }
}
