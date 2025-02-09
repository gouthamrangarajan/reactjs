import { motion } from "motion/react";
import ContactMe from "~/components/ContactMe";
import Media from "~/components/Media";
import MyImg from "~/components/MyImg";
import TitleAndSub from "~/components/TitleAndSub";
import { Button } from "~/components/ui/button";
import { fadeIn, stagger } from "~/lib/animation";
import { actionFn, loaderFn } from "./loaderAndActions.server";
import type { Route } from "./+types";
import { useRef } from "react";
import ProjectCard from "~/components/FeaturedProjectCard";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goutham Rangarajan" },
    { name: "description", content: "Goutham Rangarajan Portfolio" },
  ];
}

export const loader = loaderFn;
export const action = actionFn;

export default function Home({ loaderData }: Route.ComponentProps) {
  const {
    info: {
      title,
      subTitle,
      media,
      demos: { featured },
    },
  } = loaderData;
  const contactMeEl = useRef<HTMLDivElement>(null);
  return (
    <main className="h-screen overflow-x-hidden overflow-y-scroll scroll-smooth bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-100">
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32">
        <motion.div
          className="bg-grid-white/[0.02] absolute inset-0 bg-[size:50px_50px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <motion.div
              className="space-y-6"
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              <TitleAndSub title={title} subTitle={subTitle}></TitleAndSub>
              <motion.div className="flex gap-4" variants={fadeIn}>
                <Link
                  to="/projects"
                  className="appearance-none outline-none"
                  prefetch="render"
                >
                  <Button variant="default" className="group">
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      View Demos
                    </motion.span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={(ev) => {
                    ev.preventDefault();
                    contactMeEl.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                >
                  Contact Me
                </Button>
              </motion.div>
              <Media items={media}></Media>
            </motion.div>
            <MyImg></MyImg>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <motion.section
        className="px-4 py-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
      >
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="mb-12 text-center text-2xl font-bold md:text-3xl"
            variants={fadeIn}
          >
            Featured Demos
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((el, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectCard {...el}></ProjectCard>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <ContactMe formActionUrl="/?index" ref={contactMeEl}></ContactMe>
    </main>
  );
}
