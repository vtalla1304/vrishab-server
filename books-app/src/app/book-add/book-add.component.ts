
import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent {

  bookForm: FormGroup;

  constructor(private bookService: BookService, private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      year: ['', Validators.required],
      summary: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.bookService.addBook(this.bookForm.value).subscribe(data => {
        console.log('Book added successfully!', data);
      });
    }
  }
}
