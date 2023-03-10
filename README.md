# hpmaas_v1

Highly Personalised Messages as a Service (NodeJS)

A channel agnostic messaging service which fetches user requested data across the web in realtime and sends the results in a templatised format on their preferred channel.

Example use case could be receiving localised weather data, latest fuel price around surrounding suburbs, stock market data, all on a regular basis using Amazon EventBridge or on demand by calling the AWS Lambda function directly. All data is then automatically stored in a mongodb instance for BI purposes.  

Screenshot in link - https://i.ibb.co/jD4Nzf0/hpmaas.jpg

The screenshot example is setup using AWS Lambda functions and sent over Telegram on a schedule using Amazon EventBridge or on demand by calling the Lambda function directly within the message.

The data is retrieved and compiled independently of the sending channel, making it easy to adopt the service on other OTT channels such as WhatsApp, SMS, LINE, and WeChat."

Prerequisites:

1. Managing NodeJS Dependencies using Lambda Layers.
Lambda Layers allows you to setup dependency bundles across multiple Lambda functions. There is an awesome tutorial by Anjan Biswas which explains this in more detail: https://medium.com/@anjanava.biswas/nodejs-runtime-environment-with-aws-lambda-layers-f3914613e20e

2. NPM packages/dependencies required for telegram demo:
axios
telegram
mongodb
dotenv
