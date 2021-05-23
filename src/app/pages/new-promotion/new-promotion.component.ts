import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewPromotionService } from './services/new-promotion.service';
import { Promotion } from './../../shared/models/promotion/promotion.interface';
import { ActivatedRoute } from '@angular/router';
import { PromotionModel } from 'src/app/shared/models/promotion/promotion.model';
import { EstablishmentService } from './../../services/establishment.service';
import { LoginService } from './../../services/login.service';
import { PromotionInfo, UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user/user.interface';
import { PromotionsService } from 'src/app/services/promotions.service';
import { StatusMessage } from './../../shared/components/status-message/model/status-message.interface';

interface ClientPromos {
  id: string;
  clientId: number;
  clientName: string;
  clientStars: number;
  promotionName: string;
}

@Component({
  selector: 'app-new-promotion',
  templateUrl: './new-promotion.component.html',
  styleUrls: ['./new-promotion.component.scss'],
})
export class NewPromotionComponent implements OnInit {
  public clients: Array<ClientPromos> = [];
  public errorSubmit = false;
  public clientsInPromotion: StatusMessage = {
    message: 'Ainda não existem clientes nessa Promoção.',
    type: 'warning',
    show: true
  };
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
    private promotionsService: PromotionsService,
    private newPromotionService: NewPromotionService,
    private establishmentService: EstablishmentService,
    private loginService: LoginService,
    private userService: UserService,
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

            this.establishmentId = establishmentId;
            this.getPromotionByEstablishment();
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

          this.getPromotionByEstablishment();
        });
    }
  }

  public toggleStar(id: string, stars: number, option: "add" | "remove") {
    const isConfirm = this.confirmStar(option);

    if(!isConfirm) {
      return;
    }

    if(option === "add") {
      this.promotionsService
        .updateStarsToUser(id, stars, "add")
        .subscribe((data: PromotionInfo) => {
          // @TODO: Utilizado pois a atualizacao do json-server nao eh imediata
          // se nao utilizar o setTimeout a execucao da funcao nao reflete a
          // atualizacao do valor no back-end
          setTimeout(() => {
            this.getPromotionByEstablishment(true);
          }, 500);
        });
      
      return;
    }
    
    this.promotionsService
      .updateStarsToUser(id, stars, "remove")
      .subscribe(() => {
        // @TODO: Utilizado pois a atualizacao do json-server nao eh imediata
        // se nao utilizar o setTimeout a execucao da funcao nao reflete a
        // atualizacao do valor no back-end
        setTimeout(() => {
          this.getPromotionByEstablishment(true);
        }, 500);
      });
  }
  
  public getPromotionByEstablishment(isRelead: boolean = false) {
    // Busca os Clientes que participam das Promocoes do Estabelecimento
    this.establishmentService
      .getClientsByPromotion(this.establishmentId)
      .subscribe((clientsInPromos: Array<PromotionInfo>) => {
        if(clientsInPromos.length > 0) {
          // Ao chamar a funcao de ADD ou REMOVE estrelas
          // limpa os dados para atualizar as informacoes
          if(isRelead) this.clients = [];

          // Remove o alert para nenhum Cliente na Promocao
          this.clientsInPromotion.show = false;

          clientsInPromos.forEach((client, i) => {
            // Busca as informacoes de cada Cliente
            this.userService
              .getUserById(client.userId)
              .subscribe((user: User) => {

                this.clients.push({
                  id: clientsInPromos[i].id,
                  clientId: parseInt(user.id),
                  clientName: user.name,
                  clientStars: clientsInPromos[i].yourStars || 0,
                  promotionName: clientsInPromos[i].promotionName
                });

              });
          });
        }
      });

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

  private confirmStar(option: "add" | "remove"): boolean {
    const optionText = option === "add" ? "Adicionar" : "Remover";

    return confirm(`${optionText} 01 Estrela do cliente?`);
  }

}
