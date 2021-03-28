import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PromotionModel } from 'src/app/shared/models/promotion/promotion.model';

@Component({
  selector: 'app-card-promo',
  templateUrl: './card-promo.component.html',
  styleUrls: ['./card-promo.component.scss'],
})
export class CardPromoComponent implements OnInit {
  @Input() promotion: any;
  @Input() isAdmin: boolean = false;
  @Output() deleteItem = new EventEmitter();

  constructor() {}

  public remove(event: PromotionModel) {
    const confirmDelete = confirm(
      `Tem certeza que quer excuir a promoção "${event.name}"`
    );

    if (confirmDelete) {
      this.deleteItem.emit(event);
    }
  }

  ngOnInit(): void {}
}
