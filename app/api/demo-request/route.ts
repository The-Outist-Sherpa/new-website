import { NextRequest, NextResponse } from "next/server";

type DemoRequestPayload = {
  companyName?: unknown;
  countryCode?: unknown;
  fullName?: unknown;
  mobileNumber?: unknown;
};

const demoRequestTo = process.env.DEMO_REQUEST_TO ?? "Karthiklm92@gmail.com";
const demoRequestFrom = process.env.DEMO_REQUEST_FROM ?? "The Outist <onboarding@resend.dev>";

export async function POST(request: NextRequest) {
  let payload: DemoRequestPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const fullName = cleanField(payload.fullName);
  const mobileNumber = cleanField(payload.mobileNumber);
  const countryCode = cleanField(payload.countryCode) || "+91";
  const companyName = cleanField(payload.companyName);

  if (!fullName || !mobileNumber || !companyName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const subject = `[${fullName}] The Outist - Demo Requiry`;
  const text = [
    "New demo request from The Outist landing page.",
    "",
    `Fullname: ${fullName}`,
    `Mobile Number: ${countryCode} ${mobileNumber}`,
    `Company Name: ${companyName}`,
  ].join("\n");

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.warn("Demo request email not sent because RESEND_API_KEY is not configured.", {
      companyName,
      countryCode,
      fullName,
      mobileNumber,
      subject,
      to: demoRequestTo,
    });

    return NextResponse.json({ ok: true, emailSent: false });
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: demoRequestFrom,
      to: demoRequestTo,
      subject,
      text,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error("Unable to send demo request email", errorText);

    return NextResponse.json({ error: "Unable to send email" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, emailSent: true });
}

function cleanField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}
