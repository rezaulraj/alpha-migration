import HomeSection from "@/components/sections/Home";
import DualDivSection from "@/components/sections/DualDivSection";
import WhatweDo from "@/components/sections/WhatweDo";
import GrowWithus from "@/components/sections/GrowWithus";
import {
  INVESTOR_RELATIONS_CONTENT,
  WHO_WE_ARE_CONTENT,
} from "@/data/siteContent";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Alpha Migrations | International Workforce Recruitment for Europe &
          CIS Employers
        </title>
        <meta
          name="description"
          content="Start a conversation with Alpha Migrations about hiring support, people programs, and partnership opportunities."
        />
      </Head>
      <HomeSection />
      <DualDivSection {...WHO_WE_ARE_CONTENT} />
      <WhatweDo />
      <GrowWithus />
      <DualDivSection {...INVESTOR_RELATIONS_CONTENT} />
    </>
  );
}
