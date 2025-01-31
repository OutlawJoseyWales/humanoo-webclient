import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {BookService} from '../../../services/book.service';
import {Book} from '../../../models/book.model';
import {NgIf} from '@angular/common';
import {BookCrudComponent} from '../../../shared/book-crud/book-crud.component';
import {ToastService} from '../../../services/toast.service';


@Component({
  selector: 'app-book-form',
  standalone: true,
  templateUrl: './book-form.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    BookCrudComponent
  ]
})
export class BookFormComponent implements OnInit {
  book: Book | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const bookId = +this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBookById(bookId).subscribe({
      next: (book) => this.book = book,
      error: (err) => {
        console.error('Error fetching book:', err);
        this.toastService.show('Failed to load the book.', 'bg-danger text-light');
        this.router.navigate(['']); // Redirect if book not found
      }
    });
  }

  onFormSubmit(updatedBook: Book) {
    if (!this.book) return;

    this.bookService.updateBook(this.book.id, updatedBook).subscribe({
      next: () => {
        this.toastService.show('Book updated!', 'bg-success text-light');
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Error updating book:', err);
        this.toastService.show('Failed to update the book.', 'bg-danger text-light');
      }
    });
  }
}
