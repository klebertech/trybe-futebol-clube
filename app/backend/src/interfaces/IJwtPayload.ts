interface JWTPayload {
  id?: number;
  username: string;
  role: string;
  email: string;
  password?: string;
}

export default JWTPayload;
