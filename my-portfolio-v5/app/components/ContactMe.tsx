import { AnimatePresence, motion } from "motion/react";
import { fadeIn, fetcherResultMessage, stagger } from "~/lib/animation";
import { Card, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useFetcher } from "react-router";

export default function ContactMe({
  formActionUrl,
}: {
  formActionUrl: string;
}) {
  const fetcher = useFetcher();
  return (
    <motion.section
      className="px-4 py-20"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={stagger}
    >
      <div className="mx-auto max-w-xl">
        <motion.div className="text-center mb-12" variants={fadeIn}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-400">
            Have a question in mind? I’d love to hear from you!
          </p>
        </motion.div>
        <motion.div variants={fadeIn}>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardDescription className="py-2 px-4">
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
              className="p-6 space-y-6"
              method="POST"
              action={formActionUrl}
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
                  className="bg-gray-900 border-gray-700"
                />
              </motion.div>
              <motion.div
                className="space-y-2"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
                layout="position"
              >
                <label className="text-sm text-gray-400">Message</label>
                <Textarea
                  name="message"
                  required
                  placeholder="Your message..."
                  className="bg-gray-900 border-gray-700 min-h-[150px]"
                  minLength={10}
                />
              </motion.div>
              <motion.div layout="position" className="w-full">
                <Button className="w-full group">
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
