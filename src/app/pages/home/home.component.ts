import { Component, OnDestroy, OnInit } from '@angular/core';
import { PromotionsService } from 'src/app/services/promotions.service';
import { Promotion } from 'src/app/shared/models/promotion/promotion.interface';
import { PromotionModel } from './../../shared/models/promotion/promotion.model';
import { Subscription } from 'rxjs';
import { LoginService } from './../../services/login.service';
import { StatusMessage } from './../../shared/components/status-message/model/status-message.interface';
import { UserService } from 'src/app/services/user.service';
import { PromotionInfo } from './../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // Promocoes para Cliente
  public allPromotionsClient: Array<PromotionModel> = [];
  public promotionsClient: Array<PromotionInfo> = [];
  // Promocoes para Admin
  public promotionsAdmin: Array<PromotionModel> = [];
  public favorites: Array<PromotionModel> = [];
  public isAdmin: boolean = false;
  public yourPromotionsInfo: StatusMessage = {
    message: '',
    type: '',
    show: false,
  };
  private subs$: Subscription = new Subscription();
  private promotionInfo: PromotionInfo = {
    id: '',
    userId: '',
    promotionId: '',
    promotionName: '',
    promotionDescription: '',
    isFavorite: false,
  };

  constructor(
    private promotionsService: PromotionsService,
    private userService: UserService,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    const {id, type} = this.loginService.getUserLocalStorage();
    this.promotionInfo.id = id;

    this.isAdmin = type === 'E' ? true : false;
    
    if(type === 'E') {
      this.subs$.add(
        this.promotionsService
          .getPromotionsByEstablishment(id)
          .subscribe((data: Array<Promotion>) => {
            const { promotions, favorites } = this.filterPromotions(data);
            this.promotionsAdmin = this.createModel(promotions);
            this.favorites = this.createModel(favorites);

            if(this.promotionsAdmin.length === 0) {
              this.yourPromotionsInfo.message = "Você não possui nenhuma Promoção!";
              this.yourPromotionsInfo.type = "warning";
              this.yourPromotionsInfo.show = true;
            }
          },
          () => {
            this.yourPromotionsInfo.message = "Ocorreu algum erro. Tente novamente.";
            this.yourPromotionsInfo.type = "danger";
            this.yourPromotionsInfo.show = true;
          })
      );

      return;
    }

    this.getAllPromotions();
    this.getClientPromotions();
  }
  
  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }

  public getClientPromotions() {
    this.userService
      .getPromotionByUser(this.promotionInfo.id)
      .subscribe((promos: Array<PromotionInfo>) => {
        this.promotionsClient = this.createPromotionInfoModel(promos);
        console.log("##promos ", promos);
      },
      () => {
        this.yourPromotionsInfo.message = "Ocorreu algum erro ao buscar suas Promoções. Tente novamente.";
        this.yourPromotionsInfo.type = "danger";
        this.yourPromotionsInfo.show = true;
      });
  }

  public getAllPromotions() {
    this.promotionsService
      .getPromotions()
      .subscribe((promos: Array<PromotionModel>) => {
        this.allPromotionsClient = this.createModel(promos);
      },
      () => {
        this.yourPromotionsInfo.message = "Ocorreu algum erro ao buscar as Promoções. Tente novamente.";
          this.yourPromotionsInfo.type = "danger";
          this.yourPromotionsInfo.show = true;
      });
  }

  public deletePromotion(event: PromotionModel) {
    const promotion = event;

    this.subs$.add(
      this.promotionsService
        .deletePromotion(event.id)
        .subscribe(() => {
          alert(`Promoção ${promotion.name} excluída com sucesso!`);
        }, () => {
          alert(`Error ao excluir a Promoção ${promotion.name}!`)
        })
    );
  }

  private filterPromotions(promos: Array<PromotionModel>): { promotions: Array<PromotionModel>, favorites: Array<PromotionModel> } {
    const promotions: Array<PromotionModel> = [];
    const favorites: Array<PromotionModel> = [];

    promos.forEach(item => {
      if(item.isFavorite) {
        favorites.push(item);
      } else {
        promotions.push(item);
      }
    });
    
    return { promotions, favorites };
  }

  private createModel(promotion: Array<Promotion>) {
    const promotionModel = new Array<PromotionModel>();

    promotion.map((promo: Promotion) => {
      promotionModel.push(new PromotionModel(promo));
    });

    return promotionModel;
  }
  
  private createPromotionInfoModel(promotion: Array<PromotionInfo>) {
    const promotionModel: Array<PromotionInfo> = [];

    promotion.map((promo: PromotionInfo) => {
      promotionModel.push(promo);
    });

    return promotionModel;
  }
}
