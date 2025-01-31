import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book.model';

@Component({
  standalone: true,
  selector: 'app-add-book-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-book-modal.component.html',
})
export class AddBookModalComponent {
  bookForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private bookService: BookService
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: [''],
      price: [0],
    });
  }

  onSubmit() {
    if (this.bookForm.invalid) return;
    const book: Book = this.bookForm.value;
    this.bookService.createBook(book).subscribe({
      next: () => {

        this.activeModal.close('book-added');
      },
      error: (err) => {
        console.error('Error adding book:', err);
      }
    });
  }
}
