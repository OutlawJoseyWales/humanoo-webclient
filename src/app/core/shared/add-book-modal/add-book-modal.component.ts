import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book.model';
import {ToastService} from '../../services/toast.service';
import {BookCrudComponent} from '../book-crud/book-crud.component';


@Component({
  standalone: true,
  selector: 'app-add-book-modal',
  imports: [CommonModule, ReactiveFormsModule, BookCrudComponent],
  templateUrl: './add-book-modal.component.html',
})
export class AddBookModalComponent {
  constructor(
    public activeModal: NgbActiveModal,
    private bookService: BookService,
    private toastService: ToastService
  ) {}

  onFormSubmit(book: Book) {
    this.bookService.createBook(book).subscribe({
      next: () => {
        this.toastService.show('Book added!', 'bg-success text-light');
        this.activeModal.close('book-added');
      },
      error: (err) => {
        console.error('Error adding book:', err);
        this.toastService.show('Failed to add the book.', 'bg-danger text-light');
      }
    });
  }
}
