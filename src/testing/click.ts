
import { ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { query, queryById, getElement } from '@testing'

export function clickEvent<T>(
  fixture: ComponentFixture<T>,
  testid: string,
  withtextId: boolean = false,
  event: unknown = null
) {
  const element: DebugElement = (withtextId) ? queryById(fixture, testid) : query(fixture, testid);

  element.triggerEventHandler('click', event)

}

export function clickElement<T>(
  fixture: ComponentFixture<T>,
  testid: string,
  withtextId: boolean = false,
) {
  const element = getElement(fixture, testid, withtextId)
  element.click();
}
