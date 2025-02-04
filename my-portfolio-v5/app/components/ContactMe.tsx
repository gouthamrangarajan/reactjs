import { motion } from "motion/react";
import { fadeIn, stagger } from "~/lib/animation";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useFetcher } from "react-router";

export default function ContactMe() {
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
            <fetcher.Form className="p-6 space-y-6" method="POST">
              <motion.div
                className="space-y-2"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
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
              >
                <label className="text-sm text-gray-400">Message</label>
                <Textarea
                  name="message"
                  required
                  placeholder="Your message..."
                  className="bg-gray-900 border-gray-700 min-h-[150px]"
                />
              </motion.div>
              <Button className="w-full group">
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  Send Message
                </motion.span>
              </Button>
            </fetcher.Form>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
