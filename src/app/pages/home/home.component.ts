import { Component, OnDestroy, OnInit } from '@angular/core';
import { PromotionsService } from 'src/app/services/promotions.service';
import { Promotion } from 'src/app/shared/models/promotion/promotion.interface';
import { PromotionModel } from './../../shared/models/promotion/promotion.model';
import { Subscription } from 'rxjs';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public promotions: Array<PromotionModel> = [];
  private subs$: Subscription = new Subscription();

  constructor(
    private promotionsService: PromotionsService,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    const {id} = this.loginService.getUserLocalStorage();
    
    this.subs$.add(
      this.promotionsService
        .getPromotionsByEstablishment(id)
        .subscribe((data: Array<Promotion>) => {
          this.promotions = this.createModel(data);
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

  private createModel(promotion: Array<Promotion>) {
    const promotionModel = new Array<PromotionModel>();

    promotion.map((promo: Promotion) => {
      promotionModel.push(new PromotionModel(promo));
    });

    return promotionModel;
  }
}
