import type { Route } from "./+types";
import { render } from "@react-email/components";
import EmailTemplate from "~/components/EmailTemplate";
import { homePageSchema } from "~/lib/schemas.server";

export async function loaderFn({ context }: Route.LoaderArgs) {
  const { env } = context.cloudflare;
  const data = await env.my_portfolio_v2.get("data");
  const parsedData = homePageSchema.parse(JSON.parse(data!));
  parsedData.info.demos.featured.sort((a, b) => a.order - b.order);
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

  let emailTemplate = await render(
    <EmailTemplate email={email} message={message}></EmailTemplate>,
  );
  try {
    const { RESEND_API_KEY } = context.cloudflare.env;
    const emailResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "RG <gouthamrangarajan@resend.dev>",
        to: ["rgouthamraja@yahoo.com"],
        subject: "New Message | Portfolio",
        html: emailTemplate,
      }),
    });

    if (!emailResp.ok) {
      let jsonResp = await emailResp.json();
      console.log("error sending email", jsonResp);
      return { message: "Error sending email." };
    }
  } catch (err) {
    console.log("error sending email", err);
    return { message: "Error sending email." };
  }
  return {
    message:
      "Thank you so much for reaching out. I'll get back to you as soon I can.",
  };
}
