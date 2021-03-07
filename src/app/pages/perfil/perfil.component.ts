import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    name: new FormControl([
      '', [Validators.required]
    ]),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
