"use client";

import Image from "next/image";
import { Loader2, Send, ShieldCheck, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const SIGNUP_URL = "about:blank";

type DemoFormState = {
  captchaAnswer: string;
  captchaLeft: string;
  captchaRight: string;
  companyName: string;
  countryCode: string;
  fullName: string;
  mobileNumber: string;
};

const initialFormState: DemoFormState = {
  captchaAnswer: "",
  captchaLeft: "4",
  captchaRight: "3",
  companyName: "",
  countryCode: "+91",
  fullName: "",
  mobileNumber: "",
};

const countryCodes = ["+91", "+1", "+44", "+61", "+971", "+65"];

export function TrialSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [formState, setFormState] = useState<DemoFormState>(initialFormState);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const createCaptcha = () => {
    const left = Math.floor(Math.random() * 7) + 2;
    const right = Math.floor(Math.random() * 7) + 2;

    return { left: String(left), right: String(right) };
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const openDemoModal = () => {
      const captcha = createCaptcha();
      setFormState((current) => ({
        ...current,
        captchaAnswer: "",
        captchaLeft: captcha.left,
        captchaRight: captcha.right,
      }));
      setIsModalOpen(true);
    };

    window.addEventListener("open-demo-modal", openDemoModal);

    return () => {
      window.removeEventListener("open-demo-modal", openDemoModal);
    };
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (formStatus !== "success") {
      return;
    }

    const closeTimer = window.setTimeout(() => {
      closeModal();
    }, 5000);

    return () => window.clearTimeout(closeTimer);
  }, [formStatus]);

  const updateField = (field: keyof DemoFormState, value: string) => {
    const nextValue =
      field === "mobileNumber" || field === "captchaAnswer"
        ? value.replace(/\D/g, "")
        : field === "fullName" || field === "companyName"
          ? value.replace(/[0-9]/g, "")
          : value;

    setFormState((current) => ({ ...current, [field]: nextValue }));
    setFormStatus("idle");
  };

  const resetForm = () => {
    const captcha = createCaptcha();
    setFormState({
      ...initialFormState,
      captchaLeft: captcha.left,
      captchaRight: captcha.right,
    });
    setFormStatus("idle");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormStatus("idle");
    setFormState(initialFormState);
  };

  const submitDemoRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("submitting");

    if (Number(formState.captchaAnswer) !== Number(formState.captchaLeft) + Number(formState.captchaRight)) {
      setFormStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error("Unable to submit demo request");
      }

      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  const openSignup = () => {
    window.open(SIGNUP_URL, "_blank", "noopener,noreferrer");
  };

  const demoModal = isModalOpen ? (
    <div
      className="fixed inset-0 z-[999] flex min-h-dvh items-center justify-center overflow-y-auto bg-sherpa-ink/48 px-5 py-8 backdrop-blur-sm"
      role="presentation"
    >
      <div
        aria-modal="true"
        role="dialog"
        aria-labelledby="demo-request-title"
        className="relative my-auto max-h-[calc(100dvh-40px)] w-full max-w-[560px] overflow-y-auto rounded-[28px] border border-sherpa-ink/10 bg-white p-6 shadow-[0_22px_70px_rgba(32,44,61,0.22)] sm:p-8"
      >
        <button
          type="button"
          aria-label="Close demo form"
          onClick={closeModal}
          className="absolute right-5 top-5 inline-flex size-10 items-center justify-center rounded-full border border-sherpa-ink/10 bg-white text-sherpa-ink transition-colors hover:bg-[#f4f6f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sherpa-ink/30"
        >
          <X aria-hidden className="size-5" strokeWidth={2} />
        </button>

        <div className="pr-12">
          <h3
            id="demo-request-title"
            className="text-[30px] font-medium leading-[1.15] text-sherpa-ink sm:text-[36px]"
          >
            Book a Demo
          </h3>
          <p className="mt-3 text-base leading-[1.55] text-sherpa-ink/70">
            Share a few details and we will help you see how The Outist fits your proposal flow.
          </p>
        </div>

        {formStatus === "success" ? (
          <div className="mt-8 rounded-[22px] border border-sherpa-lime bg-sherpa-lime/30 p-5">
            <div className="flex items-start gap-4">
              <Loader2
                aria-hidden
                className="mt-1 size-5 shrink-0 animate-spin text-sherpa-ink"
                strokeWidth={2}
              />
              <div className="flex flex-col gap-3">
                <p className="text-base font-medium leading-[1.55] text-sherpa-ink">
                  Thanks for show interest in The Outist. We have received you demo request, We will get back to you within 4hrs.
                </p>
                <p className="text-sm leading-[1.45] text-sherpa-ink/65">
                  This window will close automatically in 5 seconds.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-sherpa-pill border border-sherpa-ink bg-sherpa-lime px-5 text-base font-medium text-sherpa-ink shadow-sherpa-button transition-transform active:translate-y-[2px] active:shadow-none"
            >
              Close
            </button>
          </div>
        ) : (
          <form className="mt-8 flex flex-col gap-5" onSubmit={submitDemoRequest}>
            <label className="flex flex-col gap-2 text-sm font-medium text-sherpa-ink">
              Fullname
              <input
                required
                value={formState.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                pattern="[A-Za-z\s.'’&()\-]+"
                title="Fullname cannot include numbers"
                className="h-14 rounded-[18px] border border-[#d8dde4] bg-white px-4 text-base font-normal text-sherpa-ink outline-none transition-colors placeholder:text-sherpa-ink/35 focus:border-sherpa-ink/70"
                placeholder="Enter your name"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-sherpa-ink">
              Mobile Number
              <div className="grid grid-cols-[112px_1fr] overflow-hidden rounded-[18px] border border-[#d8dde4] bg-white focus-within:border-sherpa-ink/70">
                <select
                  value={formState.countryCode}
                  onChange={(event) => updateField("countryCode", event.target.value)}
                  className="h-14 border-r border-[#d8dde4] bg-white px-4 text-base font-normal text-sherpa-ink outline-none"
                  aria-label="Country code"
                >
                  {countryCodes.map((countryCode) => (
                    <option key={countryCode} value={countryCode}>
                      {countryCode}
                    </option>
                  ))}
                </select>
                <input
                  required
                  inputMode="tel"
                  pattern="[0-9]{6,15}"
                  title="Mobile number should contain only digits"
                  value={formState.mobileNumber}
                  onChange={(event) => updateField("mobileNumber", event.target.value)}
                  className="h-14 bg-white px-4 text-base font-normal text-sherpa-ink outline-none placeholder:text-sherpa-ink/35"
                  placeholder="Mobile number"
                />
              </div>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-sherpa-ink">
              Company Name
              <input
                required
                value={formState.companyName}
                onChange={(event) => updateField("companyName", event.target.value)}
                pattern="[A-Za-z\s.'’&()\-]+"
                title="Company name cannot include numbers"
                className="h-14 rounded-[18px] border border-[#d8dde4] bg-white px-4 text-base font-normal text-sherpa-ink outline-none transition-colors placeholder:text-sherpa-ink/35 focus:border-sherpa-ink/70"
                placeholder="Enter company name"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-sherpa-ink">
              Human Verification
              <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                <div className="inline-flex h-14 items-center gap-2 rounded-[18px] border border-[#d8dde4] bg-[#f7f9f2] px-4 text-base font-medium text-sherpa-ink">
                  <ShieldCheck aria-hidden className="size-5 text-[#6f9300]" strokeWidth={2} />
                  {formState.captchaLeft} + {formState.captchaRight} =
                </div>
                <input
                  required
                  inputMode="numeric"
                  pattern="[0-9]+"
                  value={formState.captchaAnswer}
                  onChange={(event) => updateField("captchaAnswer", event.target.value)}
                  className="h-14 min-w-0 rounded-[18px] border border-[#d8dde4] bg-white px-4 text-base font-normal text-sherpa-ink outline-none transition-colors placeholder:text-sherpa-ink/35 focus:border-sherpa-ink/70"
                  placeholder="Answer"
                  aria-label="Captcha answer"
                />
              </div>
            </label>

            {formStatus === "error" && (
              <div className="rounded-[18px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-[1.5] text-red-700">
                Please check the form details and try again.
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex h-14 items-center justify-center rounded-sherpa-pill border border-sherpa-ink bg-white px-6 text-base font-medium text-sherpa-ink shadow-sherpa-button-sm transition-transform active:translate-y-[2px] active:shadow-none"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-sherpa-pill border border-sherpa-ink bg-sherpa-lime px-6 text-base font-medium text-sherpa-ink shadow-sherpa-button transition-transform disabled:cursor-not-allowed disabled:opacity-70 active:translate-y-[2px] active:shadow-none"
              >
                {formStatus === "submitting" ? (
                  <Loader2 aria-hidden className="size-4 animate-spin" strokeWidth={2} />
                ) : (
                  <Send aria-hidden className="size-4" strokeWidth={2} />
                )}
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <section
        id="trial"
        data-scroll-reveal
        className="scroll-reveal relative z-10 bg-white/82 px-0 pb-24 pt-14 sm:px-5 sm:pb-28 sm:pt-16 lg:pb-36 lg:pt-20"
      >
        <div className="relative mx-auto flex w-full max-w-[1210px] overflow-hidden bg-sherpa-lime px-8 py-12 sm:rounded-[48px] sm:px-10 sm:py-12 lg:min-h-[532px] lg:items-end lg:rounded-[64px] lg:px-20 lg:py-[72px]">
          <Image
            src="/assets/trial-section-pattern.png"
            alt=""
            fill
            sizes="100vw"
            className="pointer-events-none select-none object-cover opacity-55"
            priority={false}
          />

          <div className="relative z-10 flex w-full flex-col items-start gap-10">
            <div className="flex w-full items-start justify-between gap-4 lg:items-center lg:gap-10">
              <div className="relative h-[148px] w-[198px] max-w-[54%] shrink-0 sm:max-w-none">
                <Image
                  src="/assets/giftbox.png"
                  alt=""
                  fill
                  sizes="198px"
                  className="object-contain object-left"
                />
              </div>

              <div className="flex flex-col items-end gap-2 lg:h-[148px] lg:flex-1 lg:justify-center">
                <img
                  src="/assets/trial-slots-tag.svg"
                  alt="100 Slots Available"
                  className="h-[38px] w-[202px] max-w-[46vw] sm:h-[64px] sm:w-[339px] lg:h-[76px] lg:w-[403px]"
                />
                <p className="hidden w-full max-w-[361px] text-left text-[20px] font-normal leading-[2] text-black sm:block lg:text-[24px]">
                  on a first-come first-serve basis.
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col items-start gap-10">
              <div className="flex w-full flex-col items-start gap-4 text-black">
                <h2 className="max-w-[1080px] text-[32px] font-medium leading-[1.08] sm:text-[42px] lg:text-[48px]">
                  Free 30-Day Trial for Select Travel Businesses
                </h2>
                <div className="max-w-[1080px] text-[20px] font-normal leading-[2] sm:text-[24px] lg:text-[28px]">
                  <p>Founding team-led onboarding, direct support, and early mover advantage.</p>
                  <p className="sm:hidden">100 slots available on a first-come first-serve basis.</p>
                </div>
              </div>

              <TrialButton className="max-w-[240px] text-[16px] sm:text-[18px]" onClick={openSignup}>
                Claim Free Trial
              </TrialButton>
            </div>
          </div>
        </div>
      </section>

      {isMounted ? createPortal(demoModal, document.body) : null}
    </>
  );
}

function TrialButton({
  children,
  className,
  onClick,
}: {
  children: string;
  className?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-14 w-full items-center justify-center rounded-sherpa-pill border border-sherpa-ink bg-white px-7 text-[20px] font-medium leading-none text-sherpa-ink shadow-[3px_5px_0_#202c3d] transition-transform hover:bg-[#fbfbfb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sherpa-ink/30 focus-visible:ring-offset-2 focus-visible:ring-offset-sherpa-lime active:translate-y-[2px] active:shadow-none sm:h-[72px] sm:text-[23px]",
        className,
      )}
    >
      {children}
    </button>
  );
}
