import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';

const dynamoDb = new DynamoDBClient({});

const connectDb = async () => {
    const command = new ListTablesCommand({});
    try {
        const result = await dynamoDb.send(command)
        console.log(`🌏 DynamoDB connected`)
        // console.log(result);
        
    } catch (e) {
        console.log('❌ Failed to connect to DynamoDB')
        console.error(e)
    }
}

export { dynamoDb, connectDb };