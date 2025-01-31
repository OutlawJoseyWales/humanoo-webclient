import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from '../../services/toast.service';

@Component({
  standalone: true,
  selector: 'app-toast-container',
  imports: [CommonModule, NgbToastModule],
  template: `
    <ngb-toast
      *ngFor="let toast of (toastService.toasts$ | async)"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay"
    >
      {{ toast.text }}
    </ngb-toast>
  `,
  host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index:1200;' }
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) {}
}
