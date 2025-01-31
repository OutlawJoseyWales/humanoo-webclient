import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {Book} from '../../../models/book.model';
import {BookService} from '../../../services/book.service';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  imports: [
    NgbAlert,
    AsyncPipe,
    NgIf,
    NgForOf
  ]
})
export class BookListComponent implements OnInit {
  books$: Observable<Book[]>;

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
    this.books$ = this.bookService.books$;
  }

  ngOnInit(): void {
    // Fetch the books on component load
    this.bookService.fetchBooks();
  }

  addNewBook(): void {
    this.router.navigate(['/books/new']);
  }

  editBook(bookId: number): void {
    this.router.navigate(['/books/edit', bookId]);
  }

  deleteBook(bookId: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(bookId).subscribe(() => {
        // Re-fetch or remove locally
        this.bookService.fetchBooks();
      });
    }
  }
}
