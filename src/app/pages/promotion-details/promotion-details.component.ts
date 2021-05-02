import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, PromotionInfo } from './../../services/user.service';
import { LoginService } from './../../services/login.service';
import { StatusMessage } from './../../shared/components/status-message/model/status-message.interface';
import { PromotionsService } from 'src/app/services/promotions.service';
import { Promotion } from './../../shared/models/promotion/promotion.interface';
import { PromotionModel } from 'src/app/shared/models/promotion/promotion.model';

@Component({
  selector: 'app-promotion-details',
  templateUrl: './promotion-details.component.html',
  styleUrls: ['./promotion-details.component.scss'],
})
export class PromotionDetailsComponent implements OnInit {
  public isFavorite = false;
  public userInCurrentPromotion = false;
  public favoriteInfo = '';
  public promoDetails: Array<PromotionModel> = [];
  public submitInfo: StatusMessage = {
    message: '',
    type: '',
    show: false,
  };
  public loaderInfo: StatusMessage = {
    message: '',
    type: '',
    show: false,
  };
  private promotionInfo: PromotionInfo = {
    id: '',
    userId: '',
    promotionId: '',
    isFavorite: false,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private promotionService: PromotionsService,
    private loginService: LoginService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const { id } = params;
      const { id: idUser } = this.loginService.getUserLocalStorage();
      this.promotionInfo.promotionId = id;
      this.promotionInfo.userId = idUser;

      this.promotionService.getPromotionById(id).subscribe(
        (promo: Array<Promotion>) => {
          this.promoDetails = promo;
          this.promotionInfo.id = promo[0].id;
        },
        () => {
          this.loaderInfo.message =
            'Não foi possível carregar as informações. Tente novamente.';
          this.loaderInfo.type = 'danger';
          this.loaderInfo.show = true;
        }
      );

      // Busca Promocoes para validar se usuario ja participa
      this.userService
        .getPromotionByUser(this.promotionInfo.userId)
        .subscribe((promos: Array<PromotionInfo>) => {
          const userInPromo = this.userInPromotion(promos);

          // Valida participacao do usuario na Promocao atual
          // mostrando o botao Participar ou Sair da Promocao
          if (userInPromo) {
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
    this.userService.setPromotionToUser(this.promotionInfo).subscribe(
      (promoInfo: PromotionInfo) => {
        this.promotionInfo = promoInfo;
        this.submitInfo.message =
          'Sucesso! Você já está participando dessa Promoção.';
        this.submitInfo.type = 'success';
        this.submitInfo.show = true;
        // Exibe o botao de Sair da Promocao
        this.userInCurrentPromotion = true;
      },
      () => {
        this.submitInfo.message =
          'Ocorreu um erro inesperado! Tente novamente.';
        this.submitInfo.type = 'danger';
        this.submitInfo.show = true;
      }
    );
  }

  public leavePromotion(): void {
    const confirmLeave = confirm(
      'Se você sair da Promoção perderá todas as Estrelas/Valor atual acumulado. Tem certeza que deseja sair?'
    );

    if (confirmLeave) {
      this.userService.deletePromotionToUser(this.promotionInfo.id).subscribe(
        (res) => {
          this.submitInfo.message =
            'Sucesso! Você não está mais participando dessa Promoção.';
          this.submitInfo.type = 'success';
          this.submitInfo.show = true;
          this.isFavorite = false;
          // Exibe o botao de Participar
          this.userInCurrentPromotion = false;
        },
        () => {
          this.submitInfo.message =
            'Ocorreu um erro inesperado! Tente novamente.';
          this.submitInfo.type = 'danger';
          this.submitInfo.show = true;
        }
      );
    }
  }

  public toggleFavorite(): void {
    const favorite = {
      ...this.promotionInfo,
      isFavorite: !this.promotionInfo.isFavorite,
    };

    this.userService
      .updatePromotionToUser(favorite)
      .subscribe((promoInfo: PromotionInfo) => {
        this.promotionInfo = promoInfo;
      });

    this.isFavorite = !this.isFavorite;
    this.favoriteInfo = this.isFavorite
      ? 'Remover das favoritas'
      : 'Adicionar às favoritas';
  }

  // Retorna a Promocao se o usuarioestiver participando
  private userInPromotion(data: Array<any>): PromotionInfo {
    return data.find((item) => {
      return (
        item.userId == this.promotionInfo.userId &&
        item.promotionId == this.promotionInfo.promotionId
      );
    });
  }
}
