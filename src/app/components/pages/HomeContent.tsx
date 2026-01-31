'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { asImageSrc, isFilled } from '@prismicio/client';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import Image from 'next/image';
import type { HomeDocument } from '../../../../prismicio-types';
import { useGSAP } from '@gsap/react';
import { useFontsLoaded } from '@/app/contexts/fonts-loaded-context';

// Try to import ScrollTrigger (premium plugin - optional)
let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger | null = null;
if (typeof window !== 'undefined') {
  try {
    const scrollTriggerModule = require('gsap/ScrollTrigger');
    ScrollTrigger = scrollTriggerModule.ScrollTrigger;
    if (ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }
  } catch (e) {
    // ScrollTrigger not available (premium plugin)
    console.log('ScrollTrigger not available - using basic GSAP animations');
  }
}

// Try to import SplitText (premium plugin - optional)
let SplitText: typeof import('gsap/SplitText').SplitText | null = null;
if (typeof window !== 'undefined') {
  try {
    const splitTextModule = require('gsap/SplitText');
    SplitText = splitTextModule.SplitText;
    if (SplitText) {
      gsap.registerPlugin(SplitText);
    }
  } catch (e) {
    // SplitText not available (premium plugin)
    console.log('SplitText not available - text splitting animations disabled');
  }
}

interface AnimatedHomeProps {
  page: HomeDocument;
}

