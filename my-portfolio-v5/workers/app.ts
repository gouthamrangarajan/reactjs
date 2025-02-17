import { createRequestHandler } from "react-router";

declare global {
  interface CloudflareEnvironment extends Env {
    my_portfolio_v2: KVNamespace;
    OPENAI_API_EMBEDDING_MODEL: string;
    OPENAI_API_EMBEDDING_URL: string;
    OPENAI_API_KEY: string;
    PINECONE_API_KEY: string;
    PINECONE_FILTER_SCORE: number;
    PINECONE_HOST_URL: string;
    PINECONE_TOPK: number;
    RESEND_API_KEY: string;
  }
}

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: CloudflareEnvironment;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  // @ts-expect-error - virtual module provided by React Router at build time
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  fetch(request, env, ctx) {
    console.log("yo");
    return requestHandler(request, {
      cloudflare: { env, ctx },
    });
  },
} satisfies ExportedHandler<CloudflareEnvironment>;
