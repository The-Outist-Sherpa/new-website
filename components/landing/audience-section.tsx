const audiences = ["Tour Operators", "Travel Agents", "DMCs", "Tour Guides", "Influencers"];

export function AudienceSection() {
  return (
    <section
      id="audience"
      data-scroll-reveal
      className="scroll-reveal relative z-10 bg-white/82 px-5 pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-12"
    >
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center gap-10 text-center sm:gap-[47px]">
        <h2 className="text-[34px] font-medium leading-[1.08] text-black sm:text-[42px] lg:text-[48px]">
          Who is The Outist for?
        </h2>

        <div className="flex max-w-[980px] flex-wrap items-center justify-center gap-4 sm:gap-[31px]">
          {audiences.map((audience, index) => (
            <div
              key={audience}
              style={{ transitionDelay: `${index * 110}ms` }}
              className="scroll-reveal-child rounded-[16px] border-2 border-[#cbf25f] bg-[#cbf25f]/20 px-6 py-4 text-[20px] font-medium leading-[1.08] text-black sm:text-[24px]"
            >
              {audience}
            </div>
          ))}
        </div>

        <p
          style={{ transitionDelay: "520ms" }}
          className="scroll-reveal-child max-w-[920px] text-[18px] font-normal leading-[1.35] text-black sm:text-[20px] sm:leading-[1.08]"
        >
          Outist gives you <strong className="font-semibold">an unfair advantage</strong>
        </p>
      </div>
    </section>
  );
}
