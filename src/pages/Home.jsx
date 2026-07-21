import Hero from "../components/common/Hero";
import QuickAccess from "../components/common/QuickAccess";
import CategorySection from "../components/common/CategorySection";
import MostUsedSection from "../components/common/MostUsedSection";

function Home() {
  return (
    <>
      <Hero />
      <QuickAccess />
      <CategorySection />
      <MostUsedSection />
    </>
  );
}

export default Home;