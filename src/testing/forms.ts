import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { query, queryById } from "@testing";

export function setInputValue<T>(
  fixture: ComponentFixture<T>,
  testid: string,
  value:string,
  withtextId: boolean = false,
) {
  const element: DebugElement = (withtextId) ? queryById(fixture, testid) : query(fixture, testid);
  const inputElement = element.nativeElement as HTMLInputElement;

  inputElement.value = value;
  inputElement.dispatchEvent(new Event('input'));
  inputElement.dispatchEvent(new Event('blur'));


}
