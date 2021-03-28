import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-message',
  templateUrl: './status-message.component.html',
  styleUrls: ['./status-message.component.scss'],
})
export class StatusMessageComponent implements OnInit {
  @Input() message: string = '';
  @Input() type?:
    | 'primary'
    | 'success'
    | 'danger'
    | 'secondary'
    | 'warning'
    | 'info'
    | 'dark' = 'success';

  constructor() {}

  ngOnInit(): void {}
}
