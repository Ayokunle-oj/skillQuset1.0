import Hero from "../component/hero/hero";
import About2 from "../component/main/About/About";
import Performance from "../component/main/pre/performance";
import About from "../component/main/TopAbout/about";
function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Performance />
      <About2 />
    </div>
  );
}

export default Home;
