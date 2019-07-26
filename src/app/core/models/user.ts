/** Model for user */
export class User {
  /** Display name */
  public displayName: string;
  /** Email */
  public email: string;
  /** Time of token expiration */
  public expiresIn: string;
  /** Auth token */
  public idToken: string;
  /** UID */
  public localId: string;
  /** Refresh token */
  public refreshToken: string;
  /** Is user registered */
  public registered: boolean;

  public constructor(user: Partial<User>) {
    this.displayName = user.displayName;
    this.email = user.email;
    this.expiresIn = user.expiresIn;
    this.idToken = user.idToken;
    this.localId = user.localId;
    this.refreshToken = user.refreshToken;
    this.registered = user.registered;
  }
}
