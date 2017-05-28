export class AccountOptions {
  public loginIdentifierConflictOptions: Array<string> = [
    'ignore',
    'failOnSiteConflictingIdentity',
    'failOnAnyConflictingIdentity'
  ];

  constructor(
    public verifyEmail: boolean,
    public verifyProviderEmail: boolean,
    public allowUnverifiedLogin: boolean,
    public preventLoginIDHarvesting: boolean,
    public sendWelcomeEmail: boolean,
    public sendAccountDeletedEmail: boolean,
    public defaultLanguage: string,
    public loginIdentifierConflict: string,
    public loginIdentifiers: string
  ) {}

  public getData() {
    return {
      'verifyEmail': this.verifyEmail,
      'verifyProviderEmail': this.verifyProviderEmail,
      'allowUnverifiedLogin': this.allowUnverifiedLogin,
      'preventLoginIDHarvesting': this.preventLoginIDHarvesting,
      'sendWelcomeEmail': this.sendWelcomeEmail,
      'sendAccountDeletedEmail': this.sendAccountDeletedEmail,
      'defaultLanguage': this.defaultLanguage,
      'loginIdentifierConflict': this.loginIdentifierConflict,
      'loginIdentifiers': this.loginIdentifiers
    };
  }
}
