import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-promotion',
  templateUrl: './new-promotion.component.html',
  styleUrls: ['./new-promotion.component.scss']
})
export class NewPromotionComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    validity: new FormControl('', [
      Validators.required,
    ]),
    stars: new FormControl('', [
      Validators.required,
    ]),
    starsMin: new FormControl('', [
      Validators.required,
    ]),
    category: new FormControl('', [
      Validators.required,
    ]),
    expirate: new FormControl('', [
      Validators.required,
    ]),
    product: new FormControl('', [
      Validators.required,
    ]),
    weekDays: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
