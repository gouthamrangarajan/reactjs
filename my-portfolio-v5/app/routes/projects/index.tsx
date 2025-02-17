import type { Route } from "./+types";
import { motion } from "motion/react";
import { loaderFn } from "./loader.server";
import ProjectCard from "~/components/ProjectCard";
import { Form, useSearchParams } from "react-router";
import FilterProjects from "~/components/FilterProjects";
import { fadeIn2, stagger2 } from "~/lib/animation";

export const loader = loaderFn;

export default function index({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSarchParams] = useSearchParams();
  const categoryFilterValue = searchParams.get("category");
  const srchTxtFilterValue = searchParams.get("srchTxt")?.toString() || "";
  return (
    <main className="h-screen overflow-x-hidden overflow-y-scroll scroll-smooth bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-600">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Header */}
        <div className="mb-12 space-y-2 text-center">
          <h1 className="text-3xl font-bold">Demos</h1>
          <p className="text-gray-400">Explore my latest projects</p>
        </div>
        {/* Filters */}
        <Form className="mb-8 grid gap-4 md:grid-cols-[1fr_200px]" method="GET">
          <FilterProjects
            filters={loaderData.filters}
            category={categoryFilterValue}
            onCategoryChange={(value) => {
              if (srchTxtFilterValue) {
                setSarchParams(
                  { category: value, srchTxt: srchTxtFilterValue },
                  { replace: true },
                );
              } else {
                setSarchParams({ category: value }, { replace: true });
              }
            }}
            searchTxt={srchTxtFilterValue}
            onSearchTxtChange={(value) => {
              if (categoryFilterValue) {
                setSarchParams(
                  { category: categoryFilterValue, srchTxt: value },
                  { replace: true },
                );
              } else {
                setSarchParams({ srchTxt: value }, { replace: true });
              }
            }}
          ></FilterProjects>
        </Form>
        {/* Projects Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={stagger2}
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
        {loaderData.demos.length === 0 && (
          <div className="py-12 text-center">
            <motion.p
              className="text-gray-400"
              variants={fadeIn2}
              initial="initial"
              animate="animate"
            >
              No projects found matching your criteria.
            </motion.p>
          </div>
        )}
      </div>
    </main>
  );
}
