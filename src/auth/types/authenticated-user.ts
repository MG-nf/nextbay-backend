export type AuthenticatedUser = {
  id: number;
  username: string;
};

export type JwtPayload = {
  sub: number;
  username: string;
};
