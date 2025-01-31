import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Book} from '../../../models/book.model';
import {BookService} from '../../../services/book.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {AddBookModalComponent} from '../../../shared/add-book-modal/add-book-modal.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf
  ]
})
export class BookListComponent implements OnInit {
  books$: Observable<Book[]>;

  constructor(
    private bookService: BookService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.books$ = this.bookService.books$;
  }

  ngOnInit(): void {
    this.bookService.fetchBooks();
  }

  openAddBookModal() {
    const modalRef = this.modalService.open(AddBookModalComponent, { size: 'lg' });
    // If user successfully closes the modal (book added),
    // we refresh the list:
    modalRef.closed.subscribe(result => {
      if (result === 'book-added') {
        this.bookService.fetchBooks();
      }
    });
  }

  editBook(bookId: number): void {
    // We can still navigate, or do a separate modal for editing, etc.
    this.router.navigate(['/books/edit', bookId]);
  }

  deleteBook(bookId: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(bookId).subscribe(() => {
        this.bookService.fetchBooks();
      });
    }
  }
}
