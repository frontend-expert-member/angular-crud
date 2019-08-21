import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { App } from './app';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit  { 
  
  allUsers: App[];
  statusCode: number;
  submitted = false;
  requestProcess = false;
  userIdToUpdate = null;
  userForm: FormGroup;

  constructor(private appService: AppService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.getAllUsers();
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(6)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.userForm.controls; }

  getAllUsers() {
    this.appService.getAllUsers()
    .subscribe(
      data => this.allUsers = data,
      errorCode => this.statusCode = errorCode);
  }

  onSubmit() {
    
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.initState();
    let user = this.userForm.value;
    if (this.userIdToUpdate === null) {
      this.appService.getAllUsers()
      .subscribe(users => {
        let maxIndex = users.length - 1;
        let userWithMaxIndex = users[maxIndex];
        let userId = userWithMaxIndex.id + 1;
        user.id = userId;

        this.appService.createUser(user)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllUsers();
          this.backToCreateUser();
        },
        errorCode => this.statusCode = errorCode
        );
      })
    }
    else {
      user.id = this.userIdToUpdate;
      this.appService.updateUser(user)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllUsers();
      },
      errorCode => this.statusCode = errorCode
      );
    }

  }

  editUser(userId: string) {
    this.initState();
    this.appService.getUserById(userId)
    .subscribe(user => {
      this.userIdToUpdate = user.id;
      this.userForm.setValue({ firstName: user.firstName, lastName: user.lastName, email: user.email });
      this.submitted = true;
      this.requestProcess = false;
    },
    errorCode => this.statusCode = errorCode);
  }

  deleteUser(userId: string) {
    this.initState();
    this.appService.deleteUser(userId)
    .subscribe(successCode => {
      this.statusCode = 204;
      this.getAllUsers();
      this.backToCreateUser();
    },
    errorCode => this.statusCode = errorCode);
  }

  initState() {
    this.statusCode = null;
    this.requestProcess = true;
  }

  //Go back from update to create
  backToCreateUser() {
    this.userIdToUpdate = null;
    this.userForm.reset();	  
    this.submitted = false;
 }

}
