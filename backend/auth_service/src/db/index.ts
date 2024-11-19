import AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
});

export { dynamoDb };