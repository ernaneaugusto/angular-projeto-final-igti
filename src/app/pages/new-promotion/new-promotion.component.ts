import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewPromotionService } from './services/new-promotion.service';
import { Promotion } from './../../shared/models/promotion/promotion.interface';
import { ActivatedRoute } from '@angular/router';
import { PromotionModel } from 'src/app/shared/models/promotion/promotion.model';
import { EstablishmentService } from './../../services/establishment.service';
import { LoginService } from './../../services/login.service';

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
    show: false
  };
  public form: FormGroup = new FormGroup({
    id: new FormControl('', []),
    name: new FormControl('', [Validators.required]),
    validity: new FormControl('', [Validators.required]),
    stars: new FormControl('', [Validators.required]),
    starsMin: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    expirate: new FormControl('', [Validators.required]),
    product: new FormControl('', [Validators.required]),
    weekDays: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    establishmentId: new FormControl('', [Validators.required]),
  });

  // Edit flow
  public promotionId: string = '';
  public establishmentId: string = '';
  public isFlowEdit: boolean = false;
  public promotion: Array<PromotionModel> = [];

  get f() {
    return this.form.controls;
  }

  constructor(
    private newPromotionService: NewPromotionService,
    private establishmentService: EstablishmentService,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const {id: idPromotion} = this.loginService.getUserLocalStorage();
    const routeId = this.activatedRoute.snapshot.params;    

    if(routeId.id?.length > 0) {
      this.activatedRoute.params.subscribe(() => {
        this.promotionId = routeId.id;
        this.isFlowEdit = true;

        this.newPromotionService
          .getPromotionById(this.promotionId)
          .subscribe((promotion: Promotion) => {
            const {
              id: idPromo,
              name,
              validity,
              stars,
              starsMin,
              category,
              product,
              weekDays,
              description,
              establishmentId,
              expirate,
            } = promotion;

            this.form.setValue({
              id: idPromo,
              name,
              validity,
              stars,
              starsMin,
              category,
              product,
              weekDays,
              description,
              establishmentId,
              expirate,
            });
          });
      });
    } else {
      this.establishmentService
        .getPromotionByEstablishment(idPromotion)
        .subscribe((data: any) => {
          this.establishmentId = data[0].establishmentId;
          this.form.patchValue({
            establishmentId: this.establishmentId
          })
        });
    }
  }

  public submitForm(): void {
    const data: Promotion = this.form.value;
    // data.establishmentId = '1';

    // Reset error infos
    this.submitInfo = {
      message: '',
      type: '',
      show: false
    };

    if (!this.isFlowEdit) {
      this.newPromotionService.setNewPromotion(this.form.value).subscribe(
        () => {
          this.form.reset();
          this.submitInfo.message = 'Promoção cadastrada com sucesso!';
          this.submitInfo.type = 'success';
          this.submitInfo.show = true;
        },
        () => {
          this.errorSubmit = true;
          this.submitInfo.message = 'Erro ao cadastrar Promoção!';
          this.submitInfo.type = 'danger';
          this.submitInfo.show = true;
        }
      );
    } else {
      const editData = {
        ...this.form.value,
        id: this.promotionId,
      };

      this.newPromotionService.editPromotion(editData).subscribe(
        () => {
          if(this.promotionId) {
            this.form.setValue(editData);
          } else {
            this.form.reset();
          }
          
          this.submitInfo.message = 'Promoção atualizada com sucesso!';
          this.submitInfo.type = 'success';
          this.submitInfo.show = true;
        },
        () => {
          this.errorSubmit = true;
          this.submitInfo.message = 'Erro ao atualizar Promoção!';
          this.submitInfo.type = 'danger';
          this.submitInfo.show = true;
        }
      );
    }
  }
}
