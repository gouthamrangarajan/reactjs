import type { Route } from "../+types/home";
import { motion } from "motion/react";
import ContactMe from "~/components/ContactMe";
import Media from "~/components/Media";
import MyImg from "~/components/MyImg";
import TitleAndSub from "~/components/TitleAndSub";
import { Button } from "~/components/ui/button";
import { fadeIn, stagger } from "~/lib/animation";
import { actionFn, loaderFn } from "./loaderAndActions";

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
    info: { title, subTitle, media },
  } = loaderData;
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32">
        <motion.div
          className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <motion.div
              className="space-y-6"
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              <TitleAndSub title={title} subTitle={subTitle}></TitleAndSub>
              <motion.div className="flex gap-4" variants={fadeIn}>
                <Button variant="default" className="group">
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    View Projects
                  </motion.span>
                </Button>
                <Button variant="outline">Contact Me</Button>
              </motion.div>
              <Media items={media}></Media>
            </motion.div>
            <MyImg></MyImg>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {/* <motion.section
        className="px-4 py-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
      >
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-12 text-center"
            variants={fadeIn}
          >
            Featured Projects
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"></div>
        </div>
      </motion.section> */}

      <ContactMe></ContactMe>
    </div>
  );
}
