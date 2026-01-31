import { createClient } from '@/prismicio';
import { PrismicNextLink } from '@prismicio/next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Navbar() {

const client = createClient();
const navigation = await client.getSingle("navigation").catch(() => notFound());  
  return (
    <nav className='navbar'>
      <Link id='secondaryLink' href='/' className='logo-text'>{navigation.data.logo_text}</Link>
      <div className='navigations'>
        {navigation.data.navigations.map((item , index) => (
            <PrismicNextLink key={index} field={item.navigation_link} className='navigation-link'>{item.navigation_link.text}</PrismicNextLink>
        ))}
      </div>
    </nav>
  )
}
