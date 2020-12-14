import { Component, OnInit } from '@angular/core';
import { SkillsService } from 'src/app/services/skills.service';
import { UserAccountsService } from 'src/app/services/user-accounts.service';

export interface UserSkills {
  userName: string;
  userAddress: string;
  skills: Skill[];
}

export interface Skill{
  id: number;
  name: string;
  category: string;
  rating: string;
  state: string;
  skillIssuers?: string[];
}

@Component({
  selector: 'app-view-skill',
  templateUrl: './view-skill.component.html',
  styleUrls: ['./view-skill.component.css']
})
export class ViewSkillComponent implements OnInit {

  panelOpenState = false;
  skills: Int32Array;
  userSkills: UserSkills;

  constructor(private skillsService: SkillsService,
    private userAccountsService: UserAccountsService,) { }

  ngOnInit(): void {
    const that = this;
    that.userSkills = <UserSkills>{};
    that.userSkills.skills = new Array<Skill>(0);
    that.userAccountsService.getUserDetails().then(function (retDetails: any){
      that.userSkills.userName = retDetails.name;
      that.userSkills.userAddress = retDetails.address;
    }).then(function (res: any) {
      that.userAccountsService.getUserSkills().then(function (retDetails: any){
        that.skills = retDetails;
        that.skills.forEach((x) => {
          that.skillsService.getSkillDetails(x).then(function (y: any) {
            console.log('skill details : ' + y);
            var skill: Skill;
            var skillIssuers = new Array(0);
            skill = {
              id: x,
              name: y.skillName,
              category: y.skillCategory,
              rating: y.rating,
              state: y.state
            };
            that.skillsService.getSkillIssuers(x).then( function (z: any[]) {
              z.forEach(function (issuer: any){
                that.userAccountsService.getUserDetailsByAdress(issuer).then(function(res: any) {
                  if(res){
                  skillIssuers.push(res.name);
                }
              })
              })
            })
            skill.skillIssuers = skillIssuers;
            that.userSkills.skills.push(skill);
          })
        })
      })      
    });
   
    console.log('ViewSkillComponent :: Users approved Skills ' + that.userSkills);

  }


}
