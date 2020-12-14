import { Injectable } from '@angular/core';
import { AccountsService } from './accounts.service';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
const Web3 = require('web3');

declare let require: any;
declare let window: any;

const tokenAbi = require('../../../../build/contracts/SkillEvaluation.json');

export interface Skill {
  skillName: string,
  skillCategory: number,
  rating: string,
  state: string
}

@Injectable({
  providedIn: 'root'
})
export class SkillsService extends AccountsService{

  constructor () {
    super();
    this.getAccount();
  }
  
  public createSkill(value) {
    const that = this;
    console.log('skills.service :: createSkill : ' +
      value.skillName + " " + value.skillCategory + ', to: ' + that.account + ',');
    return new Promise((resolve, reject) => {
      console.log('skills.service :: createSkill :: tokenAbi');
      console.log(tokenAbi);
      const contract = require('@truffle/contract');
      const skillEvaluationContract = contract(tokenAbi);
      skillEvaluationContract.setProvider(that.web3);
      console.log('skills.service :: createSkill :: createSkill');
      console.log(skillEvaluationContract);
      skillEvaluationContract.deployed().then(function(instance) {
        return instance.createSkill(value.skillName, 
          value.skillCategory,
          {
            from: that.account
          });
      }).then(function(res) {
        if (res) {
          return resolve({skillId: res.logs[0].args.skillId.toNumber(), account: res.receipt.from});
        }
      }).catch(function(error) {
        console.log(error);
        return reject('skills.service error');
      });
    });
  }

  public certifySkill(skillId, value) {
    const that = this;
    console.log('skills.service :: createSkill : ' +
      value.skillName + " " + value.skillCategory + ', to: ' + that.account + ',');
    return new Promise((resolve, reject) => {
      console.log('skills.service :: createSkill :: tokenAbi');
      console.log(tokenAbi);
      const contract = require('@truffle/contract');
      const skillEvaluationContract = contract(tokenAbi);
      skillEvaluationContract.setProvider(that.web3);
      console.log('skills.service :: createSkill :: createSkill');
      console.log(skillEvaluationContract);
      skillEvaluationContract.deployed().then(function(instance) {
        return instance.certifySkill(skillId, 
          value.rating,
          value.skillCategory,
          {
            from: that.account
          });
      }).then(function(res) {
        if (res) {
          return resolve({skillId: res.logs[0].args.skillId.toNumber(), account: res.receipt.from, rating: res.logs[0].args.skillId.toNumber(), });
        }
      }).catch(function(error) {
        console.log(error);
        return reject('skills.service error');
      });
    });
  }

  public getSkillDetails(value) {
    const that = this;
    console.log('skills.service :: getSkillDetails : ' +
      value + ', to: ' + that.account + ',');
    return new Promise((resolve, reject) => {
      console.log('skills.service :: getSkillDetails :: tokenAbi');
      console.log(tokenAbi);
      const contract = require('@truffle/contract');
      const skillEvaluationContract = contract(tokenAbi);
      skillEvaluationContract.setProvider(that.web3);
      console.log('skills.service :: createSkill :: getSkillDetails');
      console.log(skillEvaluationContract);
      skillEvaluationContract.deployed().then(function(instance) {
        return instance.skill(value);
      }).then(function(res) {
        if (res) {
          return resolve({skillName: res.name, skillCategory: that.mapCategory(res.category.words[0]), 
            rating: res.rating.toNumber(), state: that.mapState(res.state.toNumber()) });
        }
      }).catch(function(error) {
        console.log(error);
        return reject('skills.service error');
      });
    });
  }

  public getSkillIssuers(value) {
    const that = this;
    console.log('skills.service :: getSkillIssuers : ' +
      value + ', to: ' + that.account + ',');
    return new Promise((resolve, reject) => {
      console.log('skills.service :: getSkillIssuers :: tokenAbi');
      console.log(tokenAbi);
      const contract = require('@truffle/contract');
      const skillEvaluationContract = contract(tokenAbi);
      skillEvaluationContract.setProvider(that.web3);
      console.log('skills.service :: createSkill :: getSkillDetails');
      console.log(skillEvaluationContract);
      skillEvaluationContract.deployed().then(function(instance) {
        return instance.getSkillIssuers(value).then(function(details: any[]) {
          if (details) {
            var skillIssuers = new Array(0);
            details.forEach( (element) => {
              skillIssuers.push(element);
              console.log(skillIssuers);
          });
          return resolve(skillIssuers);
          }
        });
      }).catch(function(error) {
        console.log(error);
        return reject('userAccounts.service error');
      });
    });
  }

  private mapCategory(category: number): string {
    switch (category) {
      case 0: return "Creative";
      case 1: return "Social";
      case 2: return "Physical";
      case 3: return "Cognitive";
      case 4: return "Emotional";
    }
  }

  private mapState(state: number): string {
    switch (state) {
      case 0: return "New";
      case 1: return "Created";
      case 2: return "Certified";
      case 3: return "ReCertified";
  }
}

}
