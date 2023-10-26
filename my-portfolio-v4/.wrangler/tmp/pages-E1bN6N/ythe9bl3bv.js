// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: ["/*"],
  exclude: ["/favicon.ico", "/build/*"]
};

// node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "C:\\RG\\github\\reactjs\\my-portfolio-v4\\.wrangler\\tmp\\pages-E1bN6N\\functionsWorker-0.03527498280850527.mjs";
export * from "C:\\RG\\github\\reactjs\\my-portfolio-v4\\.wrangler\\tmp\\pages-E1bN6N\\functionsWorker-0.03527498280850527.mjs";
import { isRoutingRuleMatch } from "C:\\RG\\github\\reactjs\\my-portfolio-v4\\node_modules\\wrangler\\templates\\pages-dev-util.ts";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        if (worker.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return worker.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=ythe9bl3bv.js.map
