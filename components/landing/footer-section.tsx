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
        <div className="flex w-full flex-col items-center justify-center gap-10 sm:gap-12">
          <h2 className="text-center text-[34px] font-medium leading-[1.08] sm:text-[42px] lg:text-[48px]">
            Here to help you grow - before and after you sign up!
          </h2>
          <p className="max-w-[880px] text-center text-[18px] font-normal leading-[1.45] text-white/72 sm:text-[20px]">
            Reach out for live demo, queries, onboarding support, feedback, or custom business requirements
          </p>

          <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row md:flex-wrap lg:gap-10">
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

        <div className="flex w-full flex-col items-center justify-center gap-6">
          <p className="text-center text-[20px] font-normal leading-[1.25] sm:text-[24px] sm:leading-[1.08]">
            The Outist is proudly affiliated with and recognised by
          </p>
          <div className="relative h-[104px] w-[124px] overflow-hidden rounded-[16px]">
            <Image
              src="/assets/footer-affiliation.png"
              alt="Adventure Tour Operators Association of India Allied"
              fill
              sizes="124px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-10">
          <img
            src="/assets/footer-outist-wordmark.svg"
            alt="The Outist"
            className="h-auto w-full max-w-[913px]"
          />
          <p className="text-center text-[14px] font-normal leading-[1.45]">
            © 2026, Outist Experiences Pvt. Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
