import { createClient } from "@/prismicio";
import { asImageSrc, isFilled } from "@prismicio/client";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Home() {
  const client = createClient();
  const page = await client.getSingle("home").catch(() => notFound());

  return (
    <>
      <section className="hero">
        <div className="hero-content-wrap">
          <div className="hero-content-top">
            <h1 className="intro">
              {page.data.intro}
            </h1>
            <p className="description">
              {page.data.description}
            </p>
          </div>
          <div className="hero-content-bottom">
            <p className="hero-text-animation">
              {page.data.hero_text_animation}
            </p>
          </div>
        </div>
      </section>

      <section className="about">
        {page.data.slices[0]?.slice_type === "about" && (
          <div className="about-content-wrap">
            <div className="about-content-top">
              <p className="section-name">
                {page.data.slices[0].primary.section_name}
              </p>
              <p className="number-section">
                {page.data.slices[0].primary.number_section}
              </p>
            </div>
            <div className="about-content-middle">
              <PrismicRichText 
                field={page.data.slices[0].primary.about_desciption} 
                components={{
                  hyperlink: ({ children, node }) => (<PrismicLink field={node.data} className="about-desc-link">{children}</PrismicLink>)
                }} 
              />
            </div>
            <div className="about-content-bottom">
                {isFilled.contentRelationship(page.data.slices[0].primary.experience_list) && (
                <div className="list">
                  <p className="list-label">[ {page.data.slices[0].primary.experience_list.data?.label ?? ""} ]</p>
                  <ul className="list-items">
                    {page.data.slices[0].primary.experience_list.data?.list_experience.map((item, index) => (
                      <li key={index}>
                        <p>{item.position} , {item.company} ({item.time})</p>
                      </li>
                    ))}
                  </ul>
                </div>
                )}

                {isFilled.contentRelationship(page.data.slices[0].primary.services) && (
                  <div className="list">
                    <p className="list-label">[ {page.data.slices[0].primary.services.data?.label ?? ""} ]</p>
                    <ul className="list-items">
                      {page.data.slices[0].primary.services.data?.services.map((item, index) => (
                        <li key={index}>
                          <p>{item.service_name}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
            <div className="about-content-image">
              <Image src={asImageSrc(page.data.slices[0].primary.about_image) ?? ""} alt={page.data.slices[0].primary.about_image.alt ?? ""} width={500} height={500} className="about-image" />
            </div>
          </div>
        )}
      </section>

      <section className="works">
        {page.data.slices[1]?.slice_type === "works" && (
          <div className="works-content-wrap">
            <div className="works-content-top">
              <p className="section-name">
                {page.data.slices[1]?.primary.section_name}
              </p>
              <p className="number-section">
                {page.data.slices[1].primary.section_number}
              </p>
            </div>
            <div className="works-content-middle">
              <p className="works-description">{page.data.slices[1].primary.section_description}</p>
            </div>
            <div className="works-content-bottom">
              {page.data.slices[1].primary.selected_works.map((work, index) => {
                if (!isFilled.contentRelationship(work.work_item)) return null;
                const assets = work.work_item.data?.assets;
                if (!assets || assets.length === 0) return null;
                return (
                  <div key={index} className="work-item">
                    <div className="work-item-images">
                      {assets.map((asset, assetIndex) => {
                        if (!isFilled.image(asset.asset_item)) return null;
                        return (
                          <Image 
                            key={assetIndex} 
                            src={asImageSrc(asset.asset_item) ?? ""} 
                            alt={asset.asset_item.alt ?? ""} 
                            width={700} 
                            height={700} 
                            className="work-item-image" 
                          />
                        );
                      })}
                    </div>
                    <div className="work-item-info">
                      <div className="work-item-info-start">
                        <p className="work-item-name">{work.work_item.data?.project_name}</p>
                        <p className="work-item-description">{work.work_item.data?.project_description}</p>
                      </div>
                      <div>
                        <p className="work-item-categories">{work.work_item.data?.categories.map((category) => category.category).join(", ")}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>  
          </div>
        )}
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
