// universities.ts
// Central data file for all university information on SkillQuest
// Each university has a unique slug that matches the URL /university/:slug

export interface NewsItem {
  title: string;
  date: string;
  excerpt: string;
}

export interface CutoffEntry {
  year: number;
  score: number;
}

export interface Fees {
  tuition: string; // e.g. "₦450,000 – ₦700,000"
  accommodation: string; // e.g. "₦150,000 – ₦250,000"
}

export interface SatisfactionScores {
  socialLife: number; // out of 5
  academics: number;
  safety: number;
  food: number;
  hostel: number;
}

export interface FacultyData {
  name: string;
  description: string;
  departments: {
    name: string;
    courses: {
      level: string; // "100L" | "200L" | "300L" | "400L"
      title: string;
    }[];
  }[];
}

export interface University {
  slug: string;
  name: string;
  color: string; // unique accent color per school
  location: string;
  founded: number;
  type: "Private" | "Public" | "Federal" | "State";
  accreditation: string;
  overview: string;
  rating: number; // out of 5
  image: string; // picsum URL with seed
  faculties: FacultyData[];
  news: NewsItem[];
  notableAlumni: { name: string; field: string }[];
  cutoffHistory: CutoffEntry[];
  fees: Fees;
  satisfactionScores: SatisfactionScores;
}

