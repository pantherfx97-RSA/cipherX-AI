
export const BRAND_COLOR = '#00E5FF'; // Neon Blue
export const NEON_GREEN = '#39FF14'; 
export const NEON_PINK = '#FF007F';
export const NEON_PURPLE = '#BC13FE';
export const SECONDARY_COLOR = '#00B0FF'; // Deeper Neon Blue
export const ACCENT_COLOR = '#E0F7FA'; // Soft Light Blue

export const APP_NAME = "CipherX AI";
export const DEVELOPER_INFO = "CipherX AI was founded and created by South African software innovator Wally Nthani, with a mission to revolutionize intelligent conversational experiences.";

export const AVAILABLE_VOICES = [
  { id: 'Kore', name: 'Kore (Professional)', description: 'Balanced and clear' },
  { id: 'Zephyr', name: 'Zephyr (Smooth)', description: 'Natural and conversational' },
  { id: 'Puck', name: 'Puck (Cheerful)', description: 'Energetic and bright' },
  { id: 'Charon', name: 'Charon (Deep)', description: 'Commanding and authoritative' },
  { id: 'Fenrir', name: 'Fenrir (Vibrant)', description: 'Expressive and clear' }
];

export const PRICING = {
  MONTHLY: {
    price: 4.99,
    localPrice: "$4.99",
    url: "https://pay.yoco.com/r/mzDgrO",
    label: "Monthly Premium"
  },
  YEARLY: {
    price: 39.99,
    localPrice: "$39.99",
    url: "https://pay.yoco.com/r/7Xzk3G",
    label: "Yearly Premium",
    savings: "Save 35%"
  }
};

export const CONTACT_DETAILS = {
  business: "CipherX AI",
  email: "cipherxinc@gmail.com",
  phone: "+27 82 373 7887",
  address: "Halfway Trust Building No. 439, Kabokweni, 1245, South Africa"
};

export const SYSTEM_PROMPT = `You are CipherX AI, an advanced conversational intelligence.
${DEVELOPER_INFO}
Your persona: Intelligent, professional, concise, and helpful.
You help users with code, business plans, content creation, and general research.
Always prioritize clarity and accuracy.`;

export interface TaskField {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea';
}

export interface TaskTemplate {
  id: string;
  label: string;
  description: string;
  prompt: string;
  fields: TaskField[];
}

export const TASK_TEMPLATES: TaskTemplate[] = [
  { 
    id: 'cv', 
    label: 'CV Optimizer', 
    description: 'Transform your professional history into an ATS-optimized standout document.',
    prompt: 'Please help me rewrite my CV to be more professional and ATS-optimized. Focus on the target role and highlight my key skills appropriately.',
    fields: [
      { id: 'role', label: 'TARGET_ROLE', placeholder: 'e.g. Senior Software Engineer', type: 'text' },
      { id: 'experience', label: 'WORK_HISTORY', placeholder: 'Paste your current experience details here...', type: 'textarea' },
      { id: 'skills', label: 'CORE_COMPETENCIES', placeholder: 'List your top 5 technical skills...', type: 'text' }
    ]
  },
  { 
    id: 'business', 
    label: 'Business Architect', 
    description: 'Generate structured professional business plans for new ventures.',
    prompt: 'I need a professional business plan for a new startup. Provide a market overview, product description, and 12-month growth strategy.',
    fields: [
      { id: 'concept', label: 'BUSINESS_CONCEPT', placeholder: 'Describe your business idea...', type: 'text' },
      { id: 'market', label: 'TARGET_MARKET', placeholder: 'Who are your customers?', type: 'text' },
      { id: 'goals', label: 'PRIMARY_OBJECTIVES', placeholder: 'What are you trying to achieve in year one?', type: 'textarea' }
    ]
  },
  { 
    id: 'ad', 
    label: 'Marketing Strategy', 
    description: 'Create high-converting social media ad scripts.',
    prompt: 'Generate 3 high-converting social media ad scripts for the following product using direct response copywriting principles.',
    fields: [
      { id: 'product', label: 'PRODUCT_NAME', placeholder: 'What are we selling?', type: 'text' },
      { id: 'audience', label: 'AUDIENCE_PROFILE', placeholder: 'Describe the ideal buyer...', type: 'text' },
      { id: 'offer', label: 'THE_OFFER', placeholder: 'Is there a discount or special deal?', type: 'text' }
    ]
  },
  { 
    id: 'code', 
    label: 'Code Generator', 
    description: 'Convert requirements into clean, modular, and performant software components.',
    prompt: 'Act as a senior software engineer. Write clean, modular, and secure code based on these requirements. Include documentation.',
    fields: [
      { id: 'language', label: 'PROGRAMMING_LANGUAGE', placeholder: 'e.g. TypeScript, Python, Rust', type: 'text' },
      { id: 'requirements', label: 'FUNCTIONAL_REQS', placeholder: 'What should the code do?', type: 'textarea' },
      { id: 'constraints', label: 'SYSTEM_CONSTRAINTS', placeholder: 'Any specific libraries or performance needs?', type: 'text' }
    ]
  }
];
