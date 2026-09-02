import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/router";
import { Arimo } from "next/font/google";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/sections/SmoothScrollProvider";
const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-arimo",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const noTopOffsetRoutes = new Set([
    "/",
    "/who-we-are",
    "/industries-locations",
    "/people-careers",
    "/leadership-institute",
    "/contact-us",
  ]);
  const needsTopOffset = !noTopOffsetRoutes.has(router.pathname);

  return (
    <div className={arimo.variable}>
      <SmoothScrollProvider>
        <Navbar />

        <main id="main-content" className={needsTopOffset ? "pt-[126px]" : ""}>
          <Component {...pageProps} />
        </main>

        <Footer />
      </SmoothScrollProvider>
    </div>
  );
}
