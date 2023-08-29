import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((val: any) => {
      console.log(val);
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteUrl = val.siteUrl;
      this.siteImgUrl = val.siteImageUrl;
    });
  }

  onSubmit(values: object) {
    console.log(values);
  }
}
