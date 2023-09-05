import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isError: boolean = false;

  constructor(
    private _passwordManagerService: PasswordManagerService,
    private router: Router
  ) {}

  onSubmit(values: any) {
    this._passwordManagerService
      .login(values.email, values.password)
      .then(() => {
        this.router.navigate(['/site-list']);
      })
      .catch((error) => {
        this.isError = true;
      });
  }
}
