export class Template {
  constructor(
    public readonly merchantId: string,
    public readonly accessToken: string,
    public readonly refreshToken: string,
  ) {}
}
