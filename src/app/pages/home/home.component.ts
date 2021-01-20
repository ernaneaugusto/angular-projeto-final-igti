import { Component, Input, OnInit } from '@angular/core';
import { PromotionsService } from 'src/app/services/promotions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public promotions: Array<any> = [];

  constructor(private promotionsService: PromotionsService) { }

  ngOnInit(): void {
    this.promotionsService
      .getPromotions()
      .subscribe((data: []) => {
        this.promotions = data;        
      });
  }

}
