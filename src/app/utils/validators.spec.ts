import { FormControl, FormGroup } from "@angular/forms";
import { MyValidators } from "./validators";
import { UsersService } from '../services/user.service'
import { mockObserable } from "@testing";

describe('test for my validators', () => {

  describe('test for valid password', () => {

    it('should return null when password is right', () => {

      const control = new FormControl();
      control.setValue('nicolas123');

      const rta = MyValidators.validPassword(control);

      expect(rta).toBeNull();
    })

    it('should return an object with key invalid_password:true when password is wrong', () => {

      const control = new FormControl();
      control.setValue('nicolas');

      const rta = MyValidators.validPassword(control);

      expect(rta?.invalid_password).toBeTrue();
    })

  })

  describe('test for match password', () => {

    it('should return null when both are equal', () => {
      const group = new FormGroup({
        password: new FormControl('test'),
        confirmPassword: new FormControl('test')
      })

      const rta = MyValidators.matchPasswords(group);
      expect(rta).toBeNull();
    })

    it('should return an object with key match_password: true when both not match', () => {
      const group = new FormGroup({
        password: new FormControl('test'),
        confirmPassword: new FormControl('test2')
      })

      const rta = MyValidators.matchPasswords(group);
      expect(rta?.match_password).toBeTrue();
    })

    it('should return an error when some password or confirmPassword is not defined', () => {
      const group = new FormGroup({
        otherfield: new FormControl('test'),
        confirmPassword: new FormControl('test2')
      })

      const fn = () => { MyValidators.matchPasswords(group) }
      expect(fn).toThrow(new Error('matchPasswords: fields not found'));
    })

  })


  describe('test for email async', () => {
    let userServiceSpy: jasmine.SpyObj<UsersService>;
    beforeAll(() => {
      userServiceSpy = jasmine.createSpyObj('UsersService', ['isAvailableByEmail'])
    })

    it('should return null when with valid email', (doneFn) => {

      const control = new FormControl('cdmottah@gmail.com');

      userServiceSpy.isAvailableByEmail.and.returnValue(mockObserable({ isAvailable: true }))

      const validator = MyValidators.validateEmailAsync(userServiceSpy);

      validator(control).subscribe(res => {
        expect(res).toBeNull();
        doneFn();
      })

    })

    it('should return an object with key match_password: true when both not match', () => {
      const group = new FormGroup({
        password: new FormControl('test'),
        confirmPassword: new FormControl('test2')
      })

      const rta = MyValidators.matchPasswords(group);
      expect(rta?.match_password).toBeTrue();
    })

    it('should return an error when some password or confirmPassword is not defined', () => {
      const group = new FormGroup({
        otherfield: new FormControl('test'),
        confirmPassword: new FormControl('test2')
      })

      const fn = () => { MyValidators.matchPasswords(group) }
      expect(fn).toThrow(new Error('matchPasswords: fields not found'));
    })

  })

})
