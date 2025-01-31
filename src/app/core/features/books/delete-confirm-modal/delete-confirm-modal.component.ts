import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html',
})
export class DeleteConfirmModalComponent {
  @Input() itemName?: string;

  constructor(public activeModal: NgbActiveModal) {}

  confirmDelete() {
    this.activeModal.close('deleteConfirmed');
  }
}
