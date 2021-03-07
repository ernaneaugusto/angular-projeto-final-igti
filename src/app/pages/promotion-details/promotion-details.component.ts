import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotion-details',
  templateUrl: './promotion-details.component.html',
  styleUrls: ['./promotion-details.component.scss']
})
export class PromotionDetailsComponent implements OnInit {

  public isFavorite = false;
  public favoriteInfo = "";

  constructor() { }

  ngOnInit(): void {
  }

  public toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.favoriteInfo = this.isFavorite ? "Remover das favoritas" : "Adicionar às favoritas"
  }

}
