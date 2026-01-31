import { createClient } from '@/prismicio';
import { asImageSrc } from '@prismicio/client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HomeContent from './components/pages/HomeContent';

export default async function Home() {
  const client = createClient();
  const page = await client.getSingle('home').catch(() => notFound());

  return <HomeContent page={page} />;
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
