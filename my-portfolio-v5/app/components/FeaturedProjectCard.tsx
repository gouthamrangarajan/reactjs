import { motion } from "motion/react";
import { Card } from "./ui/card";
import { ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";

export default function FeaturedProjectCard({
  title,
  imgSrc,
  url,
  description,
  tags,
}: {
  title: string;
  imgSrc: string;
  url: string;
  description: string;
  tags: string[];
}) {
  return (
    <Card className="group h-[28rem] overflow-hidden border-gray-700 bg-gray-800/50">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imgSrc}
          alt={`image for ${title}`}
          width={600}
          height={400}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <motion.a
            href={url}
            target="_blank"
            className="text-gray-400 hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="h-5 w-5" />
          </motion.a>
        </div>
        <p className="text-sm text-gray-400">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tech) => (
            <motion.div
              key={tech}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Badge variant="secondary">{tech}</Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}
