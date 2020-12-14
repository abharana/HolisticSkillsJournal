import { Injectable } from '@angular/core';
import { AccountsService } from './accounts.service';
const Web3 = require('web3');

declare let require: any;
declare let window: any;

const tokenAbi = require('../../../../build/contracts/UserRegister.json');

@Injectable({
  providedIn: 'root'
})
export class UserAccountsService extends AccountsService{

  super() { }
  
  public registerUserAccount(value) {
    const that = this;
    console.log('userAccounts.service :: registerUserAccount : ' +
      value + ', to: ' + that.account + ',');
    return new Promise((resolve, reject) => {
      console.log('userAccounts.service :: registerUserAccount :: tokenAbi');
      console.log(tokenAbi);
      const contract = require('@truffle/contract');
      const userRegisterContract = contract(tokenAbi);
      userRegisterContract.setProvider(that.web3);
      console.log('userAccounts.service :: registerUserAccount :: userRegisterContract');
      console.log(userRegisterContract);
      userRegisterContract.deployed().then(function(instance) {
        return instance.registerUserAccount(that.account,
          value,
          {
            from: that.account
          });
      }).then(function(status) {
        if (status) {
          return resolve({status: true});
        }
      }).catch(function(error) {
        console.log(error);
        return reject('accounts.service error');
      });
    });
  }

  public getUserDetails() {
    const that = this;
    console.log('userAccounts.service :: getUserDetails : ' +
    ', to: ' + that.account + ',');
    return new Promise((resolve, reject) => {
      console.log('userAccounts.service :: getUserDetails :: tokenAbi');
      console.log(tokenAbi);
      const contract = require('@truffle/contract');
      const userRegisterContract = contract(tokenAbi);
      userRegisterContract.setProvider(that.web3);
      console.log('userAccounts.service :: getUserDetails :: userRegisterContract');
      console.log(userRegisterContract);
      userRegisterContract.deployed().then(function(instance) {
        return instance.getUser(that.account).then(function(details: any[]) {
          if (details) {
            return resolve({name: details[0], address: that.account});
          }
        });
      }).catch(function(error) {
        console.log(error);
        return reject('userAccounts.service error');
      });
    });
  }

  public getUserDetailsByAdress(address) {
    const that = this;
    console.log('userAccounts.service :: getUserDetailsByAdress : ' +
    ', to: ' + address + ',');
    return new Promise((resolve, reject) => {
      console.log('userAccounts.service :: getUserDetailsByAdress :: tokenAbi');
      console.log(tokenAbi);
      const contract = require('@truffle/contract');
      const userRegisterContract = contract(tokenAbi);
      userRegisterContract.setProvider(that.web3);
      console.log('userAccounts.service :: getUserDetailsByAdress :: userRegisterContract');
      console.log(userRegisterContract);
      userRegisterContract.deployed().then(function(instance) {
        return instance.getUser(address).then(function(details: any[]) {
          if (details) {
            return resolve({name: details[0], address: that.account});
          }
        });
      }).catch(function(error) {
        console.log(error);
        return reject('userAccounts.service error');
      });
    });
  }

  public getUserSkills() {
    const that = this;
    console.log('userAccounts.service :: getUserSkills : ' +
    ',for: ' + that.account + ',');
    return new Promise((resolve, reject) => {
      console.log('userAccounts.service :: getUserSkills :: tokenAbi');
      console.log(tokenAbi);
      const contract = require('@truffle/contract');
      const userRegisterContract = contract(tokenAbi);
      userRegisterContract.setProvider(that.web3);
      console.log('userAccounts.service :: getUserSkills :: userRegisterContract');
      console.log(userRegisterContract);
      userRegisterContract.deployed().then(function(instance) {
        return instance.getUserSkills(that.account).then(function(details: any[]) {
          if (details) {
            var skills = new Array(0);
            details.forEach( (element) => {
              skills.push(element.words[0]);
              console.log(skills);
          });
          return resolve(skills);
          }
        });
      }).catch(function(error) {
        console.log(error);
        return reject('userAccounts.service error');
      });
    });
  }

}
