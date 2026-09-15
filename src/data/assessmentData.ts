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
    description: "พนักงานในองค์กรของคุณสามารถเข้าถึงและนำข้อมูลไปใช้งานได้ราบรื่นแค่ไหน?",
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
        thaiDescription: "ย้ายบางระบบขึ้น Cloud แล้ว แต่ยังจัดการทรัพยากรระบบเก่าและใหม่ร่วมกันได้ไม่ค่อยดี"
      },
      {
        score: 5,
        label: "Modern Hybrid Cloud:",
        description: "Scalable infrastructure capable of supporting 1,000+ users seamlessly with high availability.",
        thaiDescription: "ระบบถูกออกแบบมาให้ขยายตัวได้ทันที รองรับผู้ใช้งานหลักพันคนได้อย่างราบรื่นและระบบไม่ล่ม"
      }
    ]
  },
  {
    id: 3,
    shortTitle: "Security",
    title: "Tech Obsolescence & Maintenance",
    description: "ระบบซอฟต์แวร์ที่ใช้อยู่มีความทันสมัยและง่ายต่อการดูแลรักษามากน้อยแค่ไหน?",
    choices: [
      {
        score: 1,
        label: "Legacy Trapped:",
        description: "Systems are over 7-10 years old; high maintenance cost; vendors no longer support upgrades.",
        thaiDescription: "ระบบเก่าเกิน 7 ปีขึ้นไป ต้องเสียค่าบำรุงรักษาแพงมาก และไม่สามารถอัปเกรดซอฟต์แวร์ได้แล้ว"
      },
      {
        score: 3,
        label: "Fragmented Stack:",
        description: "A mix of old software patched with new tools; requires constant IT troubleshooting.",
        thaiDescription: "ระบบเก่าและใหม่ปะปนกัน ทำให้มักมีปัญหาจุกจิกและฝ่ายไอทีต้องคอยตามแก้ตลอดเวลา"
      },
      {
        score: 5,
        label: "Future-Proof Stack:",
        description: "Systems align with global tech standards (Gartner); easily upgradeable via APIs.",
        thaiDescription: "ระบบทันสมัย ได้มาตรฐานสากล และสามารถเชื่อมต่อเทคโนโลยีใหม่ๆ เพิ่มเข้าไปได้ง่ายมาก"
      }
    ]
  },
  {
    id: 4,
    shortTitle: "Agility",
    title: "Core Industry Connectivity",
    description: "ระบบงานส่วนหน้าและระบบหลังบ้านของคุณมีการเชื่อมต่อและแลกเปลี่ยนข้อมูลกันอย่างไร?",
    choices: [
      {
        score: 1,
        label: "Disconnected Operations:",
        description: "Front-office (CRM/Sales) and Shop-floor (MES/Production) do not talk to each other.",
        thaiDescription: "ระบบแต่ละแผนกทำงานแยกกัน เช่น ข้อมูลหน้าร้านกับข้อมูลหลังบ้านไม่เชื่อมต่อกัน"
      },
      {
        score: 3,
        label: "Batch Synced:",
        description: "Systems sync via nightly batch updates; management cannot see real-time performance.",
        thaiDescription: "ระบบเชื่อมต่อกันเป็นรอบๆ (เช่น อัปเดตตอนสิ้นวัน) ทำให้ผู้บริหารไม่เห็นข้อมูลที่อัปเดตแบบวินาทีต่อวินาที"
      },
      {
        score: 5,
        label: "Real-Time Synergy:",
        description: "Full end-to-end data pipeline connecting IoT, MES, and ERP for automated insights.",
        thaiDescription: "ทุกระบบเชื่อมโยงข้อมูลถึงกันแบบอัตโนมัติ ทำให้ผู้บริหารเห็นภาพรวมของธุรกิจได้แบบเรียลไทม์"
      }
    ]
  },
  {
    id: 5,
    shortTitle: "AI Readiness",
    title: "Cyber Security & Governance",
    description: "องค์กรของคุณมีมาตรการรักษาความปลอดภัยของข้อมูลและแผนรับมือความเสี่ยงที่เข้มงวดระดับไหน?",
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
    titleGradient: "from-rose-400 via-red-500 to-red-600 dark:from-red-300 dark:via-rose-500 dark:to-red-700"
  },
  moderate: {
    title: "Moderate Tech Debt",
    subtitle: "THE TRANSITION ZONE",
    status: "องค์กรมีความพร้อมในระดับกลาง มีการนำดิจิทัลมาใช้บ้างแล้ว แต่ระบบต่างๆ ยังไม่เชื่อมต่อกัน (Data Silos) และโครงสร้างยังไม่ยืดหยุ่นพอที่จะโตแบบก้าวกระโดด",
    action: "ควรเน้นวางรากฐานรวมข้อมูลไว้ที่ศูนย์กลาง (Data Lakehouse) เพื่อให้ระบบเชื่อมโยงถึงกันแบบเรียลไทม์ และสามารถเริ่มทดลองนำ AI มาใช้ในงานสเกลเล็กๆ ได้แล้ว",
    color: "neon-yellow",
    glowClass: "glow-yellow",
    titleGradient: "from-yellow-400 via-amber-500 to-orange-500 dark:from-amber-200 dark:via-yellow-400 dark:to-orange-500"
  },
  ready: {
    title: "AI-Ready Infrastructure",
    subtitle: "STRATEGIC ADVANTAGE",
    status: "องค์กรมีรากฐานไอทีที่แข็งแกร่งมาก ระบบมีความยืดหยุ่น ปลอดภัยสูง และข้อมูลทั้งหมดพร้อมนำไปต่อยอดได้ทันที",
    action: "พร้อมลุยเต็มที่สำหรับการทำ Enterprise AI Transformation องค์กรสามารถลงทุนพัฒนาระบบ AI เพื่อสร้างความได้เปรียบทางธุรกิจในระยะยาวได้เลย",
    color: "neon-cyan",
    glowClass: "glow-cyan",
    titleGradient: "from-cyan-300 via-teal-400 to-blue-500 dark:from-cyan-200 dark:via-cyan-400 dark:to-blue-600"
  }
};
