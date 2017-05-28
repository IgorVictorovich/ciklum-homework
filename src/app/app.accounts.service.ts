import { Injectable } from '@angular/core';
import { Jsonp, Response  } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

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

    return this.callService(this.getUrl + queryString);
  }

  public setAccounts(data) {
    data = encodeURIComponent(JSON.stringify(data));

    const queryString = `?userkey=${this.credentials.UserKey}` +
      `&secret=${this.credentials.UserSecret}` +
      `&apikey=${this.credentials.APIKey}` +
      `&accountOptions=${data}` +
      `&format=jsonp` +
      `&callback=JSONP_CALLBACK`;

    return this.callService(this.setUrl + queryString);
  }

  private callService(queryString: string) {
    return this.jsonp.get(queryString)
      .map(result => result.json());
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
