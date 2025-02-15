import { AnimatePresence, motion } from "motion/react";
import { fadeIn, fetcherResultMessage, stagger } from "~/lib/animation";
import { Card, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useFetcher } from "react-router";
import { useEffect, useRef, type Ref } from "react";

export default function ContactMe({
  formActionUrl,
  ref,
}: {
  formActionUrl: string;
  ref: Ref<HTMLDivElement>;
}) {
  const fetcher = useFetcher();
  const formEl = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (
      fetcher.data &&
      fetcher.data.message &&
      fetcher.state == "idle" &&
      !fetcher.data.message.toLowerCase().includes("error") &&
      formEl.current
    )
      formEl.current.reset();
  }, [fetcher.data?.message, fetcher.state]);
  return (
    <motion.section
      className="px-4 py-20"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={stagger}
    >
      <div className="mx-auto max-w-xl">
        <motion.div className="mb-12 text-center" variants={fadeIn}>
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Get in Touch</h2>
          <p className="text-gray-400">
            Have a question in mind? I’d love to hear from you!
          </p>
        </motion.div>
        <motion.div variants={fadeIn}>
          <Card className="border-gray-700 bg-gray-800/50">
            <CardDescription className="px-4 py-2">
              <AnimatePresence>
                {fetcher.data &&
                  fetcher.data.message &&
                  fetcher.state == "idle" && (
                    <motion.span
                      variants={fetcherResultMessage}
                      initial="initial"
                      exit="exit"
                      animate="animate"
                      layout="position"
                      className={`origin-top text-base ${
                        fetcher.data.message.includes("Error")
                          ? "text-red-300"
                          : "text-green-300"
                      }`}
                    >
                      {fetcher.data.message}
                    </motion.span>
                  )}
              </AnimatePresence>
            </CardDescription>
            <fetcher.Form
              className="space-y-6 p-6"
              method="POST"
              action={formActionUrl}
              ref={formEl}
            >
              <motion.div
                className="space-y-2"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
                layout="position"
              >
                <label className="text-sm text-gray-400">Email</label>
                <Input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="border-gray-700 bg-gray-900 disabled:cursor-not-allowed disabled:opacity-80"
                  disabled={fetcher.state == "submitting"}
                />
              </motion.div>
              <motion.div
                className="space-y-2"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
                layout="position"
                ref={ref}
              >
                <label className="text-sm text-gray-400">Message</label>
                <Textarea
                  name="message"
                  required
                  placeholder="Your message..."
                  className="min-h-[150px] border-gray-700 bg-gray-900 disabled:cursor-not-allowed disabled:opacity-80"
                  minLength={10}
                  // message="Please enter at least 10 characters."
                  disabled={fetcher.state == "submitting"}
                />
              </motion.div>
              <motion.div layout="position" className="w-full">
                <Button
                  className="group w-full disabled:animate-pulse disabled:cursor-not-allowed"
                  disabled={fetcher.state == "submitting"}
                >
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    Send Message
                  </motion.span>
                </Button>
              </motion.div>
            </fetcher.Form>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
