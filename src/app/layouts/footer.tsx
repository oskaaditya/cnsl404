import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import { notFound } from "next/navigation";

export default async function Footer() {

  const client = createClient();
  const footer = await client.getSingle("footer").catch(() => notFound());

  return (
    <footer className='footer'>
      <div className="footer-content-wrap">
        <div className="footer-content-start">
            <p className="footer-message-available">{footer.data.available_freelance_project ? "Open to freelance projects and creative collaborations." : "Currently unavailable for freelance projects and collaborations."}</p>
            <div className="footer-connect-links">
                {footer.data.connect_link.map((item , index) => (
                    <PrismicNextLink key={index} field={item.connect_link_item} className='footer-connect-link'>{item.connect_link_item.text}</PrismicNextLink>
                ))}
            </div>
        </div>
        <div className="footer-content-end">
          <p className="footer-logo">{footer.data.footer_logo_text}</p>
        </div>
      </div>
    </footer>
  )
}