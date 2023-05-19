import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddressBook } from 'src/app/module/AddressBook';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  public personDetails: AddressBook[] = [];

  constructor(private httpService: HttpService, 
              private router: Router,
              private dataService: DataService,
              private snackBar: MatSnackBar,
              ) { }

  ngOnInit(): void {
    this.httpService.getAddressBookData().subscribe(data => {
      this.personDetails = data;
      console.log(this.personDetails);
    } );
  }

  remove(id: number): void {
    console.log(id);
    this.httpService.deleteContact(id).subscribe((response: any) => {
      console.log(response);
      this.ngOnInit();
       this.snackBar.open('Contact Deleted Successfully!', '', {duration: 4000, verticalPosition: 'top'});
    });
  }

  update(person: AddressBook): void {
    this.dataService.changePerson(person);
    this.router.navigateByUrl('/add-user/' + person.addressBookId);
    
  }
}