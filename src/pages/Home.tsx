import Hero from "../component/hero/hero";
import About2 from "../component/main/About/About";
import Performance from "../component/main/pre/performance";
import About from "../component/main/TopAbout/about";
import School from "../component/main/universitys-link/School";
import Footer from "../component/footer/Footer";
function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Performance />
      <About2 />
      <School />
      <Footer />
    </div>
  );
}

export default Home;