export default function HomeContent({ page }: AnimatedHomeProps) {
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const worksRef = useRef<HTMLElement>(null);
  const { fontsLoaded } = useFontsLoaded();

  useGSAP(() => {
    if (!fontsLoaded) return;
    // Hero Attributes - query inside useGSAP (client-side only)
    const heroIntro = document.querySelector('[data-animation="hero-intro"]');
    const heroDescription = document.querySelector('[data-animation="hero-description"]');
    const heroTextAnimation = document.querySelector('[data-animation="hero-text-animation"]');

    // About Attributes
    const aboutSectionName = document.querySelector('[data-animation="about-section-name"]');
    const aboutNumberSection = document.querySelector('[data-animation="about-number-section"]');
    const aboutDescription = document.querySelector('[data-animation="about-description"]');
    const aboutDescriptionLink = document.querySelector('[data-animation="about-description-link"]');

    // Hero Timeline
    if (heroIntro && SplitText) {
      SplitText.create(heroIntro, {
        type: 'lines',
        linesClass: 'hero-intro-line',
        mask: 'lines',
      });
    }
    if (heroDescription && SplitText) {
      SplitText.create(heroDescription, {
        type: 'lines',
        linesClass: 'hero-description-line',
        mask: 'lines',
      });
    }
    if (heroTextAnimation && SplitText) {
      SplitText.create(heroTextAnimation, {
        type: 'lines',
        linesClass: 'hero-text-animation-line',
        mask: 'lines',
      });
    }

    const heroTL = gsap.timeline({
      scrollTrigger: ScrollTrigger && heroRef.current
        ? {
            trigger: heroRef.current,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none none',
          }
        : undefined,
    });
    heroTL.from('.hero-intro-line', {
      y: 100,
      duration: 0.6,
      stagger: 0.2,
      ease: 'expo.out',
    });
    heroTL.from('.hero-description-line', {
      y: 100,
      duration: 0.6,
      stagger: 0.2,
      ease: 'expo.out',
    });
    heroTL.from('.hero-text-animation-line', {
      y: 500,
      duration: 0.6,
      stagger: 0.2,
      ease: 'expo.out',
    });

    // About Timeline - SplitText setup
    if (aboutSectionName && SplitText) {
      SplitText.create(aboutSectionName, {
        type: 'lines',
        linesClass: 'about-section-name-line',
        mask: 'lines',
      });
    }
    if (aboutNumberSection && SplitText) {
      SplitText.create(aboutNumberSection, {
        type: 'lines',
        linesClass: 'about-number-section-line',
        mask: 'lines',
      });
    }
    if (aboutDescription && SplitText) {
      SplitText.create(aboutDescription, {
        type: 'lines',
        linesClass: 'about-description-line',
        mask: 'lines',
      });
    }
    if (aboutDescriptionLink && SplitText) {
      SplitText.create(aboutDescriptionLink, {
        type: 'lines',
        linesClass: 'about-description-link-line',
        mask: 'lines',
      });
    }
    // Handle experience list separately
    const experienceListLabel = document.querySelector('[data-animation="experience-list-label"]');
    const experienceListItems = document.querySelectorAll('[data-animation="experience-list-item"]');
    
    if (experienceListLabel && SplitText) {
      SplitText.create(experienceListLabel, {
        type: 'lines',
        linesClass: 'experience-list-label-line',
        mask: 'lines',
      });
    }
    if (experienceListItems.length > 0 && SplitText) {
      experienceListItems.forEach((item) => {
        SplitText.create(item, {
          type: 'lines',
          linesClass: 'experience-list-item-line',
          mask: 'lines',
        });
      });
    }

    // Handle services list separately
    const servicesListLabel = document.querySelector('[data-animation="services-list-label"]');
    const servicesListItems = document.querySelectorAll('[data-animation="services-list-item"]');
    
    if (servicesListLabel && SplitText) {
      SplitText.create(servicesListLabel, {
        type: 'lines',
        linesClass: 'services-list-label-line',
        mask: 'lines',
      });
    }
    if (servicesListItems.length > 0 && SplitText) {
      servicesListItems.forEach((item) => {
        SplitText.create(item, {
          type: 'lines',
          linesClass: 'services-list-item-line',
          mask: 'lines',
        });
      });
    }

    const aboutTL = gsap.timeline({
      scrollTrigger: ScrollTrigger && aboutRef.current
        ? {
            trigger: aboutRef.current,
            start: 'top 30%',
            toggleActions: 'play none none none',
          }
        : undefined,
    });
    aboutTL.from(['.about-section-name-line', '.about-number-section-line'], {
      y: 100,
      duration: 0.4,
      ease: 'expo.out',
    });
    aboutTL.from('.about-description-line', {
      y: 100,
      duration: 0.4,
      stagger: 0.2,
      ease: 'expo.out',
    },'<0.2');
    aboutTL.from('.about-description-link-line', {
      y: 100,
      duration: 0.4,
      stagger: 0.2,
      ease: 'expo.out',
    },'<0.2');
    // Experience list animation (first)
    aboutTL.from('.experience-list-label-line', {
      y: 100,
      duration: 0.3,
      stagger: 0.2,
      ease: 'expo.out',
    });
    aboutTL.from('.experience-list-item-line', {
      y: 100,
      duration: 0.4,
      stagger: 0.2,
      ease: 'expo.out',
    });
    
    // Services list animation (after experience)
    aboutTL.from('.services-list-label-line', {
      y: 100,
      duration: 0.3,
      stagger: 0.2,
      ease: 'expo.out',
    });
    aboutTL.from('.services-list-item-line', {
      y: 100,
      duration: 0.4,
      stagger: 0.2,
      ease: 'expo.out',
    });
    aboutTL.from('.about-image', {
      clipPath: 'inset(100% 0% 0% 0%)',
      duration: 1,
      ease: 'expo.out',
    });

    // Works Timeline
    const worksSectionName = document.querySelector('[data-animation="works-section-name"]');
    const worksNumberSection = document.querySelector('[data-animation="works-number-section"]');
    const worksDescription = document.querySelector('[data-animation="works-description"]');
    const worksItems = document.querySelectorAll('[data-animation="works-item"]');
    const worksImages = document.querySelectorAll('[data-animation="works-image"]');
    const worksItemNames = document.querySelectorAll('[data-animation="works-item-name"]');
    const worksItemDescriptions = document.querySelectorAll('[data-animation="works-item-description"]');
    const worksItemCategories = document.querySelectorAll('[data-animation="works-item-categories"]');

    if (worksSectionName && SplitText) {
      SplitText.create(worksSectionName, {
        type: 'lines',
        linesClass: 'works-section-name-line',
        mask: 'lines',
      });
    }
    if (worksNumberSection && SplitText) {
      SplitText.create(worksNumberSection, {
        type: 'lines',
        linesClass: 'works-number-section-line',
        mask: 'lines',
      });
    }
    if (worksDescription && SplitText) {
      SplitText.create(worksDescription, {
        type: 'lines',
        linesClass: 'works-description-line',
        mask: 'lines',
      });
    }
    if (worksItems.length > 0 && SplitText) {
      worksItems.forEach((item) => {
        SplitText.create(item, {
          type: 'lines',
          linesClass: 'works-item-line',
          mask: 'lines',
        });
      });
    }
    if (worksItemNames.length > 0 && SplitText) {
      worksItemNames.forEach((item) => {
        SplitText.create(item, {
          type: 'lines',
          linesClass: 'works-item-name-line',
          mask: 'lines',
        });
      });
    }
    if (worksItemDescriptions.length > 0 && SplitText) {
      worksItemDescriptions.forEach((item) => {
        SplitText.create(item, {
          type: 'lines',
          linesClass: 'works-item-description-line',
          mask: 'lines',
        });
      });
    }
    if (worksItemCategories.length > 0 && SplitText) {
      worksItemCategories.forEach((item) => {
        SplitText.create(item, {
          type: 'lines',
          linesClass: 'works-item-categories-line',
          mask: 'lines',
        });
      });
    }

    const worksTL = gsap.timeline({
      scrollTrigger: ScrollTrigger && worksRef.current
        ? {
            trigger: worksRef.current,
            start: 'top 30%',
            toggleActions: 'play none none none',
          }
        : undefined,
    });
    worksTL.from('.works-section-name-line', {
      y: 100,
      duration: 0.3,
      ease: 'expo.out',
    });
    worksTL.from('.works-number-section-line', {
      y: 100,
      duration: 0.3,
      ease: 'expo.out',
    });
    worksTL.from('.works-description-line', {
      y: 100,
      duration: 0.2,
      stagger: 0.2,
      ease: 'expo.out',
    });
    // Per work-item: text (SplitText lines) and images animate with same timing
    const workItemEls = document.querySelectorAll('.work-item');
    workItemEls.forEach((item, i) => {
      const hr = item.querySelector<HTMLElement>('.work-item-hr');
      const textLines = item.querySelectorAll(
        '.works-item-name-line, .works-item-description-line, .works-item-categories-line'
      );
      const images = item.querySelectorAll('.work-item-image');
     
      const position = '>';
      // HR: animate width 0 → 100% (only if hr exists, i.e. not first item)
      if (hr) {
        worksTL.from(
          hr,
          {
            width: '0%',
            duration: 0.5,
            ease: 'expo.out',
          },
          position
        );
      }
      // Text: all lines in this item (masking line animation)
      worksTL.from(
        textLines,
        {
          y: 100,
          duration: 0.6,
          stagger: 0.08,
          ease: 'expo.out',
        },
        position
      );
      // Images: clip-path reveal, start at the same time as text in this item
      worksTL.from(
        images,
        {
          clipPath: 'inset(100% 0% 0% 0%)',
          duration: 0.7,
          ease: 'expo.out',
          stagger: 0.06,
        },
        position
      );
    });
  }, { dependencies: [fontsLoaded] });

  return (
    <>
      <section ref={heroRef} className="hero">
        <div className="hero-content-wrap">
          <div className="hero-content-top">
            <h1 data-animation="hero-intro" className="intro">
              {page.data.intro}
            </h1>
            <p data-animation="hero-description" className="description">
              {page.data.description}
            </p>
          </div>
          <div className="hero-content-bottom">
            <p data-animation="hero-text-animation" className="hero-text-animation">
              {page.data.hero_text_animation}
            </p>
          </div>
        </div>
      </section>

      <section ref={aboutRef} className="about">
        {page.data.slices[0]?.slice_type === 'about' && (
          <div className="about-content-wrap">
            <div className="about-content-top">
              <p data-animation="about-section-name" className="section-name">
                {page.data.slices[0].primary.section_name}
              </p>
              <p data-animation="about-number-section" className="number-section">
                {page.data.slices[0].primary.number_section}
              </p>
            </div>
            <div data-animation="about-content-middle" className="about-content-middle">
              <PrismicRichText
                field={page.data.slices[0].primary.about_desciption}
                components={{
                  paragraph: ({ children }) => (
                    <p data-animation="about-description" className="about-description">
                      {children}
                    </p>
                  ),
                  hyperlink: ({ children, node }) => (
                    <PrismicLink id='secondaryLink' data-animation="about-description-link" field={node.data} className="about-desc-link">
                      {children}
                    </PrismicLink>
                  ),
                }}
              />
            </div>
            <div className="about-content-bottom">
              {isFilled.contentRelationship(page.data.slices[0].primary.experience_list) && (
                <div className="list">
                  <p data-animation="experience-list-label" className="list-label">
                    [ {page.data.slices[0].primary.experience_list.data?.label ?? ''} ]
                  </p>
                  <ul className="list-items">
                    {page.data.slices[0].primary.experience_list.data?.list_experience.map(
                      (item, index) => (
                        <li key={index}>
                          <p data-animation="experience-list-item" className="list-item">
                            {item.position} , {item.company} ({item.time})
                          </p>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {isFilled.contentRelationship(page.data.slices[0].primary.services) && (
                <div className="list">
                  <p data-animation="services-list-label" className="list-label">
                    [ {page.data.slices[0].primary.services.data?.label ?? ''} ]
                  </p>
                  <ul className="list-items">
                    {page.data.slices[0].primary.services.data?.services.map((item, index) => (
                      <li key={index}>
                        <p data-animation="services-list-item" className="list-item">{item.service_name}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="about-content-image">
              <Image
                src={asImageSrc(page.data.slices[0].primary.about_image) ?? ''}
                alt={page.data.slices[0].primary.about_image.alt ?? ''}
                width={500}
                height={500}
                data-animation="about-image"
                className="about-image"
              />
            </div>
          </div>
        )}
      </section>

      <section ref={worksRef} className="works">
        {page.data.slices[1]?.slice_type === 'works' && (
          <div className="works-content-wrap">
            <div className="works-content-top">
              <p data-animation="works-section-name" className="section-name">
                {page.data.slices[1]?.primary.section_name}
              </p>
              <p data-animation="works-number-section" className="number-section">
                {page.data.slices[1].primary.section_number}
              </p>
            </div>
            <div className="works-content-middle">
              <p data-animation="works-description" className="works-description">
                {page.data.slices[1].primary.section_description}
              </p>
            </div>
            <div className="works-content-bottom">
              {page.data.slices[1].primary.selected_works.map((work, index) => {
                if (!isFilled.contentRelationship(work.work_item)) return null;
                const assets = work.work_item.data?.assets;
                if (!assets || assets.length === 0) return null;
                return (
                  <div key={index} className="work-item">
                    {index > 0 && <hr className="work-item-hr" aria-hidden="true" />}
                    <div className="work-item-images">
                      {assets.map((asset, assetIndex) => {
                        if (!isFilled.image(asset.asset_item)) return null;
                        return (
                          <Image
                            data-animation="works-image"
                            key={assetIndex}
                            src={asImageSrc(asset.asset_item) ?? ''}
                            alt={asset.asset_item.alt ?? ''}
                            width={700}
                            height={700}
                            className="work-item-image"
                          />
                        );
                      })}
                    </div>
                    <div className="work-item-info">
                      <div className="work-item-info-start">
                        <p data-animation="works-item-name" className="work-item-name">
                          {work.work_item.data?.project_name}
                        </p>
                        <p data-animation="works-item-description" className="work-item-description">
                          {work.work_item.data?.project_description}
                        </p>
                      </div>
                      <div>
                        <p data-animation="works-item-categories" className="work-item-categories">
                          {work.work_item.data?.categories
                            .map((category) => category.category)
                            .join(', ')}
                        </p>
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
