import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from 'src/app/services/user.service';
import { getElement, getText, query, queryById } from '@testing';

fdescribe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userService: jasmine.SpyObj<UsersService>

  beforeEach(async () => {
    const userServiceSpy  =jasmine.createSpyObj('UsersService',['create'])
    await TestBed.configureTestingModule({
      declarations: [ RegisterFormComponent ],
      imports:[
        ReactiveFormsModule,
      ],
      providers:[
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

  it('should be the form`s email field invalid ', ()=>{
    component.emailField?.setValue('esto no es un correo');
    expect(component.emailField?.invalid).withContext("plain text").toBeTruthy();
    component.emailField?.setValue('  ');
    expect(component.emailField?.invalid).withContext("just blank spaces").toBeTruthy();
  })

  it('should be the form`s email field invalid from ui', ()=>{
    const inputElement = getElement(fixture,'input#email') as HTMLInputElement;
    inputElement.value = ''
    inputElement.dispatchEvent(new Event('input'));
    inputElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const textErrorRequired = getText(fixture,'feedbackEmail-required')
    expect(textErrorRequired).withContext('required case').toContain("Required");

    inputElement.value = 'no es un correo'
    inputElement.dispatchEvent(new Event('input'));
    inputElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const textErrorEmail = getText(fixture,'feedbackEmail-email')
    expect(textErrorEmail).withContext('email case').toContain("It's not a email");

  })

  it('should be the form`s password field invalid and invalid ', ()=>{
    component.passwordField?.setValue('esto no es una contraseña invalida');
    expect(component.passwordField?.invalid).withContext("without numbers").toBeTruthy();
    component.passwordField?.setValue('12345');
    expect(component.passwordField?.invalid).withContext("less dan six").toBeTruthy();
    component.passwordField?.setValue('');
    expect(component.passwordField?.invalid).withContext("empty").toBeTruthy();
    component.passwordField?.setValue('correcta6a');
    expect(component.passwordField?.valid).withContext("right").toBeTruthy();
  })

  it('should de form be invalid',()=> {
    component.form.patchValue({
      name:'cristian',
      email:'cdmottah@gmail.com',
      password: 'test234',
      confirmPassword:'test234',
      checkTerms:false
    })
    expect(component.form.valid).toBeFalsy()
  })
});
