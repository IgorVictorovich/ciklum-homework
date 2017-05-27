import { Component } from '@angular/core';
import { Credentials, AccountsService } from './app.accounts.service';
import { Utils } from './app.utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AccountsService, Credentials, Utils]
})
export class AppComponent {
  userKey = 'AJA3Cw9XcJZf';
  userSecret = '1J+YxAY47khnuXf4GKSggLpPFBbQv8Hq';
  apiKey = '3_inujb44QPskKBok5VwhYnqy40eaVrwAJXXLsqaHRI_6DCM3KHhxNXjjcFQe0PASK';

  public accountOptions: object;

  public accountsData: object;

  constructor(private accountService: AccountsService, private credentials: Credentials, private utils: Utils) {
    this.credentials.setCredentials(this.userKey, this.userSecret, this.apiKey);
  }

  load() {
    console.log('function called');
    this.accountService.getAccounts().subscribe(response => {
      if (response.errorCode === 0 && response.hasOwnProperty('accountOptions')) {
        this.accountOptions = response.accountOptions;
        this.setAccountsData(this.accountOptions);
      }
    });
  }

  save(events) {
    console.log('Save!');
    console.log(events);
  }

  setAccountsData(data: any) {
    this.accountsData = this.utils.getTypeValueList(data);
  }
}
