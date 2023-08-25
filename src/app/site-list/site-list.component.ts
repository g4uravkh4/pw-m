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
  siteName!: string;
  siteURL!: string;
  siteImageURL!: string;
  siteId!: string;

  formState: string = 'Add New';

  constructor(private passwordManagerServivce: PasswordManagerService) {
    this.loadSites();
  }

  onSubmit(values: object) {
    if (this.formState == 'Add New') {
      console.log(values);
      this.passwordManagerServivce
        .addSite(values)
        .then(() => {
          console.log('Site added successfully');
        })
        .catch((error) => {
          console.log('Error adding site: ', error);
        });
    } else if (this.formState == 'Edit') {
      this.passwordManagerServivce
        .updateSite(this.siteId, values)
        .then(() => {
          console.log('Site updated successfully');
        })
        .catch((error) => {
          console.log('Error updating site: ', error);
        });
    }
  }

  loadSites() {
    this.allSites = this.passwordManagerServivce.loadSites();
  }

  editSite(
    siteName: string,
    siteUrl: string,
    siteImageUrl: string,
    id: string
  ) {
    this.siteName = siteName;
    this.siteURL = siteUrl;
    this.siteImageURL = siteImageUrl;
    this.siteId = id;

    this.formState = 'Edit';
  }

  deleteList(id: string) {
    this.passwordManagerServivce
      .delete(id)
      .then(() => {
        console.log('Site deleted successfully');
      })
      .catch((error) => {
        console.log('Error deleting site: ', error);
      });
  }
}
