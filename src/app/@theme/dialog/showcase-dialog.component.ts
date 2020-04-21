import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  template: `
    <nb-card status="{{status}}">
      <nb-card-header>{{ title }}</nb-card-header>
      <nb-card-body>
       {{ message }}
      </nb-card-body>
      <nb-card-footer>
        <button nbButton  (click)="dismiss()" class="btn btn-danger btn-sm float-right">CLOSE</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class ShowcaseDialogComponent {
  @Input() title: string;
  @Input() message: string;
  @Input() status: string;

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>) {
    //this.status="warning";
  }

  dismiss() {
    this.ref.close();
  }
}
