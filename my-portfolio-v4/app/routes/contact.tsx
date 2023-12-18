import { render } from "@react-email/components";
import { type ActionFunctionArgs } from "@remix-run/cloudflare";
import { Link, useFetcher } from "@remix-run/react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import EmailTemplate from "~/components/EmailTemplate";
import Nav from "~/components/Nav";
import { contextSchema } from "~/utils/schema";

export async function action({ request, context }: ActionFunctionArgs) {
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
        "Error. Please provide valid message. Message should be at least 10 characteers",
    };

  let emailTemplate = render(
    <EmailTemplate email={email} message={message}></EmailTemplate>,
  );
  try {
    const {
      env: { RESEND_API_KEY },
    } = contextSchema.parse(context);
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

export default function contact() {
  const fetcher = useFetcher();
  const formEl = useRef<HTMLFormElement>(null);
  let fetcherDataMessage = "";
  if (fetcher?.data)
    fetcherDataMessage = (fetcher.data as { message: string }).message;
  useEffect(() => {
    if (
      fetcherDataMessage != "" &&
      !fetcherDataMessage.toLowerCase().includes("error") &&
      formEl.current
    )
      formEl.current.reset();
  }, [fetcherDataMessage]);
  return (
    <main className="flex h-screen  w-screen animate-fade-in flex-col items-center justify-center">
      <Nav
        menu={
          <div className="flex flex-1 items-center space-x-3 text-white ">
            <span className="px-3 py-1 text-sm text-gray-100">
              Check out my Demos
            </span>
            <Link
              to="/cloud"
              prefetch="intent"
              className="rounded-md px-3  py-1 text-white transition duration-300
                                hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-700"
            >
              Cloud Projects
            </Link>
            <Link
              to="/repo"
              prefetch="intent"
              className="rounded-md px-3  py-1 text-white transition duration-300
                hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-700"
            >
              Github &amp; Codepen
            </Link>
          </div>
        }
      ></Nav>
      <fetcher.Form className="flex flex-col gap-3" method="POST" ref={formEl}>
        <motion.h1
          className="w-96 text-center text-lg font-semibold text-slate-600"
          layout="position"
        >
          Contact Me
        </motion.h1>
        {fetcherDataMessage && (
          <p
            className={`w-96 animate-contact-message py-1 text-sm font-semibold ${
              fetcherDataMessage.includes("Error")
                ? "text-red-600"
                : "text-teal-700"
            }`}
          >
            {fetcherDataMessage}
          </p>
        )}
        <motion.fieldset className="flex flex-col" layout="position">
          <label htmlFor="email" className="text-gray-600">
            Your email
          </label>
          <input
            type="email"
            required
            className="w-96 appearance-none rounded border-2 border-slate-700 px-3 py-1 outline-none transition
                     duration-300 placeholder:italic focus:ring-1 focus:ring-slate-700 focus:ring-offset-2 focus:ring-offset-slate-50"
            placeholder="name@example.com"
            name="email"
            id="email"
          />
        </motion.fieldset>
        <motion.fieldset className="flex flex-col" layout="position">
          <label htmlFor="message" className="text-gray-600">
            Your message
          </label>
          <textarea
            required
            className="w-96 appearance-none rounded border-2 border-slate-700 px-3 py-1 outline-none transition
                     duration-300 scrollbar-thin scrollbar-track-gray-50  scrollbar-thumb-gray-500 placeholder:italic focus:ring-1
                     focus:ring-slate-700 focus:ring-offset-2 focus:ring-offset-slate-50"
            name="message"
            id="message"
            rows={5}
          />
        </motion.fieldset>
        <motion.button
          layout="position"
          type="submit"
          className="w-96 appearance-none rounded bg-slate-700 px-4 py-2 text-white outline-none focus:ring-2
                     focus:ring-slate-700 focus:ring-offset-2 focus:ring-offset-slate-50 disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={fetcher.state == "submitting"}
          onClick={(ev) => {
            if (fetcher.state !== "submitting")
              fetcher.submit((ev.target as HTMLButtonElement).form);
          }}
        >
          Send message
        </motion.button>
      </fetcher.Form>
    </main>
  );
}
