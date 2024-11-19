import AWS from 'aws-sdk';

export const database = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
});