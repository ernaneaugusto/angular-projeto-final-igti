import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-promo',
  templateUrl: './card-promo.component.html',
  styleUrls: ['./card-promo.component.scss']
})
export class CardPromoComponent implements OnInit {

  @Input() promotion: any;
  @Input() isAdmin: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
