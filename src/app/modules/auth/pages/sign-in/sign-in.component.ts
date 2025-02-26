import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AuthService } from 'src/app/auth.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgClass, NgIf, ButtonComponent],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;

  authService = inject(AuthService)

  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router) { }


  ngOnInit(): void {
    this.form = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    const { username, password } = this.form.value;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.authService.signIn(username, password).then((response: any) => {
      localStorage.setItem("token", response.accessToken)
      localStorage.setItem("user", response?.user)
      this._router.navigate(['/home/dashboard']);
      toast.success('Mensaje', {
        description: 'Bienvenido!',
      });
    }).catch(error => {
      toast.error('Mensaje', {
        description: error?.error?.message,
      });
    })
  }
}
