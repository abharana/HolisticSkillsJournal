import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccountsService } from 'src/app/services/accounts.service';
import { SkillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.css']
})
export class CreateSkillComponent {

  skillUrl: any;
  createSkillForm: FormGroup;

  constructor(
    private skillsService: SkillsService,
    private formBuilder: FormBuilder,
  ) {
    this.createSkillForm = this.formBuilder.group({
      skillName: '',
      skillCategory: '',
      skillUrl: ''
    });
  }

  onSubmit(skillData) {
    this.skillsService.createSkill(skillData).
      then( (res: any) => {
        this.skillUrl = "http://localhost:4200/certifySkill?skillId=" + res.skillId + "&account="+ res.account;
        console.log('skill.components :: createSkill :: that.user');
        console.log(res);
        console.log(this.skillUrl);
      }).catch(function (error) {
        console.log(error);
      });
  }

}