const UNIVERSITIES: University[] = [
  // ─────────────────────────────────────────────
  // 1. Covenant University
  // ─────────────────────────────────────────────
  {
    slug: "covenant-university",
    name: "Covenant University",
    color: "#e63946",
    location: "Ota, Ogun State",
    founded: 2002,
    type: "Private",
    accreditation: "NUC Accredited",
    rating: 4.3,
    image: "https://picsum.photos/seed/covenant-uni/1400/800",
    overview:
      "Covenant University is a leading private Christian mission university located in Ota, Ogun State, Nigeria. Established in 2002 by the Living Faith Church Worldwide, it consistently ranks as one of the best universities in Nigeria and Africa. The university is known for its academic excellence, disciplined environment, zero-tolerance policy, and world-class infrastructure. It has produced top-performing graduates across engineering, business, law, and the sciences.",
    faculties: [
      {
        name: "Engineering",
        description: "Producing world-class engineers for the global economy.",
        departments: [
          {
            name: "Electrical & Electronics Engineering",
            courses: [
              { level: "100L", title: "Introduction to Engineering" },
              { level: "100L", title: "Engineering Mathematics I" },
              { level: "200L", title: "Circuit Theory" },
              { level: "200L", title: "Electronic Devices & Circuits" },
              { level: "300L", title: "Signals & Systems" },
              { level: "300L", title: "Digital Electronics" },
              { level: "400L", title: "Power Systems Engineering" },
              { level: "400L", title: "Telecommunications Engineering" },
            ],
          },
          {
            name: "Mechanical Engineering",
            courses: [
              { level: "100L", title: "Engineering Drawing" },
              { level: "200L", title: "Thermodynamics I" },
              { level: "300L", title: "Fluid Mechanics" },
              { level: "400L", title: "Machine Design" },
            ],
          },
          {
            name: "Civil Engineering",
            courses: [
              { level: "100L", title: "Surveying" },
              { level: "200L", title: "Structural Analysis" },
              { level: "300L", title: "Geotechnical Engineering" },
              { level: "400L", title: "Highway & Transportation Engineering" },
            ],
          },
          {
            name: "Mechatronics Engineering",
            courses: [
              { level: "200L", title: "Robotics Fundamentals" },
              { level: "300L", title: "Control Systems" },
              { level: "400L", title: "Embedded Systems Design" },
            ],
          },
        ],
      },
      {
        name: "Sciences",
        description: "Exploring the frontiers of natural and applied sciences.",
        departments: [
          {
            name: "Computer Science",
            courses: [
              { level: "100L", title: "Introduction to Computing" },
              { level: "200L", title: "Data Structures & Algorithms" },
              { level: "300L", title: "Database Management" },
              { level: "400L", title: "Artificial Intelligence" },
            ],
          },
          {
            name: "Biochemistry",
            courses: [
              { level: "100L", title: "General Chemistry" },
              { level: "200L", title: "Organic Chemistry" },
              { level: "300L", title: "Molecular Biology" },
              { level: "400L", title: "Clinical Biochemistry" },
            ],
          },
        ],
      },
      {
        name: "Business Administration",
        description: "Grooming ethical business leaders for Africa and beyond.",
        departments: [
          {
            name: "Accounting",
            courses: [
              { level: "100L", title: "Principles of Accounting" },
              { level: "200L", title: "Financial Accounting" },
              { level: "300L", title: "Auditing & Assurance" },
              { level: "400L", title: "Advanced Taxation" },
            ],
          },
          {
            name: "Economics",
            courses: [
              { level: "100L", title: "Principles of Economics" },
              { level: "200L", title: "Microeconomics" },
              { level: "300L", title: "Development Economics" },
              { level: "400L", title: "Econometrics" },
            ],
          },
        ],
      },
      {
        name: "Law",
        description: "Training legal minds grounded in justice and ethics.",
        departments: [
          {
            name: "Law",
            courses: [
              { level: "100L", title: "Nigerian Legal System" },
              { level: "200L", title: "Law of Contract" },
              { level: "300L", title: "Criminal Law" },
              { level: "400L", title: "International Law" },
            ],
          },
        ],
      },
    ],
    news: [
      {
        title:
          "Covenant University Ranks 1st in Nigeria — Times Higher Education 2024",
        date: "March 12, 2024",
        excerpt:
          "For the third consecutive year, Covenant University has retained its top position among Nigerian universities in the Times Higher Education World University Rankings.",
      },
      {
        title: "New AI Research Centre Launched on Campus",
        date: "January 28, 2024",
        excerpt:
          "The university has commissioned a state-of-the-art Artificial Intelligence and Data Science research hub, partnering with leading tech firms.",
      },
      {
        title: "CU Students Win International Robotics Competition",
        date: "November 5, 2023",
        excerpt:
          "A team of Mechatronics Engineering students represented Nigeria at the FIRST Global Robotics Challenge and returned with a silver medal.",
      },
    ],
    notableAlumni: [
      { name: "Adebayo Ogunlesi", field: "Global Infrastructure Partners" },
      { name: "Temi Dollface", field: "Music & Entertainment" },
      { name: "Chike Okonkwo", field: "Technology & Entrepreneurship" },
    ],
    cutoffHistory: [
      { year: 2020, score: 200 },
      { year: 2021, score: 210 },
      { year: 2022, score: 220 },
      { year: 2023, score: 230 },
      { year: 2024, score: 240 },
    ],
    fees: {
      tuition: "₦750,000 – ₦1,200,000",
      accommodation: "₦350,000 – ₦500,000",
    },
    satisfactionScores: {
      socialLife: 3.5,
      academics: 4.8,
      safety: 4.9,
      food: 3.8,
      hostel: 4.2,
    },
  },

  // ─────────────────────────────────────────────
  // 2. University of Lagos (UNILAG)
  // ─────────────────────────────────────────────
  {
    slug: "nile-university",
    name: "Nile University",
    color: "#f4a261",
    location: "Abuja",
    founded: 1962,
    type: "Private",
    accreditation: "NUC Accredited",
    rating: 4.1,
    image: "https://picsum.photos/seed/unilag-campus/1400/800",
    overview:
      "The University of Lagos, popularly known as UNILAG, is one of Nigeria's premier federal universities established in 1962. Situated on a scenic campus along the Lagos Lagoon in Akoka, it is renowned for its vibrant student life, diverse academic programmes, and strong alumni network. UNILAG consistently produces top graduates in law, medicine, engineering, social sciences, and the arts. Its proximity to Lagos Island — Nigeria's business hub — gives students unmatched exposure to industry and commerce.",
    faculties: [
      {
        name: "Engineering",
        description:
          "One of Nigeria's oldest and most respected engineering schools.",
        departments: [
          {
            name: "Electrical & Electronics Engineering",
            courses: [
              { level: "100L", title: "Engineering Mathematics I" },
              { level: "200L", title: "Circuit Analysis" },
              { level: "300L", title: "Control Engineering" },
              { level: "400L", title: "Communication Systems" },
            ],
          },
          {
            name: "Civil Engineering",
            courses: [
              { level: "100L", title: "Introduction to Civil Engineering" },
              { level: "200L", title: "Mechanics of Materials" },
              { level: "300L", title: "Structural Design" },
              { level: "400L", title: "Construction Management" },
            ],
          },
          {
            name: "Marine Engineering",
            courses: [
              { level: "200L", title: "Marine Thermodynamics" },
              { level: "300L", title: "Ship Stability" },
              { level: "400L", title: "Marine Engine Systems" },
            ],
          },
        ],
      },
      {
        name: "Medicine",
        description:
          "Training compassionate and skilled medical professionals.",
        departments: [
          {
            name: "Medicine & Surgery",
            courses: [
              { level: "100L", title: "Human Anatomy I" },
              { level: "200L", title: "Physiology" },
              { level: "300L", title: "Pathology" },
              { level: "400L", title: "Clinical Medicine" },
            ],
          },
          {
            name: "Pharmacy",
            courses: [
              { level: "100L", title: "Pharmaceutical Chemistry" },
              { level: "200L", title: "Pharmacognosy" },
              { level: "300L", title: "Pharmacology" },
              { level: "400L", title: "Clinical Pharmacy" },
            ],
          },
        ],
      },
      {
        name: "Law",
        description: "Producing Nigeria's finest legal practitioners.",
        departments: [
          {
            name: "Law",
            courses: [
              { level: "100L", title: "Nigerian Legal System" },
              { level: "200L", title: "Constitutional Law" },
              { level: "300L", title: "Commercial Law" },
              { level: "400L", title: "Human Rights Law" },
            ],
          },
        ],
      },
      {
        name: "Arts",
        description:
          "Celebrating African culture, language, and creative expression.",
        departments: [
          {
            name: "English",
            courses: [
              { level: "100L", title: "Use of English" },
              { level: "200L", title: "African Literature" },
              { level: "300L", title: "Stylistics & Discourse" },
              { level: "400L", title: "Creative Writing" },
            ],
          },
          {
            name: "History & Strategic Studies",
            courses: [
              { level: "100L", title: "African History" },
              { level: "200L", title: "Nigerian Political History" },
              { level: "300L", title: "Diplomatic History" },
              { level: "400L", title: "Strategic Studies" },
            ],
          },
        ],
      },
    ],
    news: [
      {
        title: "UNILAG Inaugurates New Medical Research Complex",
        date: "February 20, 2024",
        excerpt:
          "The College of Medicine has commissioned a ₦2.3 billion research complex equipped with cutting-edge laboratories and simulation wards.",
      },
      {
        title: "UNILAG Students Win Pan-African Debate Championship",
        date: "December 10, 2023",
        excerpt:
          "The UNILAG debate team clinched first place at the 2023 Pan-African University Debate Championship held in Nairobi, Kenya.",
      },
      {
        title: "New Scholarship Fund for 500 Students Announced",
        date: "October 3, 2023",
        excerpt:
          "An endowment from UNILAG alumni in the diaspora will fund full tuition scholarships for 500 indigent but talented students over the next five years.",
      },
    ],
    notableAlumni: [
      { name: "Wole Soyinka", field: "Literature & Nobel Laureate" },
      { name: "Tiwa Savage", field: "Music & Entertainment" },
      { name: "Tony Elumelu", field: "Banking & Philanthropy" },
    ],
    cutoffHistory: [
      { year: 2020, score: 180 },
      { year: 2021, score: 185 },
      { year: 2022, score: 190 },
      { year: 2023, score: 195 },
      { year: 2024, score: 200 },
    ],
    fees: {
      tuition: "₦45,000 – ₦200,000",
      accommodation: "₦60,000 – ₦120,000",
    },
    satisfactionScores: {
      socialLife: 4.7,
      academics: 4.2,
      safety: 3.4,
      food: 3.9,
      hostel: 3.2,
    },
  },

  // ─────────────────────────────────────────────
  // 3. Babcock University
  // ─────────────────────────────────────────────
  {
    slug: "babcock-university",
    name: "Babcock University",
    color: "#2a9d8f",
    location: "Ilishan-Remo, Ogun State",
    founded: 1999,
    type: "Private",
    accreditation: "NUC Accredited",
    rating: 4.0,
    image: "https://picsum.photos/seed/babcock-campus/1400/800",
    overview:
      "Babcock University is a private co-educational Nigerian university owned and operated by the Seventh-day Adventist Church. Founded in 1959 as Adventist College of West Africa and granted university status in 1999, it is located in Ilishan-Remo, Ogun State. Babcock is acclaimed for its serene, secure campus environment, its strong emphasis on character development, and its highly rated programmes in health sciences, business, and law. The university is a pioneer of value-based education in Nigeria.",
    faculties: [
      {
        name: "Health Sciences",
        description: "Nigeria's foremost private health sciences institution.",
        departments: [
          {
            name: "Medicine & Surgery",
            courses: [
              { level: "100L", title: "Cell Biology & Genetics" },
              { level: "200L", title: "Human Anatomy & Physiology" },
              { level: "300L", title: "Microbiology & Immunology" },
              { level: "400L", title: "Internal Medicine" },
            ],
          },
          {
            name: "Nursing Science",
            courses: [
              { level: "100L", title: "Foundations of Nursing" },
              { level: "200L", title: "Medical-Surgical Nursing" },
              { level: "300L", title: "Community Health Nursing" },
              { level: "400L", title: "Nursing Research" },
            ],
          },
        ],
      },
      {
        name: "Sciences",
        description: "Rigorous science education anchored in ethical practice.",
        departments: [
          {
            name: "Computer Science",
            courses: [
              { level: "100L", title: "Introduction to Programming" },
              { level: "200L", title: "Object-Oriented Programming" },
              { level: "300L", title: "Networks & Security" },
              { level: "400L", title: "Software Engineering" },
            ],
          },
          {
            name: "Microbiology",
            courses: [
              { level: "100L", title: "General Microbiology" },
              { level: "200L", title: "Industrial Microbiology" },
              { level: "300L", title: "Environmental Microbiology" },
              { level: "400L", title: "Medical Microbiology" },
            ],
          },
        ],
      },
      {
        name: "Management Sciences",
        description: "Building ethical, impactful business leaders.",
        departments: [
          {
            name: "Business Administration",
            courses: [
              { level: "100L", title: "Principles of Management" },
              { level: "200L", title: "Organisational Behaviour" },
              { level: "300L", title: "Strategic Management" },
              { level: "400L", title: "International Business" },
            ],
          },
          {
            name: "Banking & Finance",
            courses: [
              { level: "100L", title: "Money, Banking & Finance" },
              { level: "200L", title: "Financial Markets" },
              { level: "300L", title: "Investment Analysis" },
              { level: "400L", title: "Risk Management" },
            ],
          },
        ],
      },
      {
        name: "Law",
        description: "Shaping principled legal professionals.",
        departments: [
          {
            name: "Law",
            courses: [
              { level: "100L", title: "Legal Methods" },
              { level: "200L", title: "Law of Torts" },
              { level: "300L", title: "Equity & Trusts" },
              { level: "400L", title: "Company Law" },
            ],
          },
        ],
      },
    ],
    news: [
      {
        title:
          "Babcock Hospital Performs First Robotic Surgery in Southwest Nigeria",
        date: "April 5, 2024",
        excerpt:
          "Babcock University Teaching Hospital successfully completed the first da Vinci robotic surgery in southwest Nigeria, marking a milestone in medical technology.",
      },
      {
        title:
          "Babcock Ranks Among Top 10 African Universities — Webometrics 2024",
        date: "January 15, 2024",
        excerpt:
          "The Webometrics Ranking of World Universities has placed Babcock University among the top 10 universities in Africa for digital presence and academic output.",
      },
      {
        title: "New Student Innovation Hub Launched",
        date: "September 22, 2023",
        excerpt:
          "A 300-seater innovation and entrepreneurship hub has been commissioned on the Babcock campus, offering students co-working space, 3D printers, and startup mentoring.",
      },
    ],
    notableAlumni: [
      { name: "Adesola Adeduntan", field: "Banking & Finance" },
      { name: "Dapo Abiodun", field: "Politics & Governance" },
      { name: "Funke Opeke", field: "Telecommunications" },
    ],
    cutoffHistory: [
      { year: 2020, score: 160 },
      { year: 2021, score: 170 },
      { year: 2022, score: 175 },
      { year: 2023, score: 180 },
      { year: 2024, score: 185 },
    ],
    fees: {
      tuition: "₦500,000 – ₦950,000",
      accommodation: "₦200,000 – ₦380,000",
    },
    satisfactionScores: {
      socialLife: 3.6,
      academics: 4.3,
      safety: 4.8,
      food: 4.0,
      hostel: 4.1,
    },
  },

  // ─────────────────────────────────────────────
  // 4. Bowen University (stub — linked from homepage)
  // ─────────────────────────────────────────────
  {
    slug: "bowen-university",
    name: "Bowen University",
    color: "#9b5de5",
    location: "Iwo, Osun State",
    founded: 2001,
    type: "Private",
    accreditation: "NUC Accredited",
    rating: 3.9,
    image: "https://picsum.photos/seed/bowen-campus/1400/800",
    overview:
      "Bowen University is a private Baptist university located in Iwo, Osun State, Nigeria. Founded in 2001 by the Nigerian Baptist Convention, the university prides itself on a serene academic environment, affordable private-school tuition, and a strong community of faith-driven scholars. It offers programmes across agriculture, sciences, arts, and social sciences, and is well regarded for its agronomy and crop science departments.",
    faculties: [
      {
        name: "Agriculture",
        description:
          "Pioneering modern agricultural science in southwest Nigeria.",
        departments: [
          {
            name: "Crop & Soil Science",
            courses: [
              { level: "100L", title: "Introduction to Agriculture" },
              { level: "200L", title: "Soil Chemistry" },
              { level: "300L", title: "Crop Physiology" },
              { level: "400L", title: "Agricultural Extension" },
            ],
          },
          {
            name: "Animal Science",
            courses: [
              { level: "100L", title: "Livestock Management" },
              { level: "200L", title: "Animal Nutrition" },
              { level: "300L", title: "Animal Breeding" },
              { level: "400L", title: "Poultry Science" },
            ],
          },
        ],
      },
      {
        name: "Sciences",
        description: "Quality science education in a faith-based setting.",
        departments: [
          {
            name: "Biochemistry",
            courses: [
              { level: "100L", title: "General Chemistry" },
              { level: "200L", title: "Biochemical Techniques" },
              { level: "300L", title: "Enzymology" },
              { level: "400L", title: "Nutritional Biochemistry" },
            ],
          },
        ],
      },
    ],
    news: [
      {
        title: "Bowen University Launches New Agricultural Research Park",
        date: "March 8, 2024",
        excerpt:
          "A 50-hectare agricultural innovation park has been commissioned at Bowen University, providing students hands-on experience in modern farming techniques.",
      },
    ],
    notableAlumni: [
      { name: "Sunday Dare", field: "Politics & Sports Administration" },
      { name: "Kemi Adeosun", field: "Finance & Government" },
    ],
    cutoffHistory: [
      { year: 2021, score: 150 },
      { year: 2022, score: 155 },
      { year: 2023, score: 160 },
      { year: 2024, score: 165 },
    ],
    fees: {
      tuition: "₦350,000 – ₦600,000",
      accommodation: "₦120,000 – ₦200,000",
    },
    satisfactionScores: {
      socialLife: 3.4,
      academics: 3.9,
      safety: 4.5,
      food: 3.7,
      hostel: 3.8,
    },
  },
];

export default UNIVERSITIES;
