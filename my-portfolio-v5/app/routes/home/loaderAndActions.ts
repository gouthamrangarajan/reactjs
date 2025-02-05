import { z } from "zod";
import type { Route } from "./+types";

export async function loaderFn({ context }: Route.LoaderArgs) {
  const { env } = context.cloudflare;
  const data = await env.my_portfolio_v2.get("data");
  const schema = z.object({
    info: z.object({
      title: z.string(),
      subTitle: z.string(),
      media: z.array(
        z.object({
          name: z.string(),
          url: z.string(),
          imgSrc: z.string(),
          height: z.number(),
          width: z.number(),
        })
      ),
    }),
  });
  const parsedData = schema.parse(JSON.parse(data!));
  return { ...parsedData };
}

export async function actionFn({ request, context }: Route.ActionArgs) {
  const fmData = await request.formData();
  const email = fmData.get("email")?.toString().trim() || "";
  const message = fmData.get("message")?.toString().trim() || "";
  const inValidEmail =
    !email || !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  const inValidMessage = !message || message.length < 10;
  if (inValidEmail && inValidMessage)
    return {
      message:
        "Error. Please provide valid email and message. Message should be at least 10 characters",
    };
  if (inValidEmail) return { message: "Error. Please provide valid email." };
  if (inValidMessage)
    return {
      message:
        "Error. Please provide valid message. Message should be at least 10 characters",
    };

  //   let emailTemplate = render(
  //     <EmailTemplate email={email} message={message}></EmailTemplate>
  //   );
  //   try {
  //     const {
  //       env: { RESEND_API_KEY },
  //     } = contextSchema.parse(context);
  //     const emailResp = await fetch("https://api.resend.com/emails", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${RESEND_API_KEY}`,
  //       },
  //       body: JSON.stringify({
  //         from: "RG <gouthamrangarajan@resend.dev>",
  //         to: ["rgouthamraja@yahoo.com"],
  //         subject: "New Message | Portfolio",
  //         html: emailTemplate,
  //       }),
  //     });

  //     if (!emailResp.ok) {
  //       let jsonResp = await emailResp.json();
  //       console.log("error sending email", jsonResp);
  //       return { message: "Error sending email." };
  //     }
  //   } catch (err) {
  //     console.log("error sending email", err);
  //     return { message: "Error sending email." };
  //   }
  return {
    message:
      "Thank you so much for reaching out. I'll get back to you as soon I can.",
  };
}
