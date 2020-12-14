import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { UsersComponent } from './components/users/users.component';
import { CreateSkillComponent } from './components/skills/create-skill/create-skill.component';
import { CertifySkillComponent } from './components/skills/certify-skill/certify-skill.component';
import { HomeComponent } from './components/home/home.component';
import { ViewSkillComponent } from './components/skills/view-skill/view-skill.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'createSkill', component: CreateSkillComponent},
  { path: 'certifySkill', component: CertifySkillComponent},
  { path: 'viewSkills', component: ViewSkillComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
