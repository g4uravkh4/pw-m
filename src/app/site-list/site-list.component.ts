import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent {
  allSites!: Observable<Array<any>>;
  constructor(private passwordManagerServivce: PasswordManagerService) {
    this.loadSites();
  }

  onSubmit(values: object) {
    console.log(values);
    this.passwordManagerServivce
      .addSite(values)
      .then(() => {
        console.log('Site added successfully');
      })
      .catch((error) => {
        console.log('Error adding site: ', error);
      });
  }

  loadSites() {
    this.allSites = this.passwordManagerServivce.loadSites();
  }
}
