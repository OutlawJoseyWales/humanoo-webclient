import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BookService} from '../../../services/book.service';
import {Book} from '../../../models/book.model';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-book-form',
  standalone: true,
  templateUrl: './book-form.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ]
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  bookId?: number;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      author: ['', [Validators.required]],
      description: [''],
      price: [0],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.bookId = +id;
        this.bookService.getBookById(this.bookId).subscribe(book => {
          this.bookForm.patchValue({
            title: book.title,
            author: book.author,
            description: book.description,
            price: book.price
          });
        });
      }
    });
  }

  saveBook(): void {
    if (this.bookForm.invalid) {
      return;
    }
    const formValue: Book = this.bookForm.value;

    if (this.bookId) {
      this.bookService.updateBook(this.bookId, formValue).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.bookService.createBook(formValue).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
