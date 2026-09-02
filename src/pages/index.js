import HomeSection from "@/components/sections/Home";
import DualDivSection from "@/components/sections/DualDivSection";
import WhatweDo from "@/components/sections/WhatweDo";
import GrowWithus from "@/components/sections/GrowWithus";
import {
  INVESTOR_RELATIONS_CONTENT,
  WHO_WE_ARE_CONTENT,
} from "@/data/siteContent";

export default function Home() {
  return (
    <>
      <HomeSection />
      <DualDivSection {...WHO_WE_ARE_CONTENT} />
      <WhatweDo />
      <GrowWithus />
      <DualDivSection {...INVESTOR_RELATIONS_CONTENT} />
    </>
  );
}
