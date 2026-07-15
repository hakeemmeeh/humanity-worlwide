"use client";

import { Reveal } from "@/components/Reveal";

interface VisionItem {
  number: string;
  title: string;
  description: string;
}

const visionItems: VisionItem[] = [
  {
    number: "01",
    title: "Diversity & Inclusion",
    description: "Ensuring equal voice and protection services across all of our field programs without bias.",
  },
  {
    number: "02",
    title: "Future of Giving",
    description: "Driving total transparency in crowdfunding through direct digital donor tracking.",
  },
  {
    number: "03",
    title: "Donor Partnership",
    description: "Creating collaborative feedback reports and shared milestones with our international donors.",
  },
  {
    number: "04",
    title: "Social Challenges",
    description: "Addressing structural vulnerabilities in health, education, and water access across communities.",
  },
  {
    number: "05",
    title: "Lifesaving Action",
    description: "Providing immediate emergency shelter, nutrition, and relief to displaced families in active crises.",
  },
];

export function VisionSection() {
  return (
    <section className="section-padding bg-[#F6F9FC] border-y border-sand-deep/40">
      <div className="container-content">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal direction="zoom">
            <span className="font-handwriting text-3xl text-coral block -mb-1 rotate-[-2deg] select-none">
              How we work
            </span>
            <p className="eyebrow justify-center">Our Vision</p>
            <h2 className="font-display text-3xl font-semibold md:text-4xl text-navy">
              Smart and effective solution for communities
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {visionItems.map((item, index) => (
            <Reveal
              key={item.number}
              delay={index * 0.1}
              direction="up"
              className="flex"
            >
              <div className="group relative flex flex-col justify-between rounded-2xl bg-white p-7 border border-sand-deep/40 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-navy/5 hover:border-teal/20 w-full overflow-hidden">
                {/* Micro accent block */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-teal/60 scale-x-0 origin-center transition-transform duration-500 ease-out group-hover:scale-x-100" />
                
                <div>
                  <span className="font-handwriting text-4xl font-bold text-coral block mb-4 rotate-[-4deg] transition-transform duration-500 group-hover:scale-110 select-none">
                    {item.number}.
                  </span>
                  <h3 className="font-display text-lg font-semibold text-navy leading-snug mb-3">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-ink/75 mt-auto">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
