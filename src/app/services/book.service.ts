import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, setDoc
} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IBook } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private firestore: Firestore,
    private afs: AngularFirestore) { }

  getBooks(): Observable<IBook[]> {
    const booksRef = collection(this.firestore, 'books');
    return collectionData(booksRef, { idField: 'id' }) as Observable<IBook[]>;
  }

  addBook(book: IBook) {
    const booksRef = collection(this.firestore, 'books');
    return addDoc(booksRef, book);
  }

  getBookByID(id: string) {
    const bookRef = doc(this.firestore, `books/${id}`);
    return docData(bookRef, { idField: 'id' }) as Observable<IBook>;
  }

  updateBook(book: IBook) {
    const bookDocRef = doc(this.firestore, `books/${book.id}`);
    return setDoc(bookDocRef, book);
  }

  modifyBookPrice(book: IBook, amount: number) {
    const bookDocRef = doc(this.firestore, `books/${book.id}`);
    return updateDoc(bookDocRef, { price: amount });
  }

  deleteBook(book: IBook) {
    const bookDocRef = doc(this.firestore, `books/${book.id}`);
    return deleteDoc(bookDocRef);
  }

  searchBook(name: string) {
    return this.afs.collection('books', ref =>
      ref.where('name', '==', name)).valueChanges({ idField: 'id' });
  }
}
