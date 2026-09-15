export type Tier = 'high' | 'moderate' | 'ready';
export type AssessmentCategory = number;

export interface AssessmentMetric {
  id: number;
  shortTitle: string;
  title: string;
  description: string;
  choices: {
    score: number;
    label: string;
    description: string;
    thaiDescription: string;
  }[];
  mfecSolution?: {
    name: string;
    description: string;
  };
}

export const assessmentData: AssessmentMetric[] = [
  {
    id: 1,
    shortTitle: "Foundation",
    title: "Data Accessibility & Integration",
    description: "พนักงานในองค์กรของคุณสามารถเข้าถึงและนำข้อมูลไปใช้งานได้ราบรื่นแค่ไหน?",
    mfecSolution: {
      name: "Cloud & Infrastructure Modernization",
      description: "Redesign your core architecture for infinite scalability and zero downtime."
    },
    choices: [
      {
        score: 1,
        label: "Data Silos:",
        description: "Data is trapped in scattered Excel sheets or isolated department software; no central repository.",
        thaiDescription: "ข้อมูลกระจัดกระจายอยู่ใน Excel หรือซอฟต์แวร์แยกตามแผนก ไม่มีศูนย์กลาง"
      },
      {
        score: 3,
        label: "Partial Integration:",
        description: "Core systems (e.g., ERP) exist, but data transfers between departments are semi-manual.",
        thaiDescription: "มีระบบหลัก (เช่น ERP) แต่การส่งข้อมูลระหว่างแผนกยังคงต้องทำด้วยมือบางส่วน"
      },
      {
        score: 5,
        label: "Unified Lakehouse:",
        description: "All corporate data flows automatically into a centralized Data Lakehouse in real-time.",
        thaiDescription: "ข้อมูลทั้งหมดขององค์กรไหลเข้าสู่ Data Lakehouse ส่วนกลางโดยอัตโนมัติแบบเรียลไทม์"
      }
    ]
  },
  {
    id: 2,
    shortTitle: "Data",
    title: "System Scalability & Cloud Adoption",
    description: "โครงสร้างระบบไอทีของคุณยืดหยุ่นและรองรับการขยายตัวได้ดีเพียงใดเมื่อธุรกิจเติบโต?",
    mfecSolution: {
      name: "Data Engineering & Analytics",
      description: "Unlock the true value of your data with automated modern data pipelines."
    },
    choices: [
      {
        score: 1,
        label: "Rigid On-Premise:",
        description: "Heavy reliance on physical servers; scaling up takes weeks of procurement and setup.",
        thaiDescription: "ใช้เซิร์ฟเวอร์แบบเดิมๆ การจะขยายระบบแต่ละครั้งต้องรอซื้อของและติดตั้งแต่หลักสัปดาห์"
      },
      {
        score: 3,
        label: "Hybrid Foundation:",
        description: "Some non-critical workloads are on the cloud, but core operations remain on fixed infrastructure.",
        thaiDescription: "เริ่มใช้ Cloud บ้างในบางระบบ แต่ระบบหัวใจหลักยังคงอยู่บนเซิร์ฟเวอร์บริษัทที่ขยายยาก"
      },
      {
        score: 5,
        label: "Cloud-Native Agility:",
        description: "Fully modernized architecture using microservices and auto-scaling cloud infrastructure.",
        thaiDescription: "ระบบทั้งหมดอยู่บน Cloud แบบ 100% สามารถขยายรับผู้ใช้งานหลักล้านได้ในไม่กี่นาทีแบบอัตโนมัติ"
      }
    ]
  },
  {
    id: 3,
    shortTitle: "Code",
    title: "Tech Obsolescence & Maintenance",
    description: "ระบบซอฟต์แวร์ที่ใช้อยู่มีความทันสมัยและง่ายต่อการดูแลรักษามากน้อยแค่ไหน?",
    mfecSolution: {
      name: "Application Modernization",
      description: "Refactor legacy systems and elevate your software engineering practices."
    },
    choices: [
      {
        score: 1,
        label: "Legacy Trap:",
        description: "Core software is outdated, unsupported, and only a few senior staff know how to fix it.",
        thaiDescription: "ซอฟต์แวร์เก่ามาก ไม่มีอัปเดตแล้ว และมีพนักงานแค่ไม่กี่คนที่รู้วิธีซ่อมเวลาพัง"
      },
      {
        score: 3,
        label: "Modernizing Effort:",
        description: "Mix of modern SaaS tools and legacy systems; high maintenance cost to keep them running.",
        thaiDescription: "มีซอฟต์แวร์ใหม่ผสมกับของเก่า แต่ต้องใช้เวลาและงบเยอะมากในการดูแลให้มันทำงานร่วมกันได้"
      },
      {
        score: 5,
        label: "Continuous Evolution:",
        description: "Modern tech stack with automated CI/CD pipelines, making updates safe and effortless.",
        thaiDescription: "ใช้เทคโนโลยีรุ่นใหม่ทั้งหมด มีระบบอัปเดตซอฟต์แวร์อัตโนมัติที่รวดเร็วและปลอดภัย (CI/CD)"
      }
    ]
  },
  {
    id: 4,
    shortTitle: "Ops",
    title: "Core Industry Connectivity",
    description: "ระบบงานส่วนหน้าและระบบหลังบ้านของคุณมีการเชื่อมต่อและแลกเปลี่ยนข้อมูลกันอย่างไร?",
    mfecSolution: {
      name: "DevSecOps Transformation",
      description: "Automate your delivery pipelines and bake continuous integration into your DNA."
    },
    choices: [
      {
        score: 1,
        label: "Disconnected Workflows:",
        description: "Front-office and back-office operate in completely different, unconnected systems.",
        thaiDescription: "ระบบหน้าร้านกับหลังบ้านแยกกันเด็ดขาด ต้องใช้คนคอยคีย์ข้อมูลข้ามระบบตลอดเวลา"
      },
      {
        score: 3,
        label: "Batch Synchronized:",
        description: "Systems are connected via periodic batch jobs (e.g., syncing at midnight).",
        thaiDescription: "ระบบเชื่อมต่อกันระดับหนึ่ง แต่ข้อมูลไม่ได้อัปเดตทันที (เช่น ต้องรอซิงก์ข้อมูลทุกๆ เที่ยงคืน)"
      },
      {
        score: 5,
        label: "API-Driven Ecosystem:",
        description: "Seamless real-time data flow across all touchpoints via robust API architecture.",
        thaiDescription: "ทุกระบบเชื่อมต่อกันแบบ Real-time ผ่าน API ข้อมูลหน้าร้านและหลังบ้านอัปเดตตรงกันทันที"
      }
    ]
  },
  {
    id: 5,
    shortTitle: "Security",
    title: "Cyber Security & Governance",
    description: "องค์กรของคุณมีมาตรการรักษาความปลอดภัยของข้อมูลและแผนรับมือความเสี่ยงที่เข้มงวดระดับไหน?",
    mfecSolution: {
      name: "Enterprise Security Audit",
      description: "Fortify your defenses with comprehensive risk assessments and zero-trust framework."
    },
    choices: [
      {
        score: 1,
        label: "Reactive / Paper-based:",
        description: "No strict digital access controls; no data governance policy; high risk of a security breach.",
        thaiDescription: "ไม่มีระบบป้องกันข้อมูลที่เข้มงวด ใครก็เข้าถึงข้อมูลได้ง่าย ทำให้มีความเสี่ยงสูงที่จะถูกเจาะระบบ"
      },
      {
        score: 3,
        label: "Basic Compliance:",
        description: "Have firewalls and anti-virus, but lack an executive-led business continuity and recovery plan.",
        thaiDescription: "มีระบบป้องกันพื้นฐาน (เช่น สแกนไวรัส) แต่ยังไม่มีแผนกู้คืนระบบและกู้คืนธุรกิจหากเกิดเหตุระบบล่มใหญ่"
      },
      {
        score: 5,
        label: "Proactive Resilience:",
        description: "Zero-Trust architecture, automated monitoring, and active board-level risk management.",
        thaiDescription: "มีระบบรักษาความปลอดภัยขั้นสูง ตรวจจับความผิดปกติอัตโนมัติ และมีการบริหารความเสี่ยงระดับองค์กรที่เข้มงวด"
      }
    ]
  }
];

