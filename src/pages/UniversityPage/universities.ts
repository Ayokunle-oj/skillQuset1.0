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
    slug: "unilag",
    name: "University of Lagos",
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
  // 4. Nile University
  // ─────────────────────────────────────────────
  {
    slug: "nile-university",
    name: "Nile University of Nigeria",
    color: "#00b4d8",
    location: "Abuja, FCT",
    founded: 2009,
    type: "Private",
    accreditation: "NUC Accredited",
    rating: 4.0,
    image: "https://picsum.photos/seed/nile-uni/1400/800",
    overview:
      "Nile University of Nigeria is a private research-driven university located in Abuja, established in 2009. With strong ties to Turkish academic traditions, it offers a multicultural environment and modern facilities. The university is particularly noted for its engineering, IT, and business programmes, and attracts students from across Nigeria and West Africa seeking a cosmopolitan campus experience in the nation's capital.",
    faculties: [
      {
        name: "Engineering & Technology",
        description: "Cutting-edge technical education in the heart of Abuja.",
        departments: [
          {
            name: "Computer Engineering",
            courses: [
              { level: "100L", title: "Introduction to Engineering" },
              { level: "200L", title: "Digital Logic Design" },
              { level: "300L", title: "Computer Architecture" },
              { level: "400L", title: "VLSI Design" },
            ],
          },
          {
            name: "Electrical & Electronics Engineering",
            courses: [
              { level: "100L", title: "Engineering Mathematics" },
              { level: "200L", title: "Circuit Analysis" },
              { level: "300L", title: "Electromagnetic Fields" },
              { level: "400L", title: "Power Electronics" },
            ],
          },
        ],
      },
      {
        name: "Natural & Applied Sciences",
        description: "Advancing science research with global standards.",
        departments: [
          {
            name: "Computer Science",
            courses: [
              { level: "100L", title: "Programming Fundamentals" },
              { level: "200L", title: "Data Structures" },
              { level: "300L", title: "Software Engineering" },
              { level: "400L", title: "Machine Learning" },
            ],
          },
          {
            name: "Cyber Security",
            courses: [
              { level: "200L", title: "Network Security" },
              { level: "300L", title: "Ethical Hacking" },
              { level: "400L", title: "Digital Forensics" },
            ],
          },
        ],
      },
      {
        name: "Management Sciences",
        description: "Training business leaders for a globalised economy.",
        departments: [
          {
            name: "Business Administration",
            courses: [
              { level: "100L", title: "Principles of Management" },
              { level: "200L", title: "Marketing Management" },
              { level: "300L", title: "Entrepreneurship" },
              { level: "400L", title: "Strategic Management" },
            ],
          },
        ],
      },
    ],
    news: [
      {
        title: "Nile University Opens New Postgraduate Research Centre",
        date: "February 14, 2024",
        excerpt:
          "The university has commissioned a dedicated postgraduate research centre to support doctoral and master's programmes in science and technology.",
      },
      {
        title: "Nile University Students Win National Debate Championship",
        date: "October 20, 2023",
        excerpt:
          "The university's debate team clinched first place at the 2023 National Intercollegiate Debate Championship held in Lagos.",
      },
    ],
    notableAlumni: [
      { name: "Aisha Buhari", field: "Public Health & Advocacy" },
      { name: "Ibrahim Musa", field: "Technology & Innovation" },
    ],
    cutoffHistory: [
      { year: 2021, score: 160 },
      { year: 2022, score: 165 },
      { year: 2023, score: 170 },
      { year: 2024, score: 175 },
    ],
    fees: {
      tuition: "₦600,000 – ₦950,000",
      accommodation: "₦200,000 – ₦350,000",
    },
    satisfactionScores: {
      socialLife: 3.8,
      academics: 4.1,
      safety: 4.4,
      food: 3.9,
      hostel: 4.0,
    },
  },

  // ─────────────────────────────────────────────
  // 5. Bingham University
  // ─────────────────────────────────────────────
  {
    slug: "bingham-university",
    name: "Bingham University",
    color: "#f4a261",
    location: "Karu, Nasarawa State",
    founded: 2005,
    type: "Private",
    accreditation: "NUC Accredited",
    rating: 3.7,
    image: "https://picsum.photos/seed/bingham-uni/1400/800",
    overview:
      "Bingham University is a faith-based private university owned by the Church of Christ in Nations (COCIN), located in Karu, Nasarawa State. Founded in 2005, the university fosters academic development rooted in Christian values. It is well regarded for its medical sciences, law, and arts programmes, and serves as a key higher education institution bridging northern and central Nigeria.",
    faculties: [
      {
        name: "Health Sciences",
        description: "Equipping compassionate healthcare professionals.",
        departments: [
          {
            name: "Medicine & Surgery",
            courses: [
              { level: "100L", title: "Introductory Biology" },
              { level: "200L", title: "Human Physiology" },
              { level: "300L", title: "Pathology" },
              { level: "400L", title: "Clinical Medicine" },
            ],
          },
          {
            name: "Pharmacy",
            courses: [
              { level: "100L", title: "General Chemistry" },
              { level: "200L", title: "Pharmaceutical Chemistry" },
              { level: "300L", title: "Pharmacology" },
              { level: "400L", title: "Clinical Pharmacy" },
            ],
          },
        ],
      },
      {
        name: "Law",
        description: "Producing principled legal practitioners.",
        departments: [
          {
            name: "Law",
            courses: [
              { level: "100L", title: "Introduction to Nigerian Law" },
              { level: "200L", title: "Constitutional Law" },
              { level: "300L", title: "Commercial Law" },
              { level: "400L", title: "Jurisprudence" },
            ],
          },
        ],
      },
      {
        name: "Arts & Social Sciences",
        description: "Humanities education grounded in cultural context.",
        departments: [
          {
            name: "English & Literary Studies",
            courses: [
              { level: "100L", title: "Introduction to Literature" },
              { level: "200L", title: "African Literature" },
              { level: "300L", title: "Linguistics" },
              { level: "400L", title: "Creative Writing" },
            ],
          },
        ],
      },
    ],
    news: [
      {
        title:
          "Bingham University Teaching Hospital Gets Federal Accreditation",
        date: "January 30, 2024",
        excerpt:
          "The Federal Ministry of Health has granted full accreditation to Bingham University Teaching Hospital, enabling the institution to train specialist doctors.",
      },
    ],
    notableAlumni: [
      { name: "Simon Lalong", field: "Politics & Governance" },
      { name: "Yakubu Gowon", field: "Military & Statesmanship" },
    ],
    cutoffHistory: [
      { year: 2021, score: 140 },
      { year: 2022, score: 145 },
      { year: 2023, score: 150 },
      { year: 2024, score: 155 },
    ],
    fees: {
      tuition: "₦300,000 – ₦550,000",
      accommodation: "₦100,000 – ₦180,000",
    },
    satisfactionScores: {
      socialLife: 3.2,
      academics: 3.8,
      safety: 4.3,
      food: 3.5,
      hostel: 3.6,
    },
  },

  // ─────────────────────────────────────────────
  // 6. Pan-Atlantic University
  // ─────────────────────────────────────────────
  {
    slug: "pan-atlantic-university",
    name: "Pan-Atlantic University",
    color: "#2d6a4f",
    location: "Lagos, Lagos State",
    founded: 2002,
    type: "Private",
    accreditation: "NUC Accredited",
    rating: 4.2,
    image: "https://picsum.photos/seed/pan-atlantic-uni/1400/800",
    overview:
      "Pan-Atlantic University (PAU) is a private institution in Lagos, Nigeria, affiliated with Opus Dei. Founded in 2002, it is home to the Lagos Business School (LBS) — one of Africa's top-ranked business schools. PAU is known for producing ethical, entrepreneurial, and leadership-driven graduates. Its small cohort sizes ensure strong faculty-student engagement and a culture of excellence in management and communication.",
    faculties: [
      {
        name: "Lagos Business School",
        description:
          "One of Africa's premier management education institutions.",
        departments: [
          {
            name: "Business Administration",
            courses: [
              { level: "100L", title: "Business Communication" },
              { level: "200L", title: "Corporate Governance" },
              { level: "300L", title: "Financial Analysis" },
              { level: "400L", title: "Business Ethics" },
            ],
          },
          {
            name: "Entrepreneurship",
            courses: [
              { level: "200L", title: "Startup Fundamentals" },
              { level: "300L", title: "Venture Capital & Finance" },
              { level: "400L", title: "Scaling & Growth Strategy" },
            ],
          },
        ],
      },
      {
        name: "School of Media & Communication",
        description: "Shaping ethical media professionals for Africa.",
        departments: [
          {
            name: "Mass Communication",
            courses: [
              { level: "100L", title: "Introduction to Media" },
              { level: "200L", title: "Journalism & Reporting" },
              { level: "300L", title: "Public Relations" },
              { level: "400L", title: "Digital Media Strategy" },
            ],
          },
        ],
      },
    ],
    news: [
      {
        title: "Lagos Business School Ranked Best in West Africa — FT 2024",
        date: "March 5, 2024",
        excerpt:
          "The Financial Times has ranked Lagos Business School the best business school in West Africa for executive education in its 2024 global ranking.",
      },
      {
        title: "PAU Launches Africa Leadership Initiative",
        date: "November 11, 2023",
        excerpt:
          "Pan-Atlantic University has unveiled a pan-African leadership programme designed to produce the next generation of ethical business and government leaders.",
      },
    ],
    notableAlumni: [
      { name: "Aigboje Aig-Imoukhuede", field: "Banking & Philanthropy" },
      { name: "Tara Fela-Durotoye", field: "Beauty & Entrepreneurship" },
      { name: "Kola Karim", field: "Energy & Business" },
    ],
    cutoffHistory: [
      { year: 2021, score: 180 },
      { year: 2022, score: 185 },
      { year: 2023, score: 190 },
      { year: 2024, score: 195 },
    ],
    fees: {
      tuition: "₦900,000 – ₦1,500,000",
      accommodation: "₦300,000 – ₦500,000",
    },
    satisfactionScores: {
      socialLife: 3.7,
      academics: 4.6,
      safety: 4.7,
      food: 4.1,
      hostel: 4.2,
    },
  },

  // ─────────────────────────────────────────────
  // 7. Landmark University
  // ─────────────────────────────────────────────
  {
    slug: "landmark-university",
    name: "Landmark University",
    color: "#457b9d",
    location: "Omu-Aran, Kwara State",
    founded: 2011,
    type: "Private",
    accreditation: "NUC Accredited",
    rating: 4.1,
    image: "https://picsum.photos/seed/landmark-uni/1400/800",
    overview:
      "Landmark University is a private Christian mission university in Omu-Aran, Kwara State, Nigeria, founded in 2011 by the Living Faith Church. It has a unique vision focused on agrarian revolution and entrepreneurship, producing graduates who are both academically sound and practically skilled. It has rapidly become one of Nigeria's most cited universities in research output and has received multiple NUC commendations.",
    faculties: [
      {
        name: "Agriculture",
        description: "Driving Nigeria's agrarian revolution through education.",
        departments: [
          {
            name: "Agricultural Economics & Extension",
            courses: [
              { level: "100L", title: "Introduction to Agribusiness" },
              { level: "200L", title: "Farm Management" },
              { level: "300L", title: "Agricultural Policy" },
              { level: "400L", title: "Rural Development" },
            ],
          },
          {
            name: "Plant Biology",
            courses: [
              { level: "100L", title: "Cell & Molecular Biology" },
              { level: "200L", title: "Plant Physiology" },
              { level: "300L", title: "Genetics" },
              { level: "400L", title: "Biotechnology" },
            ],
          },
        ],
      },
      {
        name: "Engineering",
        description: "Practical, innovation-driven engineering education.",
        departments: [
          {
            name: "Chemical Engineering",
            courses: [
              { level: "100L", title: "Engineering Chemistry" },
              { level: "200L", title: "Process Thermodynamics" },
              { level: "300L", title: "Mass Transfer Operations" },
              { level: "400L", title: "Petroleum Refining" },
            ],
          },
          {
            name: "Civil Engineering",
            courses: [
              { level: "100L", title: "Engineering Drawing" },
              { level: "200L", title: "Structural Mechanics" },
              { level: "300L", title: "Water Resources Engineering" },
              { level: "400L", title: "Construction Management" },
            ],
          },
        ],
      },
      {
        name: "Sciences",
        description: "Rigorous science education in a disciplined environment.",
        departments: [
          {
            name: "Computer Science",
            courses: [
              { level: "100L", title: "Computational Thinking" },
              { level: "200L", title: "Algorithms & Complexity" },
              { level: "300L", title: "Database Systems" },
              { level: "400L", title: "Artificial Intelligence" },
            ],
          },
        ],
      },
    ],
    news: [
      {
        title: "Landmark University Tops NUC Research Output Rankings 2024",
        date: "February 28, 2024",
        excerpt:
          "The National Universities Commission has recognised Landmark University as the highest research-producing private university in Nigeria for 2023.",
      },
      {
        title: "New Smart Farming Lab Commissioned",
        date: "October 5, 2023",
        excerpt:
          "A state-of-the-art smart farming and precision agriculture laboratory has been opened at Landmark University, integrating IoT sensors and drone technology.",
      },
    ],
    notableAlumni: [
      { name: "Femi Adeyemo", field: "Technology & Agriculture" },
      { name: "Blessing Okonkwo", field: "Research & Academia" },
    ],
    cutoffHistory: [
      { year: 2021, score: 170 },
      { year: 2022, score: 175 },
      { year: 2023, score: 180 },
      { year: 2024, score: 185 },
    ],
    fees: {
      tuition: "₦500,000 – ₦800,000",
      accommodation: "₦180,000 – ₦300,000",
    },
    satisfactionScores: {
      socialLife: 3.5,
      academics: 4.4,
      safety: 4.8,
      food: 3.9,
      hostel: 4.2,
    },
  },

  // ─────────────────────────────────────────────
  // 8. Redeemer's University
  // ─────────────────────────────────────────────
  {
    slug: "redeemers-university",
    name: "Redeemer's University",
    color: "#e76f51",
    location: "Ede, Osun State",
    founded: 2005,
    type: "Private",
    accreditation: "NUC Accredited",
    rating: 4.0,
    image: "https://picsum.photos/seed/redeemers-uni/1400/800",
    overview:
      "Redeemer's University (RUN) is a private Christian university founded in 2005 by the Redeemed Christian Church of God (RCCG), located in Ede, Osun State. Known for its serene, well-secured campus and strong academic environment, RUN offers programmes in sciences, management, and humanities. The university emphasises total development — intellectual, moral, and spiritual — and has earned a reputation for producing disciplined graduates.",
    faculties: [
      {
        name: "Natural Sciences",
        description: "Building the next generation of Nigerian scientists.",
        departments: [
          {
            name: "Chemistry",
            courses: [
              { level: "100L", title: "General Chemistry I" },
              { level: "200L", title: "Analytical Chemistry" },
              { level: "300L", title: "Organic Chemistry" },
              { level: "400L", title: "Industrial Chemistry" },
            ],
          },
          {
            name: "Microbiology",
            courses: [
              { level: "100L", title: "General Microbiology" },
              { level: "200L", title: "Virology" },
              { level: "300L", title: "Environmental Microbiology" },
              { level: "400L", title: "Medical Microbiology" },
            ],
          },
        ],
      },
      {
        name: "Management Sciences",
        description: "Ethical leadership for a transforming Africa.",
        departments: [
          {
            name: "Accounting",
            courses: [
              { level: "100L", title: "Principles of Accounting" },
              { level: "200L", title: "Intermediate Accounting" },
              { level: "300L", title: "Cost Accounting" },
              { level: "400L", title: "Forensic Accounting" },
            ],
          },
          {
            name: "Economics",
            courses: [
              { level: "100L", title: "Introduction to Economics" },
              { level: "200L", title: "Macroeconomics" },
              { level: "300L", title: "Public Finance" },
              { level: "400L", title: "Development Economics" },
            ],
          },
        ],
      },
      {
        name: "Humanities",
        description: "Preserving culture and shaping critical thinkers.",
        departments: [
          {
            name: "English Language & Literature",
            courses: [
              { level: "100L", title: "Use of English" },
              { level: "200L", title: "African Oral Literature" },
              { level: "300L", title: "Discourse Analysis" },
              { level: "400L", title: "Sociolinguistics" },
            ],
          },
        ],
      },
    ],
    news: [
      {
        title: "RUN Signs MOU with Three International Universities",
        date: "March 18, 2024",
        excerpt:
          "Redeemer's University has signed academic exchange agreements with universities in the UK, Canada, and South Africa to facilitate student mobility programmes.",
      },
      {
        title: "RUN Research Team Publishes Malaria Vaccine Study",
        date: "December 1, 2023",
        excerpt:
          "A research team from the Department of Microbiology has published a landmark study on a promising malaria vaccine candidate in a peer-reviewed journal.",
      },
    ],
    notableAlumni: [
      { name: "Bimbo Ademoye", field: "Film & Entertainment" },
      { name: "Olawale Ogunleye", field: "Engineering & Innovation" },
    ],
    cutoffHistory: [
      { year: 2021, score: 160 },
      { year: 2022, score: 165 },
      { year: 2023, score: 168 },
      { year: 2024, score: 172 },
    ],
    fees: {
      tuition: "₦450,000 – ₦750,000",
      accommodation: "₦160,000 – ₦280,000",
    },
    satisfactionScores: {
      socialLife: 3.4,
      academics: 4.0,
      safety: 4.7,
      food: 3.7,
      hostel: 3.9,
    },
  },

  // ─────────────────────────────────────────────
  // 9. Afe Babalola University
  // ─────────────────────────────────────────────
  {
    slug: "afe-babalola-university",
    name: "Afe Babalola University",
    color: "#6a0572",
    location: "Ado-Ekiti, Ekiti State",
    founded: 2009,
    type: "Private",
    accreditation: "NUC Accredited",
    rating: 4.2,
    image: "https://picsum.photos/seed/abuad-uni/1400/800",
    overview:
      "Afe Babalola University, Ado-Ekiti (ABUAD) is a private university founded in 2009 by renowned legal luminary Aare Afe Babalola. Located in Ekiti State, it is one of Nigeria's fastest-growing private universities, boasting world-class facilities including a 500-bed teaching hospital, a 3000-seat auditorium, and a multi-specialty medical complex. ABUAD is renowned for its law, medicine, and engineering programmes, and prides itself on a zero-tolerance disciplinary policy.",
    faculties: [
      {
        name: "Law",
        description: "Nigeria's foremost private law school environment.",
        departments: [
          {
            name: "Law",
            courses: [
              { level: "100L", title: "Legal Methods & Writing" },
              { level: "200L", title: "Contract Law" },
              { level: "300L", title: "Criminal Procedure" },
              { level: "400L", title: "International Commercial Law" },
            ],
          },
        ],
      },
      {
        name: "Medicine & Health Sciences",
        description: "A 500-bed teaching hospital anchoring clinical training.",
        departments: [
          {
            name: "Medicine & Surgery",
            courses: [
              { level: "100L", title: "Medical Biochemistry" },
              { level: "200L", title: "Human Anatomy" },
              { level: "300L", title: "Physiology & Biophysics" },
              { level: "400L", title: "Community Medicine" },
            ],
          },
          {
            name: "Physiotherapy",
            courses: [
              { level: "100L", title: "Anatomy for Physiotherapy" },
              { level: "200L", title: "Kinesiology" },
              { level: "300L", title: "Orthopaedic Physiotherapy" },
              { level: "400L", title: "Neurological Rehabilitation" },
            ],
          },
        ],
      },
      {
        name: "Engineering",
        description: "Practical engineering for Africa's infrastructure needs.",
        departments: [
          {
            name: "Petroleum Engineering",
            courses: [
              { level: "200L", title: "Reservoir Engineering" },
              { level: "300L", title: "Drilling Engineering" },
              { level: "400L", title: "Production Technology" },
            ],
          },
          {
            name: "Civil & Environmental Engineering",
            courses: [
              { level: "100L", title: "Engineering Surveying" },
              { level: "200L", title: "Environmental Impact Assessment" },
              { level: "300L", title: "Structural Design" },
              { level: "400L", title: "Construction Project Management" },
            ],
          },
        ],
      },
    ],
    news: [
      {
        title: "ABUAD Teaching Hospital Accredited for Residency Training",
        date: "April 2, 2024",
        excerpt:
          "The Medical and Dental Council of Nigeria has approved ABUAD Multi-System Hospital for postgraduate medical residency training across six specialisations.",
      },
      {
        title: "ABUAD Law Students Win National Moot Court Competition",
        date: "February 8, 2024",
        excerpt:
          "Students from the Faculty of Law swept the national moot court competition, defeating 27 other universities to claim first prize.",
      },
    ],
    notableAlumni: [
      { name: "Afe Babalola Jr.", field: "Law & Corporate Governance" },
      { name: "Tolu Adesanya", field: "Medicine & Public Health" },
    ],
    cutoffHistory: [
      { year: 2021, score: 175 },
      { year: 2022, score: 180 },
      { year: 2023, score: 185 },
      { year: 2024, score: 190 },
    ],
    fees: {
      tuition: "₦700,000 – ₦1,100,000",
      accommodation: "₦250,000 – ₦420,000",
    },
    satisfactionScores: {
      socialLife: 3.6,
      academics: 4.4,
      safety: 4.9,
      food: 4.0,
      hostel: 4.3,
    },
  },

  // ─────────────────────────────────────────────
  // 11. Bowen University
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
