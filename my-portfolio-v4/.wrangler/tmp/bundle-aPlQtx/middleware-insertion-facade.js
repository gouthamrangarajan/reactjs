				import worker, * as OTHER_EXPORTS from "C:\\RG\\github\\reactjs\\my-portfolio-v4\\.wrangler\\tmp\\pages-gnHg61\\8a2ecv7zinb.js";
				import * as __MIDDLEWARE_0__ from "C:\\RG\\github\\reactjs\\my-portfolio-v4\\node_modules\\wrangler\\templates\\middleware\\middleware-miniflare3-json-error.ts";
				const envWrappers = [__MIDDLEWARE_0__.wrap].filter(Boolean);
				const facade = {
					...worker,
					envWrappers,
					middleware: [
						__MIDDLEWARE_0__.default,
            ...(worker.middleware ? worker.middleware : []),
					].filter(Boolean)
				}
				export * from "C:\\RG\\github\\reactjs\\my-portfolio-v4\\.wrangler\\tmp\\pages-gnHg61\\8a2ecv7zinb.js";

				const maskDurableObjectDefinition = (cls) =>
					class extends cls {
						constructor(state, env) {
							let wrappedEnv = env
							for (const wrapFn of envWrappers) {
								wrappedEnv = wrapFn(wrappedEnv)
							}
							super(state, wrappedEnv);
						}
					};
				

				export default facade;