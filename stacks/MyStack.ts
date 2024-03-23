import { StackContext, Api, StaticSite } from "sst/constructs";

export function API({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /api": "packages/functions/src/lambda.handler", // Example API route
      "GET /hello": "packages/functions/src/hello.handler",
      "GET /hello-jsx": "packages/functions/src/hello-jsx.handler",
      "GET /cs": {
        function: {
          handler: "packages/csharp/my-csharp-app",
          runtime: "container",
        },
      },
    },
  });

  const web = new StaticSite(stack, "web", {
    path: "packages/web",
    buildOutput: "dist",
    buildCommand: "pnpm run build",
    environment: {
      VITE_APP_API_URL: api.url,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    WebsiteURL: web.url,
  });
}
