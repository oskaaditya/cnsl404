'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useFontsLoaded } from '@/app/contexts/fonts-loaded-context';

let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger | null = null;
let SplitText: typeof import('gsap/SplitText').SplitText | null = null;
if (typeof window !== 'undefined') {
  try {
    const scrollTriggerModule = require('gsap/ScrollTrigger');
    ScrollTrigger = scrollTriggerModule.ScrollTrigger;
    if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  } catch {
    // ScrollTrigger not available
  }
  try {
    const splitTextModule = require('gsap/SplitText');
    SplitText = splitTextModule.SplitText;
    if (SplitText) gsap.registerPlugin(SplitText);
  } catch {
    // SplitText not available (premium plugin)
  }
}

export default function FooterAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { fontsLoaded } = useFontsLoaded();

  useGSAP(
    () => {
      if (!fontsLoaded) return;
      const footer = wrapperRef.current?.querySelector('footer');
      if (!footer) return;

      const message = footer.querySelector('[data-animation="footer-message"]');
      const connectLinks = footer.querySelectorAll(
        '[data-animation="footer-connect-link"]'
      );
      const logo = footer.querySelector('[data-animation="footer-logo"]');

      // SplitText with mask lines for message and connect links
      if (message && SplitText) {
        SplitText.create(message, {
          type: 'lines',
          linesClass: 'footer-message-line',
          mask: 'lines',
        });
      }
      if (connectLinks.length > 0 && SplitText) {
        connectLinks.forEach((link) => {
          SplitText.create(link, {
            type: 'lines',
            linesClass: 'footer-connect-link-line',
            mask: 'lines',
          });
        });
      }
      // SplitText chars for footer logo (used by logoTL)
      if (logo && SplitText) {
        SplitText.create(logo, {
          type: 'chars',
          charsClass: 'footer-logo-char',
        });
      }
      const footerTL = gsap.timeline({
        scrollTrigger:
          ScrollTrigger && footer
            ? {
                trigger: footer,
                start: 'top 100%',
                toggleActions: 'play none reverse none',
              }
            : undefined,
      });

      footerTL.from('.footer-message-line', {
        y: 60,
        duration: 0.6,
        stagger: 0.1,
        ease: 'expo.out',
      });
      footerTL.from(
        '.footer-connect-link-line',
        {
          y: 40,
          duration: 0.5,
          stagger: 0.08,
          ease: 'expo.out',
        },
        '-=0.3'
      );

      // Separate timeline for footer logo chars with ScrollTrigger debug markers
      const logoTL = gsap.timeline({
        scrollTrigger:
          ScrollTrigger && footer
            ? {
                trigger: footer,
                start: 'top 65%',
                toggleActions: 'play none none reverse',
              }
            : undefined,
      });
      logoTL.from('.footer-logo-char', {
        yPercent: 100,
        duration: 1.2,
        stagger: 0.08,
        ease: 'expo.out',
      });
    },
    { scope: wrapperRef, dependencies: [fontsLoaded] }
  );

  return <div ref={wrapperRef}>{children}</div>;
}
