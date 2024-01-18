export interface JWTPayload {
  readonly email: string;
  readonly phone: string;
  readonly roles?: string;
}
