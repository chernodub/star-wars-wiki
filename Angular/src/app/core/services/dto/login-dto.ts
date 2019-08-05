/** DTO for authorization method response */
export interface LoginDTO {
  /** The request type */
  kind: string;
  /** The uid of the authenticated user. */
  localId: string;
  /** The email for the authenticated user. */
  email: string;
  /** Display name */
  displayName: string;
  /** A Firebase Auth ID token for the authenticated user. */
  idToken: string;
  /** Whether the email is for an existing account. */
  registered: boolean;
  /** A Firebase Auth refresh token for the authenticated user. */
  refreshToken: string;
  /** The number of seconds in which the ID token expires. */
  expiresIn: string;
}
