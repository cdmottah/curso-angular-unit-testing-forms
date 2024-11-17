import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonComponent } from './../person/person.component';
import { getText, query, queryAll, queryById } from '@testing';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleComponent, PersonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person components', () => {
    const debugElement = queryAll(fixture, 'app-person');
    expect(debugElement.length).toEqual(component.people.length);
  });

  it('should raise selected event when clicked', () => {
    const button = queryById(fixture, 'btn-person');
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.selectedPerson).toEqual(component.people[0]);
  });

  it('should render person when do click', () => {
    const buttonDe = queryById(fixture, 'btn-person');
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    const liDe = getText(fixture, 'selectedPerson');
    expect(component.selectedPerson).toEqual(component.people[0]);
    expect(liDe).toContain(component.selectedPerson.name);
  });
});
