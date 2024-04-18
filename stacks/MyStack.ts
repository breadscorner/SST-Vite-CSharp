import { StackContext, Api, StaticSite, Bucket } from "sst/constructs";

export function API({ stack }: StackContext) {
  const audience = "https://breadscorner.kinde.com/api";

  const assetsBucket = new Bucket(stack, "assets");

  const api = new Api(stack, "api", {
    authorizers: {
      myAuthorizer: {
        type: "jwt",
        jwt: {
          issuer: "https://breadscorner.kinde.com/",
          audience: [audience],
        },
      },
    },
    defaults: {
      authorizer: "myAuthorizer",
      function: {
        environment: {
          DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL!,
        },
      },
    },

    routes: {
      "GET /api": "packages/functions/src/lambda.handler",
      "GET /posts": {
        authorizer: "none",
        function: {
          handler: "packages/functions/src/posts.handler",
        },
      },
      "POST /posts": {
        authorizer: "none",
        function: {
          handler: "packages/functions/src/posts.handler",
        },
      },
      "DELETE /posts": {
        authorizer: "none",
        function: {
          handler: "packages/functions/src/posts.handler",
        },
      },
      "POST /likes": {
        authorizer: "none",
        function: {
          handler: "packages/functions/src/likes.handler",
        },
      },
      // "GET /hello-jsx": "packages/functions/src/hello-jsx.handler",
      "POST /signed-url": {
        authorizer: "none",
        function: {
          environment: {
            ASSETS_BUCKET_NAME: assetsBucket.bucketName,
          },
          handler: "packages/functions/src/s3.handler",
        },
      },
      "GET /": {
        function: {
          handler: "packages/csharp/my-csharp-app",
          runtime: "container",
        },
      },
    },
  });

  api.attachPermissionsToRoute("POST /signed-url", [assetsBucket, "grantPut"]);

  const web = new StaticSite(stack, "web", {
    path: "packages/web",
    buildOutput: "dist",
    buildCommand: "pnpm run build",
    environment: {
      VITE_APP_API_URL: api.url,
      VITE_APP_KINDE_AUDIENCE: audience,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    WebsiteURL: web.url,
  });
}
