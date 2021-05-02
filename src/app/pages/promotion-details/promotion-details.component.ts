import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, PromotionInfo } from './../../services/user.service';
import { LoginService } from './../../services/login.service';
import { StatusMessage } from './../../shared/components/status-message/model/status-message.interface';

@Component({
  selector: 'app-promotion-details',
  templateUrl: './promotion-details.component.html',
  styleUrls: ['./promotion-details.component.scss']
})
export class PromotionDetailsComponent implements OnInit {

  public isFavorite = false;
  public userInCurrentPromotion = false;
  public favoriteInfo = "";
  
  public submitInfo: StatusMessage = {
    message: '',
    type: '',
    show: false,
  };
  private promotionInfo: PromotionInfo = {
    id: "",
    userId: "",
    promotionId: "",
    isFavorite: false
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.promotionInfo.promotionId = params.id;
      this.promotionInfo.userId = this.loginService.getUserLocalStorage().id;

      // Busca Promocoes para validar se usuario ja participa
      this.userService
        .getPromotionByUser(this.promotionInfo.userId)
        .subscribe((res) => {
          console.log("## pomtomods", res);
          const userInPromo = this.userInPromotion(res);
          
          // Valida participacao do usuario na Promocao atual
          // mostrando o botao Participar ou Sair da Promocao
          if(userInPromo) {
            this.userInCurrentPromotion = true;
            this.isFavorite = userInPromo.isFavorite;
            this.promotionInfo.id = userInPromo.id;
            return;
          }

          this.userInCurrentPromotion = false;
          this.isFavorite = false;
        });
    });
  }

  // Cadastra usuario na Promocao
  public enterPromotion(): void {
    this.userService
      .setPromotionToUser(this.promotionInfo)
      .subscribe((res) => {
        this.submitInfo.message = "Sucesso! Você já está participando dessa Promoção."
        this.submitInfo.type = "success";
        this.submitInfo.show = true;
        // Exibe o botao de Sair da Promocao
        this.userInCurrentPromotion = true;
      },
      () => {
        this.submitInfo.message = "Ocorreu um erro inesperado! Tente novamente."
        this.submitInfo.type = "danger";
        this.submitInfo.show = true;
      }
    );
  }
  
  public leavePromotion(): void {
    console.log("## DELETE", this.promotionInfo);
    const confirmLeave = confirm("Se você sair da Promoção perderá todas as Estrelas/Valor atual acumulado. Tem certeza que deseja sair?");

    if(confirmLeave) {
      this.userService
      .deletePromotionToUser(this.promotionInfo.id)
      .subscribe((res) => {
        this.submitInfo.message = "Sucesso! Você não está mais participando dessa Promoção."
        this.submitInfo.type = "success";
        this.submitInfo.show = true;
        // Exibe o botao de Participar
        this.userInCurrentPromotion = false;
      },
      () => {
        this.submitInfo.message = "Ocorreu um erro inesperado! Tente novamente."
        this.submitInfo.type = "danger";
        this.submitInfo.show = true;
      }
    );
    }
  }

  public toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.favoriteInfo = this.isFavorite ? "Remover das favoritas" : "Adicionar às favoritas"
  }

  // Retorna a Promocao se o usuarioestiver participando
  private userInPromotion(data: Array<any>): PromotionInfo {
    return data.find(item => {
      return item.userId == this.promotionInfo.userId && item.promotionId == this.promotionInfo.promotionId;
    });
  }

}
