export interface JWTPayload {
  device?: string;
  sub: string;
  email: string;
  phone_number: string;
  role?: string;
}

export interface ResponseData {
  success: boolean;
  code?: number;
  message: string;
  data: Record<string, unknown>;
}

export interface GenericMatch {
  [key: string]: string | number | Date | any;
}
