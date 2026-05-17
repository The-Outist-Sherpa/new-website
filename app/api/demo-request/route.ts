import { NextRequest, NextResponse } from "next/server";

type DemoRequestPayload = {
  captchaAnswer?: unknown;
  captchaLeft?: unknown;
  captchaRight?: unknown;
  companyName?: unknown;
  countryCode?: unknown;
  fullName?: unknown;
  mobileNumber?: unknown;
};

const demoRequestTo = parseEmailList(
  process.env.DEMO_REQUEST_TO ?? "integrations@theoutist.com",
);
const demoRequestFrom = process.env.DEMO_REQUEST_FROM ?? "The Outist <hello@theoutist.com>";
const textOnlyPattern = /^[A-Za-z\s.'’&()-]+$/;
const mobilePattern = /^\d{6,15}$/;

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
  const captchaLeft = cleanNumber(payload.captchaLeft);
  const captchaRight = cleanNumber(payload.captchaRight);
  const captchaAnswer = cleanNumber(payload.captchaAnswer);

  if (!fullName || !mobileNumber || !companyName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!textOnlyPattern.test(fullName) || !textOnlyPattern.test(companyName)) {
    return NextResponse.json({ error: "Name and company cannot include numbers" }, { status: 400 });
  }

  if (!mobilePattern.test(mobileNumber)) {
    return NextResponse.json({ error: "Mobile number must contain only digits" }, { status: 400 });
  }

  if (captchaLeft === null || captchaRight === null || captchaAnswer !== captchaLeft + captchaRight) {
    return NextResponse.json({ error: "Captcha verification failed" }, { status: 400 });
  }

  const subject = `[${fullName}] The Outist - Demo Inquiry`;
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
    console.error("Unable to send demo request email", {
      error: errorText,
      from: demoRequestFrom,
      status: resendResponse.status,
      to: demoRequestTo,
    });

    return NextResponse.json({ error: "Unable to send email" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, emailSent: true });
}

function cleanField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanNumber(value: unknown) {
  const stringValue = cleanField(value);
  if (!/^\d+$/.test(stringValue)) {
    return null;
  }

  return Number(stringValue);
}

function parseEmailList(value: string) {
  return value
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}
