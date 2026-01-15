import "../styles/main.scss";
import Footer from "./layouts/footer";
import Navbar from "./layouts/navbar";
import LenisProviders from "./providers/lenis-providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LenisProviders>
          <main>
            <Navbar />
            {children}
            <Footer />
          </main>
        </LenisProviders>
      </body>
    </html>
  );
}