export const getResultTier = (totalScore: number): Tier => {
  if (totalScore <= 11) return 'high';
  if (totalScore <= 18) return 'moderate';
  return 'ready';
};

export const resultDetails = {
  high: {
    title: "High Tech Debt",
    subtitle: "BANKRUPTCY RISK",
    status: "องค์กรมี \"หนี้ทางเทคโนโลยี\" สะสมจนถึงขั้นวิกฤต ระบบไอทีที่ใช้อยู่กลายเป็นตัวถ่วงมากกว่าตัวช่วย ข้อมูลกระจัดกระจายและระบบล้าสมัยมาก",
    action: "ยังไม่ควรลงทุนทำระบบ AI ขั้นสูงในตอนนี้ ควรเร่งจัดระเบียบข้อมูลใหม่ (Data Modernization) และอัปเกรดระบบหลักให้ทันสมัยก่อนเป็นอันดับแรก",
    color: "neon-red",
    glowClass: "glow-red",
    titleGradient: "from-rose-400 via-red-500 to-red-600 dark:from-red-300 dark:via-rose-500 dark:to-red-700",
    actionPlan: [
      "Conduct a comprehensive architectural audit to identify critical vulnerabilities.",
      "Prioritize stabilizing core data infrastructure and security protocols.",
      "Establish a clear Tech Debt reduction roadmap with key stakeholders."
    ]
  },
  moderate: {
    title: "Moderate Debt",
    subtitle: "BOTTLENECK WARNING",
    status: "องค์กรของคุณมีพื้นฐานไอทีระดับกลาง แต่เริ่มมีปัญหาคอขวด (Bottleneck) การประมวลผลข้อมูลยังช้า และยังมีบางส่วนที่ต้องทำด้วยมือ (Manual)",
    action: "สามารถเริ่มทดลองใช้ AI ในบางแผนกได้ แต่ต้องควบคู่ไปกับการทำ Data Cleansing และปรับปรุงโครงสร้างพื้นฐานให้รองรับการสเกลในอนาคต",
    color: "neon-yellow",
    glowClass: "glow-yellow",
    titleGradient: "from-amber-400 via-yellow-500 to-orange-500 dark:from-yellow-300 dark:via-amber-500 dark:to-orange-600",
    actionPlan: [
      "Identify and refactor severe bottlenecks in your deployment pipelines.",
      "Begin transitioning legacy monolith components to microservices.",
      "Implement automated testing to prevent further tech debt accumulation."
    ]
  },
  ready: {
    title: "AI Ready",
    subtitle: "INNOVATION LEADER",
    status: "ยินดีด้วย! องค์กรของคุณมีโครงสร้างพื้นฐานด้านข้อมูลที่แข็งแกร่งมาก ข้อมูลสะอาด รวมศูนย์ และระบบพร้อมต่อการขยายตัว (Scalable)",
    action: "คุณพร้อมเต็มที่สำหรับการนำ GenAI ขั้นสูงมาใช้เพื่อสร้างความได้เปรียบทางธุรกิจ (Competitive Advantage) และสามารถสเกลเทคโนโลยีได้อย่างไร้รอยต่อ",
    color: "neon-cyan",
    glowClass: "glow-cyan",
    titleGradient: "from-cyan-400 via-blue-500 to-indigo-500 dark:from-cyan-300 dark:via-blue-500 dark:to-indigo-500",
    actionPlan: [
      "Explore advanced AI/GenAI integrations to accelerate business workflows.",
      "Optimize cloud resource allocation for maximum cost efficiency.",
      "Focus on continuous innovation and scaling enterprise capabilities."
    ]
  }
};
