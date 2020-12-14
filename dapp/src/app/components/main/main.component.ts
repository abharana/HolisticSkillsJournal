import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserAccountsService } from 'src/app/services/user-accounts.service';

import { UserModalComponent } from '../users/user-modal/user-modal.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  formSubmitted = false;
  userForm: FormGroup;
  user: any;

  constructor(private fb: FormBuilder,
    private userAccountsService: UserAccountsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.formSubmitted = false;
    this.user = { address: '', balance: '', name: '' };
    this.getAccountAndBalance();
  }

  getAccountAndBalance = () => {
    const that = this;
    this.userAccountsService.getUserBalance().
      then(function (retAccount: any) {
        that.user.address = retAccount.account;
        that.user.balance = retAccount.balance;
        console.log('accounts.components :: getAccountAndBalance :: that.user');
        console.log(that.user);
      }).then(function (ret: any){
        that.userAccountsService.getUserDetails().then(function (retDetails: any){
          that.user.name = retDetails.name;
        })
      }).catch(function (error) {
        console.log(error);
      });
  }

  registerUserAccount = (name: string) => {
    const that = this;
    this.userAccountsService.registerUserAccount(name).
      then(function (status: boolean) {
        console.log('accounts.components :: getAccountAndBalance :: that.user');
        console.log(status);
      }).catch(function (error) {
        console.log(error);
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '250px',
      data: {name: "user"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.registerUserAccount(result);
    });
  }
 

}
