import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SkillsService, Skill } from 'src/app/services/skills.service';
import { UserAccountsService } from 'src/app/services/user-accounts.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-certify-skill',
  templateUrl: './certify-skill.component.html',
  styleUrls: ['./certify-skill.component.css']
})
export class CertifySkillComponent implements OnInit {

  skillUrl: any;
  certifySkillForm: FormGroup;
  skillId: BigInteger;
  accountAddress: String;
  skill: Observable<Skill>;
  userName: String;
  showMsg: boolean;

  constructor(private route: ActivatedRoute,
    private skillsService: SkillsService,
    private userAccountsService: UserAccountsService,
    private formBuilder: FormBuilder,
  ) {
    this.route.queryParams.subscribe(params => {
      this.skillId = params['skillId'];
      this.accountAddress = params['account'];
  });
    this.certifySkillForm = this.formBuilder.group({
      userName: '',
      skillName: '',
      skillCategory: '',
      rating: ""
    });
  }
  
  ngOnInit(): void {
    const that = this;
    that.userAccountsService.getUserDetailsByAdress(that.accountAddress).then(function (retDetails: any){
      that.certifySkillForm.get("userName").patchValue(retDetails.name);
    });
    that.skillsService.getSkillDetails(that.skillId).then(function (res: any) {
      that.certifySkillForm.patchValue(res);
    });

    console.log('certifySkillComponent :: Skill ' + that.userName);

  }

  onSubmit(skillData) {
    this.skillsService.certifySkill(this.skillId, skillData).
      then( (res: any) => {
        this.showMsg= true;
      }).catch(function (error) {
        console.log(error);
      });
  }

}
