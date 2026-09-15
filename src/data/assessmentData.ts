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
}

export const assessmentData: AssessmentMetric[] = [
  {
    id: 1,
    shortTitle: "Foundation",
    title: "Data Accessibility & Integration",
    description: "การเข้าถึงและการเชื่อมโยงข้อมูล",
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
    description: "ความยืดหยุ่นและการใช้งาน Cloud",
    choices: [
      {
        score: 1,
        label: "On-Premise Heavy:",
        description: "Critical business systems run entirely on legacy local servers; high risk of downtime.",
        thaiDescription: "ระบบธุรกิจที่สำคัญทำงานบนเซิร์ฟเวอร์แบบเดิมทั้งหมด มีความเสี่ยงสูงที่ระบบจะล่ม"
      },
      {
        score: 3,
        label: "Cloud Infrastructure:",
        description: "Shipped some workloads to Public Cloud, but lack a clear Hybrid Cloud strategy for large volumes.",
        thaiDescription: "ย้ายบางระบบไปใช้ Public Cloud แต่ยังขาดกลยุทธ์ Hybrid Cloud ที่ชัดเจนสำหรับปริมาณงานมาก"
      },
      {
        score: 5,
        label: "Modern Hybrid Cloud:",
        description: "Scalable infrastructure capable of supporting 1,000+ users seamlessly with high availability.",
        thaiDescription: "โครงสร้างพื้นฐานที่ขยายตัวได้ รองรับผู้ใช้มากกว่า 1,000 คนได้อย่างราบรื่นและมีความพร้อมใช้งานสูง"
      }
    ]
  },
  {
    id: 3,
    shortTitle: "Security",
    title: "Tech Obsolescence & Maintenance",
    description: "ความล้าสมัยและค่าดูแลรักษาระบบ",
    choices: [
      {
        score: 1,
        label: "Legacy Trapped:",
        description: "Systems are over 7-10 years old; high maintenance cost; vendors no longer support upgrades.",
        thaiDescription: "ระบบมีอายุ 7-10 ปี ค่าดูแลรักษาสูง และผู้ขายไม่สนับสนุนการอัปเกรดแล้ว"
      },
      {
        score: 3,
        label: "Fragmented Stack:",
        description: "A mix of old software patched with new tools; requires constant IT troubleshooting.",
        thaiDescription: "ซอฟต์แวร์เก่าผสมกับเครื่องมือใหม่ ต้องให้ฝ่ายไอทีคอยแก้ปัญหาตลอดเวลา"
      },
      {
        score: 5,
        label: "Future-Proof Stack:",
        description: "Systems align with global tech standards (Gartner); easily upgradeable via APIs.",
        thaiDescription: "ระบบสอดคล้องกับมาตรฐานเทคโนโลยีระดับโลก (Gartner) และอัปเกรดได้ง่ายผ่าน API"
      }
    ]
  },
  {
    id: 4,
    shortTitle: "Agility",
    title: "Core Industry Connectivity",
    description: "การเชื่อมต่อระบบงานหลัก - Manufacturing Focus",
    choices: [
      {
        score: 1,
        label: "Disconnected Operations:",
        description: "Front-office (CRM/Sales) and Shop-floor (MES/Production) do not talk to each other.",
        thaiDescription: "ระบบส่วนหน้า (CRM/Sales) และส่วนการผลิต (MES/Production) ไม่มีการเชื่อมโยงกัน"
      },
      {
        score: 3,
        label: "Batch Synced:",
        description: "Systems sync via nightly batch updates; management cannot see real-time performance.",
        thaiDescription: "ระบบซิงค์ข้อมูลผ่าน Batch กลางคืน ผู้บริหารไม่สามารถดูประสิทธิภาพแบบเรียลไทม์ได้"
      },
      {
        score: 5,
        label: "Real-Time Synergy:",
        description: "Full end-to-end data pipeline connecting IoT, MES, and ERP for automated insights.",
        thaiDescription: "ระบบท่อข้อมูลเชื่อมต่อ IoT, MES และ ERP แบบครบวงจรเพื่อรับข้อมูลเชิงลึกแบบอัตโนมัติ"
      }
    ]
  },
  {
    id: 5,
    shortTitle: "AI Readiness",
    title: "Cyber Security & Governance",
    description: "ความปลอดภัยทางไซเบอร์และการกำกับดูแล",
    choices: [
      {
        score: 1,
        label: "Reactive / Paper-based:",
        description: "No strict digital access controls; no data governance policy; high risk of a security breach.",
        thaiDescription: "ไม่มีการควบคุมการเข้าถึงแบบดิจิทัลที่เข้มงวด ไม่มีการกำกับดูแลข้อมูล เสี่ยงต่อการถูกแฮ็ก"
      },
      {
        score: 3,
        label: "Basic Compliance:",
        description: "Have firewalls and anti-virus, but lack an executive-led business continuity and recovery plan.",
        thaiDescription: "มีไฟร์วอลล์และแอนตี้ไวรัส แต่ขาดแผนความต่อเนื่องทางธุรกิจและการกู้คืนระบบที่นำโดยผู้บริหาร"
      },
      {
        score: 5,
        label: "Proactive Resilience:",
        description: "Zero-Trust architecture, automated monitoring, and active board-level risk management.",
        thaiDescription: "สถาปัตยกรรม Zero-Trust การตรวจสอบอัตโนมัติ และการจัดการความเสี่ยงเชิงรุกระดับผู้บริหาร"
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
    status: "องค์กรติดหนี้ทางเทคโนโลยีขั้นวิกฤต ระบบไอทีปัจจุบันเป็น \"ภาระ\" มากกว่า \"สินทรัพย์\" ข้อมูลกระจัดกระจายและระบบล้าสมัย",
    action: "ห้ามลงทุนในระบบ AI ขั้นสูงเด็ดขาดเพราะจะล้มเหลว ควรมุ่งเน้นไปที่โครงการ \"Data Modernization\" และ \"Core System Upgrade\" เป็นอันดับแรก",
    color: "neon-red",
    glowClass: "glow-red"
  },
  moderate: {
    title: "Moderate Tech Debt",
    subtitle: "THE TRANSITION ZONE",
    status: "องค์กรมีความพร้อมระดับหนึ่ง มีการใช้ระบบดิจิทัลแล้ว แต่ยังขาดการเชื่อมโยงที่เป็นหนึ่งเดียว (Data Silos) และระบบยังไม่ยืดหยุ่นพอที่จะโตแบบก้าวกระโดด",
    action: "ควรมุ่งเน้นการวางกลยุทธ์ \"Hybrid Cloud & Data Lakehouse\" เพื่อทลาย Silo ของข้อมูล และเริ่มทำระบบเชื่อมต่อแบบ Real-time สามารถเริ่มทำ AI Prototype (PoC) เล็ก ๆ ในบางแผนกได้",
    color: "neon-yellow",
    glowClass: "glow-yellow"
  },
  ready: {
    title: "AI-Ready Infrastructure",
    subtitle: "STRATEGIC ADVANTAGE",
    status: "Strong IT foundation. Systems are secure, scalable, and data is ready.\n\nองค์กรมีรากฐานไอทีที่แข็งแกร่ง ระบบมีความปลอดภัย ยืดหยุ่น และข้อมูลพร้อมใช้งาน",
    action: "Ready for 'Enterprise AI Transformation'. Invest in GenAI or Agentic AI for long-term strategic advantage.\n\nพร้อมแล้วสำหรับ Enterprise AI Transformation สามารถลงทุนในระบบ AI เพื่อสร้างความได้เปรียบทางธุรกิจระยะยาว",
    color: "neon-cyan",
    glowClass: "glow-cyan"
  }
};
