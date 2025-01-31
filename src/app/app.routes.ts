import { Routes } from '@angular/router';
import { BookFormComponent } from './core/features/books/book-form/book-form.component';
import { BookListComponent } from './core/features/books/book-list/book-list.component';

export const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'books/edit/:id', component: BookFormComponent },
];
