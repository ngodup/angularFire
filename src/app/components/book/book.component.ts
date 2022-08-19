import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IBook } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent {
  book: IBook = { name: '', author: '', genre: '', price: 0 };

  constructor(private bookService: BookService) {}

  onSubmit(form: NgForm) {
    this.book.price = +this.book.price;
    this.bookService.addBook(this.book).then(() => form.reset());
  }
}