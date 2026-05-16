"use client";

import Image from "next/image";
import { Loader2, Send, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const SIGNUP_URL = "about:blank";

type DemoFormState = {
  companyName: string;
  countryCode: string;
  fullName: string;
  mobileNumber: string;
};

const initialFormState: DemoFormState = {
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const openDemoModal = () => {
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
    setFormState((current) => ({ ...current, [field]: value }));
    setFormStatus("idle");
  };

  const resetForm = () => {
    setFormState(initialFormState);
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
                className="h-14 rounded-[18px] border border-[#d8dde4] bg-white px-4 text-base font-normal text-sherpa-ink outline-none transition-colors placeholder:text-sherpa-ink/35 focus:border-sherpa-ink/70"
                placeholder="Enter company name"
              />
            </label>

            {formStatus === "error" && (
              <div className="rounded-[18px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-[1.5] text-red-700">
                We could not submit the request right now. Please try again.
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
        className="scroll-reveal relative z-10 bg-white/82 px-5 pb-24 pt-14 sm:pb-28 sm:pt-16 lg:pb-36 lg:pt-20"
      >
        <div className="relative mx-auto flex w-full max-w-[1280px] overflow-hidden rounded-[34px] bg-sherpa-lime px-6 py-9 sm:rounded-[48px] sm:px-10 sm:py-10 lg:min-h-[360px] lg:rounded-[56px] lg:px-16 lg:py-14">
          <Image
            src="/assets/trial-section-pattern.png"
            alt=""
            fill
            sizes="100vw"
            className="pointer-events-none select-none object-cover opacity-55"
            priority={false}
          />

          <div className="relative z-10 flex w-full flex-col gap-9 lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center lg:gap-10">
            <div className="flex min-h-[230px] flex-col items-start justify-between gap-10 sm:min-h-[260px]">
              <div className="relative h-[116px] w-[156px] shrink-0 sm:h-[148px] sm:w-[198px]">
                <Image
                  src="/assets/giftbox.png"
                  alt=""
                  fill
                  sizes="198px"
                  className="object-contain object-left"
                />
              </div>

              <div className="flex max-w-[660px] flex-col gap-3">
                <h2 className="text-[34px] font-medium leading-[1.08] text-black sm:text-[44px] lg:text-[50px]">
                  Exclusive 30 Days free trial
                </h2>
                <p className="text-[20px] font-normal leading-[1.3] text-black sm:text-[25px] lg:text-[27px]">
                  100 slots available on a first-come first-serve basis.
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 sm:max-w-[260px] lg:justify-self-end lg:gap-8">
              <TrialButton onClick={openSignup}>Try Now</TrialButton>
              <TrialButton onClick={() => setIsModalOpen(true)}>Book Demo</TrialButton>
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
