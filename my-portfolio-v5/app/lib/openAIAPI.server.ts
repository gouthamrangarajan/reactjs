import { z } from "zod";

export const getEmbedding = async ({
  textToEmbed,
  apiKey,
  apiUrl,
  model,
}: {
  textToEmbed: string;
  apiKey: string;
  apiUrl: string;
  model: string;
}) => {
  const respRaw = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model,
      input: textToEmbed,
    }),
  });
  const resp = await respRaw.json();
  const schema = z.object({
    data: z.array(z.object({ embedding: z.array(z.number()) })),
  });
  const parsedResp = schema.parse(resp);
  return parsedResp.data[0].embedding;
};
