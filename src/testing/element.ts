import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { query, queryById } from "./finders";


export function getElement<T>(
  fixture: ComponentFixture<T>,
  testid: string,
  withtextId: boolean = false,
) {
  const debugElement: DebugElement = (withtextId) ? queryById(fixture, testid) : query(fixture, testid);
  return  debugElement.nativeElement as HTMLElement;


}
