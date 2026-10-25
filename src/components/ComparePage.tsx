"use client";

import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CompareTool from "@/components/CompareTool";

export default function ComparePage() {
  return (
    <>
      <PageHero
        eyebrow="SMART SHOPPING"
        title="COMPARE ANY TWO RIDES."
        subtitle="Pick a TVS model and compare it with any other brand — or line up two TVS favourites side by side. Engine, power, mileage, weight and more, all in one place."
      />

      <section className="page-section section-light">
        <Reveal>
          <CompareTool />
        </Reveal>
      </section>
    </>
  );
}
