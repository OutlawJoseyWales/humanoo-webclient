import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Book} from '../../../models/book.model';
import {BookService} from '../../../services/book.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {AddBookModalComponent} from '../../../shared/add-book-modal/add-book-modal.component';
import {DeleteConfirmModalComponent} from '../delete-confirm-modal/delete-confirm-modal.component';
import {ToastService} from '../../../services/toast.service';

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
    private modalService: NgbModal,
    private toastService: ToastService,
  ) {
    this.books$ = this.bookService.books$;
  }

  ngOnInit(): void {
    this.bookService.fetchBooks();
  }

  openAddBookModal() {
    const modalRef = this.modalService.open(AddBookModalComponent, { size: 'lg' });
    // If user successfully closes the modal (book added),
    // we refresh the list
    modalRef.closed.subscribe(result => {
      if (result === 'book-added') {
        this.bookService.fetchBooks();
      }
    });
  }

  editBook(bookId: number): void {
    this.router.navigate(['/books/edit', bookId]);
  }

  deleteBook(bookId: number): void {
    this.bookService.deleteBook(bookId).subscribe({
      next: () => {
        this.bookService.fetchBooks();
        this.toastService.show('Book deleted!', 'bg-danger text-light');
      },
      error: () => {
        this.toastService.show('Failed to delete book.', 'bg-danger text-light');
      }
    });
  }

  confirmDelete(book: Book) {
    // Open the delete modal, pass in the itemName or other data
    const modalRef = this.modalService.open(DeleteConfirmModalComponent);
    modalRef.componentInstance.itemName = book.title;

    // Subscribe to modal close
    modalRef.closed.subscribe(result => {
      if (result === 'deleteConfirmed') {
        this.deleteBook(book.id);
      }
    });
  }
}
