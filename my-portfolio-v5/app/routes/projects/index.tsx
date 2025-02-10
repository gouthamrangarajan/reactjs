import type { Route } from "./+types";
import { motion } from "motion/react";
import { loaderFn } from "./loader.server";
import ProjectCard from "~/components/ProjectCard";
import { useSearchParams } from "react-router";
import FilterProjects from "~/components/FilterProjects";
import { fadeIn2, stagger } from "~/lib/animation";

export const loader = loaderFn;

export default function index({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSarchParams] = useSearchParams();
  const categoryFilterValue = searchParams.get("category");
  return (
    <main className="h-screen overflow-x-hidden overflow-y-scroll scroll-smooth bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Header */}
        <div className="mb-12 space-y-2 text-center">
          <h1 className="text-3xl font-bold">Demos</h1>
          <p className="text-gray-400">Explore my latest projects</p>
        </div>
        {/* Filters */}
        <div className="mb-8 grid gap-4 md:grid-cols-[1fr_200px]">
          <FilterProjects
            filters={loaderData.filters}
            category={categoryFilterValue}
            onCategoryChange={(value) => {
              setSarchParams({ category: value });
            }}
          ></FilterProjects>
        </div>
        {/* Projects Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {loaderData.demos.map((project, index) => (
            <motion.div
              variants={fadeIn2}
              key={`${project.title}`}
              layout="position"
              viewport={{ once: true }}
            >
              <ProjectCard {...project}></ProjectCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
