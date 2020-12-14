import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifySkillComponent } from './certify-skill.component';

describe('CertifySkillComponent', () => {
  let component: CertifySkillComponent;
  let fixture: ComponentFixture<CertifySkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertifySkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifySkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
