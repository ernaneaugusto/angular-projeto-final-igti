import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  @Input() title: string = '';
  @Input() isSearchSection: boolean = true;
  @Input() isBackButton: boolean = true;
  @Input() isAdmin: boolean = true;

  constructor(private router: Router) { }

  public back(): void {
    this.router.navigateByUrl('/admin');
  }

  ngOnInit(): void {
  }

}
