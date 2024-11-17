import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ReversePipe } from './reverse.pipe';
import { getText, query } from '@testing';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should tranform "roma" to "amor"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform("roma");
    expect(rta).toEqual("amor");
  })

  it('should tranform "123" to "321"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform("123");
    expect(rta).toEqual("321");
  })
});


@Component({
  template: `
    <h5 data-testid="h5-element">{{ 'amor' | reverse }}</h5>
    <input [(ngModel)]="text">
    <p>{{ text | reverse }}</p>
  `
})
class HostComponent {
  text = '';
}

describe('ReversePipe from HostComponent', () => {

  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, ReversePipe],
      imports: [FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the h5 be "roma"', () => {
    const text = getText(fixture, 'h5-element');
    expect(text).toEqual('roma');
  });

  it('should apply reverse pipe when typing in the input', () => {
    const inputDe = query(fixture, 'input');
    const inputEl: HTMLInputElement = inputDe.nativeElement;
    const pDe = query(fixture, 'p').nativeElement;

    expect(pDe.textContent).toEqual('');

    inputEl.value = 'ANA 2'; // 2 ANA
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(pDe.textContent).toEqual('2 ANA');
  });

});
