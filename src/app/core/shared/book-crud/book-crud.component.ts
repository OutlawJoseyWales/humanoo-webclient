import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-book-crud',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-crud.component.html',
})
export class BookCrudComponent implements OnInit {
  @Input() initialData: Partial<Book> = {};
  @Output() formSubmit = new EventEmitter<Book>();

  bookForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: [''],
      price: [null, [Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    if (this.initialData) {
      this.bookForm.patchValue(this.initialData);
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      this.formSubmit.emit(this.bookForm.value);
    }
  }
}
