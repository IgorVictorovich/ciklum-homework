import { Component } from '@angular/core';
import { Credentials, AccountsService } from './app.accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AccountsService, Credentials]
})
export class AppComponent {}
