import type { Route } from "./+types";
import { motion } from "motion/react";
import { loaderFn } from "./loader.server";
import ProjectCard from "~/components/ProjectCard";

export const loader = loaderFn;

export default function index({ loaderData }: Route.ComponentProps) {
  return (
    <main className="h-screen overflow-x-hidden overflow-y-scroll scroll-smooth bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Header */}
        <div className="mb-12 space-y-2 text-center">
          <h1 className="text-3xl font-bold">Demos</h1>
          <p className="text-gray-400">Explore my latest projects</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loaderData.demos.map((project, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              key={project.title}
            >
              <ProjectCard {...project}></ProjectCard>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
