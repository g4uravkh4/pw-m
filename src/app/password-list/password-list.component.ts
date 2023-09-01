import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css'],
})
export class PasswordListComponent {
  siteId!: string;
  siteName!: string;
  siteUrl!: string;
  siteImgUrl!: string;

  passwordList!: Observable<Array<any>>;

  email!: string;
  username!: string;
  password!: string;
  passwordId!: string;

  formState: string = 'Add New';

  isSuccess: boolean = false;
  successMessage: string = 'Password added successfully!';

  constructor(
    private route: ActivatedRoute,
    private service: PasswordManagerService
  ) {
    this.route.queryParams.subscribe((val: any) => {
      console.log(val);
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteUrl = val.siteUrl;
      this.siteImgUrl = val.siteImageUrl;
    });

    this.loadPasswords();
  }

  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }

  resetForm() {
    this.email = '';
    this.username = '';
    this.password = '';
    this.formState = 'Add New';
    this.passwordId = '';
  }

  onSubmit(values: object) {
    if (this.formState === 'Add New') {
      this.service
        .addPassword(values, this.siteId)
        .then(() => {
          this.resetForm();
          this.showAlert('Password added successfully!');
        })
        .catch((err) => {
          console.log(err);
          alert('Something went wrong');
        });
    } else if (this.formState == 'Edit') {
      this.service
        .updatePassowrd(this.siteId, this.passwordId, values)
        .then(() => {
          this.showAlert('Password updated successfully!');
          this.resetForm();
        });
    }
  }

  loadPasswords() {
    this.passwordList = this.service.loadPasswords(this.siteId);
  }

  editPassword(
    email: string,
    username: string,
    password: string,
    passwordId: string
  ) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.passwordId = passwordId;

    this.formState = 'Edit';
  }

  deletePassword(passwordId: string) {
    this.service
      .deletePassword(this.siteId, passwordId)
      .then(() => {
        this.showAlert('Password deleted successfully!');
      })
      .catch((err) => {
        console.log(err);
        alert('Something went wrong');
      });
  }
}
