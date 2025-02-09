import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink } from "lucide-react";

export default function ProjectCard({
  imgSrc,
  title,
  service,
  imgBadgeLightMode,
  description,
  tags,
  url,
}: {
  imgSrc: string;
  title: string;
  service: string;
  imgBadgeLightMode?: boolean | undefined;
  description: string;
  tags: string[];
  url: string;
}) {
  return (
    <Card className="group h-full overflow-hidden border-gray-700 bg-gray-800/50">
      <CardContent className="p-0">
        <motion.div
          className="relative aspect-video overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={imgSrc}
            alt={title}
            width={600}
            height={400}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {service != "Github" && service != "Codepen" && (
            <Badge
              className="absolute right-4 top-4"
              variant={imgBadgeLightMode === true ? "default" : "secondary"}
            >
              {service}
            </Badge>
          )}
        </motion.div>
        <div className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="line-clamp-1 text-lg font-semibold">{title}</h3>
            <div className="flex shrink-0 gap-2">
              {service === "Github" && (
                <img
                  height={20}
                  width={20}
                  src="/imgs/media/github-simple.svg"
                />
              )}
              {service === "Codepen" && (
                <img
                  height={20}
                  width={20}
                  src="/imgs/media/codepen-simple.svg"
                />
              )}
              <a
                href={url}
                target="_blank"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>
          <p className="line-clamp-2 text-sm text-gray-400">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tech) => (
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                key={tech}
              >
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
