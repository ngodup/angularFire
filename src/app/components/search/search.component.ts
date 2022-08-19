import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest, map } from 'rxjs';
import { IBook } from 'src/app/models/book.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  books: IBook[] = [];
  isSearchEmpty: boolean;
  searchParams = {
    name: null,
    genre: null,
    author: null,
  };
  constructor(private afsCompact: AngularFirestore) {}

  onSearchBook() {
    this.books = [];
    const $name = this.afsCompact
      .collection('books', (ref) =>
        ref.where('name', '==', this.searchParams.name)
      )
      .valueChanges({ idField: 'id' });

    const $genre = this.afsCompact
      .collection('books', (ref) =>
        ref.where('genre', '==', this.searchParams.genre)
      )
      .valueChanges({ idField: 'id' });

    const $author = this.afsCompact
      .collection('books', (ref) =>
        ref.where('author', '>=', this.searchParams.author)
      )
      .valueChanges({ idField: 'id' });

    combineLatest([$name, $genre, $author])
      .pipe(map(([one, two, three]) => [...one, ...two, ...three]))
      .subscribe((response: any) => {
        this.books = response;
        if (response.length > 0) {
        } else {
          this.isSearchEmpty = true;
        }
   
      });
  }
}
