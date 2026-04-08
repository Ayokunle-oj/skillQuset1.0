import About1 from "./about1";
import About2 from "./about2";
import gg4 from "../../../assets/gg4.jpg";
import aboutUs from "../../../assets/aboutUs.jpg";

import "./index.css";
function About() {
  return (
    <>
      <div className="about">
        <About1
          src={aboutUs}
          title="Level up your skills with SkillQuest"
          text=" Join millions of people by exploring courses,study guide, tackling
          practice problems built for you."
          btn="Get started"
        />
        <About2
          src={gg4}
          title="SkillQuest boosts scores!"
          text="Learning has never been easier.with our advanced AI, SkillQuest adapts to your study patterns and habits helping you learn faster, smarter, and more effectively every day. "
        />
      </div>
      <div className="about2">
        <About1
          src={aboutUs}
          title="Level up your skills with SkillQuest"
          text=" Join millions of people by exploring courses,study guide, tackling
          practice problems built for you."
          btn="Get started"
        />
        <About1
          src={gg4}
          title="SkillQuest boosts scores!"
          text="Learning has never been easier.with our advanced AI,SkillQuest adapts to your study patterns and habits helping you learn faster,smarter,and more effectively every day. "
          btn="Learn more"
        />
      </div>
    </>
  );
}

export default About;
