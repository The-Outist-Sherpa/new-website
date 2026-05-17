import Image from "next/image";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const contactActions = [
  {
    href: "https://wa.me/919969052446",
    icon: MessageCircle,
    label: "WhatsApp",
    widthClass: "sm:w-[240px]",
  },
  {
    href: "tel:+919969052446",
    icon: Phone,
    label: "+ 91 99690 52446",
    widthClass: "sm:w-[240px]",
  },
  {
    href: "mailto:hello@theoutist.com",
    icon: Mail,
    label: "hello@theoutist.com",
    widthClass: "sm:w-[324px]",
  },
];

export function FooterSection() {
  return (
    <footer
      id="contact"
      data-scroll-reveal
      className="scroll-reveal relative z-10 bg-[#0f1824] px-5 py-16 text-white sm:py-20 lg:px-20"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-16 lg:gap-20">
        <div className="flex w-full flex-col items-center justify-center gap-8 sm:gap-10">
          <h2 className="text-center text-[34px] font-medium leading-[1.08] sm:text-[42px] lg:text-[48px]">
            Contact us
          </h2>
          <p className="max-w-[880px] text-center text-[16px] font-normal leading-[1.45] text-white sm:text-[20px] sm:leading-[1.08]">
            Reach out for live demo, queries, onboarding support, feedback, or custom business requirements
          </p>

          <div className="mt-2 flex w-full flex-col items-center justify-center gap-5 md:flex-row md:flex-wrap lg:mt-4 lg:gap-10">
            {contactActions.map((action) => {
              const Icon = action.icon;

              return (
                <a
                  key={action.label}
                  href={action.href}
                  className={cn(
                    "inline-flex h-16 w-full max-w-[324px] items-center justify-center gap-2 rounded-sherpa-pill border border-white px-6 text-[16px] font-medium leading-[1.25] text-white shadow-[1px_4px_0_0_#ffffff] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:translate-y-[2px] active:shadow-none sm:h-20 sm:text-[18px]",
                    action.widthClass,
                  )}
                  target={action.href.startsWith("http") ? "_blank" : undefined}
                  rel={action.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <Icon
                    aria-hidden="true"
                    className={cn("size-6", action.label === "WhatsApp" && "text-[#25d366]")}
                    strokeWidth={2}
                  />
                  <span className="truncate">{action.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex w-full max-w-[1011px] flex-col gap-10 border-t border-white/20 pt-12 sm:pt-[60px] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row lg:justify-start">
            <img
              src="/assets/footer-outist-logo-white.svg"
              alt="The Outist"
              className="h-[46px] w-[150px] object-contain sm:h-[52px] sm:w-[171px]"
            />
            <span aria-hidden="true" className="hidden h-[41px] w-px bg-white/28 sm:block" />
            <div className="relative h-[64px] w-[76px] overflow-hidden rounded-[10px]">
              <Image
                src="/assets/footer-affiliation.png"
                alt="Adventure Tour Operators Association of India Allied"
                fill
                sizes="76px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 text-[14px] font-normal leading-[1.45] text-white sm:flex-row sm:gap-8">
            <a
              href="https://outist.app/terms"
              className="transition-colors hover:text-white/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
              target="_blank"
              rel="noreferrer"
            >
              Terms and Conditions
            </a>
            <span aria-hidden="true" className="hidden h-4 w-px bg-white/25 sm:block" />
            <p className="text-center text-white/60">
              © 2026, Outist Experiences Pvt. Ltd.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
