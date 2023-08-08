const s3Client = require('../lib/s3-client');

/**
 * Handler that is invoked when a websocket connection is disconnected.
 * It is responsible for removing the connection id from the list of connection ids
 * stored in S3.
 */
export const handler = async (event, context) => {

    const log = require('lambda-log');

    // Add request id and function name to the log context
    log.options.meta = {
        functionName: context.functionName,
        requestId: context.awsRequestId
    };

    // Get the connection id from the event
    const connectionId = event.requestContext.connectionId;

    // Log the connection id
    log.info(`ConnectionId: ${connectionId}`);

    try {
        // Delete from S3
        const s3Results = await s3Client.deleteObject({
            Bucket: process.env.S3_BUCKET,
            Key: `${connectionId}.json`
        });
        log.info(`S3 Results: ${JSON.stringify(s3Results)}`);

        return {
            statusCode: 200
        };
    } catch (e) {
        log.error(e);
        return {
            statusCode: 500
        };
    }
    
};