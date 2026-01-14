import { createClient } from "@/prismicio";
import { asImageSrc } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export default async function Home() {
  const client = createClient();
  const page = await client.getSingle("home").catch(() => notFound());
  
  return (
    <>
      <section className="home">
        <div className="home-content-wrap">
          <div className="home-content-top">
            <h1 className="intro">
              {page.data.intro}
            </h1>
            <p className="description">
              {page.data.description}
            </p>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="about-content-wrap">
          <div className="about-content-top">
            <p className="section-name">
              {page.data.slices[0]?.primary.section_name}
            </p>
            <p className="number-section">
              {page.data.slices[0]?.primary.number_section}
            </p>
          </div>
          <div className="about-content-bottom">
            <PrismicRichText field={page.data.slices[0]?.primary.about_desciption} />
          </div>
        </div>
      </section>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
