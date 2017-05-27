import {Injectable} from '@angular/core';
import {Jsonp, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class Credentials {
  public UserKey: string;
  public UserSecret: string;
  public APIKey: string;

  setCredentials(userKey: string, userSecret: string, apiKey: string) {
    this.UserKey = encodeURIComponent(userKey);
    this.UserSecret = encodeURIComponent(userSecret);
    this.APIKey = encodeURIComponent(apiKey);
  }
}

@Injectable()
export class AccountsService {
  Result: any;

  private getUrl = 'https://accounts.gigya.com/accounts.getPolicies';
  private setUrl = 'https://accounts.gigya.com/accounts.setPolicies';

  constructor(private jsonp: Jsonp, private credentials: Credentials) {}

  public getAccounts() {

    const queryString = `?userkey=${this.credentials.UserKey}` +
      `&secret=${this.credentials.UserSecret}` +
      `&apikey=${this.credentials.APIKey}` +
      `&format=jsonp` +
      `&callback=JSONP_CALLBACK`;

    return this.jsonp.get(this.getUrl + queryString)
      .map(result => result.json());
  }

}
