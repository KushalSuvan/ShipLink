# Authentication Service

This project is an Express.js-based authentication service that provides APIs for user authentication and management. All calls to SP-API are routed through this service

## Features
- User registration
- User login
- Token-based authentication
- Secure password storage using bcrypt
- SP-API calls

---

## Getting Started

### Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

Install dependencies:

```bash
npm install
```
or

```bash
yarn install
```

### Environment Variables
Set up a .env file in the backend/auth directory. Alternatively, set the environment variables for the bash session.

| Variable Name        | Description                                      | Example                                  |
|----------------------|--------------------------------------------------|------------------------------------------|
| `PORT`               | The port number the server will listen on        | `8000`                                   |
| `AWS_ACCESS_KEY_ID`  | The AWS Access Token                             | Visit AWS IAM to get credentials         |
| `AWS_SECRET_ACCESS_KEY` | The AWS Secret Access Token                   | Visit AWS IAM to get credentials         |
| `AWS_REGION`         | The AWS region for DynamoDB                      | `us-east-1`                              |
| `JWT_SECRET`         | Secret key for signing JSON Web Tokens           | `your-secure-jwt-secret`                 |
| `JWT_EXPIRATION`     | Duration of JWT token validity                   | `1h`                                     |
| `BCRYPT_SALT_ROUNDS` | Number of salt rounds for bcrypt hashing         | `10`                                     |


## Running the service
### Build
Transpile the TypeScript

```bash
npm run build

```

or 

```bash
yarn build
```
### Serve

Run the server
```bash
npm start

```

or 

```bash
yarn start
```

For development with live reload:
```bash
npm run dev

```

or 

```bash
yarn dev
```

The server will be accessible at 

