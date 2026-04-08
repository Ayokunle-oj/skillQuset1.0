import "./index.css";
import Performance2 from "./performance2";
import trusted_content_icon from "../../../assets/trusted_content_icon.png";
import empower_teachers_icon from "../../../assets/empower_teachers_icon.png";
import personalized_learning_icon from "../../../assets/personalized_learning_icon.png";
function Performance() {
  return (
    <div className="performance__container">
      <h2>Why SkillQuest works</h2>
      <div className="performance__wrapper">
        <Performance2
          svg={personalized_learning_icon}
          title="Personalized learning"
          text="learn your way with a system designed to match your pace and goal.
         SkillQuest helps you focus on what matters most and progress with confidence "
        />
        <Performance2
          svg={trusted_content_icon}
          title="Trusted content"
          text="Access carefully selected courses and study materials from reliable sources. 
      SkillQuest ensure every lesson is clear,accurate,and designed to help you truly understand."
        />
        <Performance2
          svg={empower_teachers_icon}
          title="Tools to empower your learning"
          text="Powerful tools, practice exercises,and progress tracking help you stay 
        focused and motivated,giving you everything you need to build skills and succeed"
        />
      </div>
    </div>
  );
}

export default Performance;
