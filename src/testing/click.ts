
import { ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { query, queryById } from '@testing'

export function clickEvent<T>(
  fixture: ComponentFixture<T>,
  testid: string,
  withtextId: boolean = false,
  event:unknown = null
) {
  const element: DebugElement = (withtextId) ? queryById(fixture, testid) : query(fixture, testid);

  element.triggerEventHandler('click',event)

}

export function clickElement<T>(
  fixture: ComponentFixture<T>,
  testid: string,
  withtextId: boolean = false,
) {
  const debugElement: DebugElement = (withtextId) ? queryById(fixture, testid) : query(fixture, testid);
  const element = debugElement.nativeElement as HTMLElement;
  element.click();

}
