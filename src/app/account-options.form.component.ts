import {Component, OnInit, Output} from '@angular/core';

import { AccountOptions } from './app.account-options.model';

import { Credentials, AccountsService } from './app.accounts.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-options-form',
  templateUrl: './account-options.component.html'
})

export class AccountOptionsFormComponent implements OnInit {
  private userKey = 'AJA3Cw9XcJZf';
  private userSecret = '1J+YxAY47khnuXf4GKSggLpPFBbQv8Hq';
  private apiKey = '3_inujb44QPskKBok5VwhYnqy40eaVrwAJXXLsqaHRI_6DCM3KHhxNXjjcFQe0PASK';

  public model;
  public errorMessage = '';
  public accountOptions: object;
  public isReadOnlyMode: boolean;

  constructor(
    private accountService: AccountsService,
    private credentials: Credentials,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const routeData = this.route.data;
    routeData.subscribe((data) => { this.isReadOnlyMode = data.isReadOnlyMode; });
    this.credentials.setCredentials(this.userKey, this.userSecret, this.apiKey);
    this.loadData();
  }

  private loadData() {
    this.accountService.getAccounts()
        .subscribe((response) => { this.responseHandler(response); });
  }

  private saveData() {
    const payload = this.model.getData();
    this.accountService.setAccounts(payload)
        .subscribe((response) => { this.responseHandler(response); });
  }

  private responseHandler(response) {
    this.errorMessage = '';

    if (response.errorCode !== 0) {
      this.errorMessage = `Error: ${response.errorMessage}`;
    }

    if (response.hasOwnProperty('accountOptions')) {
      this.accountOptions = response.accountOptions;
      this.populateModel(this.accountOptions);
    }
  }

  private populateModel(data): void {
    this.model = new AccountOptions(
      data['verifyEmail'],
      data['verifyProviderEmail'],
      data['allowUnverifiedLogin'],
      data['preventLoginIDHarvesting'],
      data['sendWelcomeEmail'],
      data['sendAccountDeletedEmail'],
      data['defaultLanguage'],
      data['loginIdentifierConflict'],
      data['loginIdentifiers'],
    );
  }

  public onSubmit() {
    this.saveData();
  }
}
