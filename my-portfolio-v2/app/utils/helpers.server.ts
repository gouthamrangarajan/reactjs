import { createStorage } from "unstorage";
import redisDriver from "unstorage/drivers/redis";
import { z } from "zod";
import { dataSchema } from "./schema";

const envSchema = z.object({
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
  REDIS_USER: z.string(),
  REDIS_PWD: z.string(),
});

const env = envSchema.parse(process.env);
const redisStorage = createStorage({
  driver: redisDriver({
    url: `reds://${env.REDIS_USER}:${env.REDIS_PWD}@${env.REDIS_HOST}:${env.REDIS_PORT}`,
    maxRetriesPerRequest: 1,
    commandTimeout: 500,
    connectTimeout: 500,
  }),
});

export async function getData() {
  return await redisStorage.getItem<z.infer<typeof dataSchema>>(
    "portfolio_data",
  );
}
