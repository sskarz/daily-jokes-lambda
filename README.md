# Daily Jokes Lambda

This folder contains a simple AWS Lambda function that returns a joke fetched in real-time from the [Official Joke API](https://official-joke-api.appspot.com/random_joke).

## Local CLI client

To try the deployed API from your terminal:

```bash
node cli.js
```

You can then choose option `1` for a new joke or `2` to exit.

## Deploying to AWS Lambda (console)

1. Open the `daily-jokes-lambda` folder and zip the contents:
   ```bash
   cd daily-jokes-lambda
   zip deployment.zip index.js
   ```
2. In the AWS Console, go to **Lambda → Create function**.
3. Choose **Author from scratch**, give your function a name (for example `daily-jokes-api`), and pick the **Node.js 22.x** runtime.
4. Leave the default execution role or create a basic one if needed, then click **Create function**.
5. Under the **Code** tab select **Upload from → .zip file** and upload `deployment.zip`.
6. Set the **Handler** field to `index.handler`, then click **Save**.
7. Test the function with the built-in **Test** button. A sample event with an empty object `{}` is enough.

## Exposing as an HTTPS endpoint with API Gateway

1. Still on the Lambda function page, open the **Triggers** panel and click **Add trigger**.
2. Choose **API Gateway**, select **Create an API**, and pick **HTTP API** for a lightweight endpoint.
3. Leave security as **Open** (or configure a JWT/authorizer if you need auth) and click **Add**.
4. Note the invoke URL shown in the API Gateway trigger details. This URL is the public endpoint returning the daily joke.

## Updating the function

When you update `index.js`, repeat the zipping step and upload a new .zip in the console (or use `aws lambda update-function-code --function-name daily-jokes-api --zip-file fileb://deployment.zip` if you prefer the AWS CLI).
