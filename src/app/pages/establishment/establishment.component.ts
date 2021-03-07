import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.scss']
})
export class EstablishmentComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    name: new FormControl([
      '', [Validators.required]
    ]),
    address: new FormControl([
      '', [Validators.required]
    ]),
    state: new FormControl([
      '', [Validators.required]
    ]),
    city: new FormControl([
      '', [Validators.required]
    ]),
    district: new FormControl([
      '', [Validators.required]
    ]),
    operationHours: new FormControl([
      '', [Validators.required]
    ]),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
