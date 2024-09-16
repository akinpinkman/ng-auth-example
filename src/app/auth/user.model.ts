export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string
  ) // private _tokenExprationDate: Date
  {}

  get token() {
    return this._token;
  }
}
