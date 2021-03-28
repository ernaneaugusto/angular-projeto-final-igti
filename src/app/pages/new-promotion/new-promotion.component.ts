import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewPromotionService } from './services/new-promotion.service';
import { Promotion } from './../../shared/models/promotion/promotion.interface';

@Component({
  selector: 'app-new-promotion',
  templateUrl: './new-promotion.component.html',
  styleUrls: ['./new-promotion.component.scss'],
})
export class NewPromotionComponent implements OnInit {
  public errorSubmit = false;
  public submitInfo = {
    message: '',
    type: '',
  };
  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    validity: new FormControl('', [Validators.required]),
    stars: new FormControl('', [Validators.required]),
    starsMin: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    expirate: new FormControl('', [Validators.required]),
    product: new FormControl('', [Validators.required]),
    weekDays: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private newPromotionService: NewPromotionService) {}

  ngOnInit(): void {}

  public submitForm(): void {
    const data: Promotion = this.form.value;
    data.establishmentId = '1'; 

    this.newPromotionService.setNewPromotion(this.form.value).subscribe(
      () => {
        this.form.reset();
        this.submitInfo.message = "Promoção cadastrada com sucesso!";
        this.submitInfo.type = "success";
      },
      () => {
        this.errorSubmit = true;
        this.submitInfo.message = "Erro ao cadastrar Promoção!";
        this.submitInfo.type = "danger";
      }
    );
  }
}
