import { Component } from '@angular/core';
import { Credentials, AccountsService } from './app.accounts.service';
import { Utils } from './app.utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AccountsService, Credentials, Utils]
})
export class AppComponent {}
