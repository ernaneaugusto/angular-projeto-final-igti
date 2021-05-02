import { Component, OnDestroy, OnInit } from '@angular/core';
import { PromotionsService } from 'src/app/services/promotions.service';
import { Promotion } from 'src/app/shared/models/promotion/promotion.interface';
import { PromotionModel } from './../../shared/models/promotion/promotion.model';
import { Subscription } from 'rxjs';
import { LoginService } from './../../services/login.service';
import { StatusMessage } from './../../shared/components/status-message/model/status-message.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public promotions: Array<PromotionModel> = [];
  public favorites: Array<PromotionModel> = [];
  public isAdmin: boolean = false;
  public yourPromotionsInfo: StatusMessage = {
    message: '',
    type: '',
    show: false,
  };
  private subs$: Subscription = new Subscription();

  constructor(
    private promotionsService: PromotionsService,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    const {id, type} = this.loginService.getUserLocalStorage();

    this.isAdmin = type === 'E' ? true : false;
    
    this.subs$.add(
      this.promotionsService
        .getPromotionsByEstablishment(id)
        .subscribe((data: Array<Promotion>) => {
          const { promotions, favorites } = this.filterPromotions(data);
          this.promotions = this.createModel(promotions);
          this.favorites = this.createModel(favorites);

          console.table(promotions);
          console.table(favorites);
          
          
          if(this.promotions.length === 0) {
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
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
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
}
