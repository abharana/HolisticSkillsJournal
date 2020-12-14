import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSkillComponent } from './view-skill.component';

describe('ViewSkillComponent', () => {
  let component: ViewSkillComponent;
  let fixture: ComponentFixture<ViewSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
