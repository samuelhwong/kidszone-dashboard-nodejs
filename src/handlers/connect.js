const s3Client = require('../lib/s3-client');

/**
 * Handler that is invoked when a websocket connection is established.
 * It is responsible for adding the connection id to the list of connection ids
 * stored in S3.
 */
exports.handler = async (event, context) => {

    const log = require('lambda-log');

    // Add request id and function name to the log context
    log.options.meta = {
        functionName: context.functionName,
        requestId: context.awsRequestId,
    };

    // Get the connection id from the event
    const connectionId = event.requestContext.connectionId;

    // Log the connection id
    log.info(`ConnectionId: ${connectionId}`);

    try {
        // Upload to S3
        const s3Results = await s3Client.putObject({
            Bucket: process.env.S3_BUCKET,
            Body: JSON.stringify({ createdAt: Date.now() }),
            ContentType: "application/json",
            Key: `${connectionId}.json`,
        });
        log.info(`S3 Results: ${JSON.stringify(s3Results)}`);

        return {
            statusCode: 200,
        };
    } catch (e) {
        log.error(e);
        return {
            statusCode: 500,
        };
    }
};