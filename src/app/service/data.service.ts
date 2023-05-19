import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddressBook } from '../module/AddressBook';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private addressBookSource = new BehaviorSubject(new AddressBook());
  currentPerson= this.addressBookSource.asObservable();

  constructor() { }

  changePerson(person: AddressBook) {
    this.addressBookSource.next(person);
  }
}