import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RegisterFormComponent } from './register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from 'src/app/services/user.service';
import { asyncData, asyncError, clickElement, getText, mockObserable, setCheckBoxValue, setInputValue } from '@testing';
import { generateOneUser } from 'src/app/models/user.mock';

fdescribe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userService: jasmine.SpyObj<UsersService>

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UsersService', ['create'])
    await TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      imports: [
        ReactiveFormsModule,
      ],
      providers: [
        { provide: UsersService, useValue: userServiceSpy },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be the form`s email field invalid ', () => {
    component.emailField?.setValue('esto no es un correo');
    expect(component.emailField?.invalid).withContext("plain text").toBeTruthy();
    component.emailField?.setValue('  ');
    expect(component.emailField?.invalid).withContext("just blank spaces").toBeTruthy();
  })

  it('should be the form`s email field invalid from ui', () => {

    setInputValue(fixture, 'input#email', '');
    fixture.detectChanges();

    const textErrorRequired = getText(fixture, 'feedbackEmail-required')
    expect(textErrorRequired).withContext('required case').toContain("Required");

    setInputValue(fixture, 'input#email', 'esto no es un correo');
    fixture.detectChanges();

    const textErrorEmail = getText(fixture, 'feedbackEmail-email')
    expect(textErrorEmail).withContext('email case').toContain("It's not a email");

  })

  it('should be the form`s password field invalid and invalid ', () => {
    component.passwordField?.setValue('esto no es una contraseña invalida');
    expect(component.passwordField?.invalid).withContext("without numbers").toBeTruthy();
    component.passwordField?.setValue('12345');
    expect(component.passwordField?.invalid).withContext("less dan six").toBeTruthy();
    component.passwordField?.setValue('');
    expect(component.passwordField?.invalid).withContext("empty").toBeTruthy();
    component.passwordField?.setValue('correcta6a');
    expect(component.passwordField?.valid).withContext("right").toBeTruthy();
  })

  it('should de form be invalid', () => {
    component.form.patchValue({
      name: 'cristian',
      email: 'cdmottah@gmail.com',
      password: 'test234',
      confirmPassword: 'test234',
      checkTerms: false
    })
    expect(component.form.valid).toBeFalsy()
  })

  it('should send the form sucessfully', () => {
    component.form.patchValue({
      name: 'cristian',
      email: 'cdmottah@gmail.com',
      password: 'test234',
      confirmPassword: 'test234',
      checkTerms: true
    })
    const mockUser = generateOneUser();
    userService.create.and.returnValue(mockObserable(mockUser));

    component.register(new Event('submit'))
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalledTimes(1);
  })

  it('should be the default value init', () => {
    expect(component.status).toEqual('init')
  })

  it('should change status flag from "loading" to "success" when form is filled from UI', fakeAsync(() => {
    setInputValue(fixture, 'input#name', 'Cristian')
    setInputValue(fixture, 'input#email', 'cdmottah@gmail.com')
    setInputValue(fixture, 'input#password', 'test1234')
    setInputValue(fixture, 'input#confirmPassword', 'test1234')
    setCheckBoxValue(fixture, 'input#checkTerms', true)

    const mockUser = generateOneUser();
    userService.create.and.returnValue(asyncData(mockUser));
    clickElement(fixture,'btn-submit',true);
    fixture.detectChanges();
    expect(component.status).toEqual('loading')
    tick();
    fixture.detectChanges();
    expect(component.status).toEqual('success')
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalledTimes(1);
  })
  );

  it('should change status flag from "loading" to "success" when form is sended succesfully', fakeAsync(() => {
    component.form.patchValue({
      name: 'cristian',
      email: 'cdmottah@gmail.com',
      password: 'test234',
      confirmPassword: 'test234',
      checkTerms: true
    })
    const mockUser = generateOneUser();
    userService.create.and.returnValue(asyncData(mockUser));
    component.register(new Event('submit'));
    expect(component.status).toEqual('loading')
    tick();
    fixture.detectChanges();
    expect(component.status).toEqual('success')
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalledTimes(1);
  })
  );

  it('should change status flag from "loading" to "success" when form is filled from UI', fakeAsync(() => {
    setInputValue(fixture, 'input#name', 'Cristian')
    setInputValue(fixture, 'input#email', 'cdmottah@gmail.com')
    setInputValue(fixture, 'input#password', 'test1234')
    setInputValue(fixture, 'input#confirmPassword', 'test1234')
    setCheckBoxValue(fixture, 'input#checkTerms', true)

    const mockUser = generateOneUser();
    userService.create.and.returnValue(asyncError(mockUser));
    clickElement(fixture,'btn-submit',true);
    fixture.detectChanges();
    expect(component.status).toEqual('loading')
    tick();
    fixture.detectChanges();
    expect(component.status).toEqual('error')
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalledTimes(1);
  })
  );

});
