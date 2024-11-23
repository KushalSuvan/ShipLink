export class Shipping {
  constructor(
    public readonly merchantId: string,
    public readonly accessToken: string,
    public readonly refreshToken: string,
  ) {}
}
