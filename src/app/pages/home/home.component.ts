import { Component, OnInit } from '@angular/core';
import { PromotionsService } from 'src/app/services/promotions.service';
import { Promotion } from 'src/app/shared/models/promotion/promotion.interface';
import { PromotionModel } from './../../shared/models/promotion/promotion.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public promotions: Array<PromotionModel> = [];

  constructor(private promotionsService: PromotionsService) {}

  ngOnInit(): void {
    this.promotionsService
      .getPromotions()
      .subscribe((data: Array<Promotion>) => {
        this.promotions = this.createModel(data);
      });
  }

  private createModel(promotion: Array<Promotion>) {
    const promotionModel = new Array<PromotionModel>();

    promotion.map((promo: Promotion) => {
      promotionModel.push(new PromotionModel(promo));
    });

    return promotionModel;
  }
}
