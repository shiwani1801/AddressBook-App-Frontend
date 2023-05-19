import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressBook } from 'src/app/module/AddressBook';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  public person: AddressBook = new AddressBook();
  userId: number = this.activatedRoute.snapshot.params['addressBookId'];
  personFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private snackBar: MatSnackBar,) {
    this.personFormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-z\\s]{2,}$")]),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zipCode: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{6}$")]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^(6|7|8|9)?[0-9]{9}$")])
    });
  }

  ngOnInit(): void {
    if (this.userId != undefined) {
      this.dataService.currentPerson.subscribe(person => {
        // if (Object.keys(person).length !== 0) {
          console.log(person);
          this.personFormGroup.get('name')?.setValue(person.name);
          this.personFormGroup.get('address')?.setValue(person.address);
          this.personFormGroup.get('city')?.setValue(person.city);
          this.personFormGroup.get('state')?.setValue(person.state);
          this.personFormGroup.get('zipCode')?.setValue(person.zipCode);
          this.personFormGroup.get('phoneNumber')?.setValue(person.phoneNumber);
        // }
      });
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.personFormGroup.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if(this.personFormGroup.valid){
    this.person = this.personFormGroup.value;
    console.log(this.person);

    if (this.userId != undefined) {
      this.httpService.updateContact(this.userId, this.person).subscribe(response => {
        console.log(response);
        this.ngOnInit();
        this.router.navigateByUrl("/home-page");
      });
    } else {
      this.httpService.addNewContact(this.person).subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl("/home-page");
      });
    }
  }
}
}



