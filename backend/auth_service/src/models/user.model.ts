export class User {
    constructor (
        public readonly userId: string,
        public readonly merchantId: string,
        public readonly accessToken: string,
        public readonly refreshToken: string
    ) {}
}