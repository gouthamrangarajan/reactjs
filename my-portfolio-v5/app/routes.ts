import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/home/index.tsx"),
  route("projects", "./routes/projects/index.tsx"),
] satisfies RouteConfig;
