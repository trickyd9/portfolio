// Sourced from References/David Trick Resume.md — Core Competencies + Technical Skills.
export const CORE_COMPETENCIES: string[] = [
  'UX Design',
  'Design Systems & Standards',
  'Persona-Driven Research',
  'CloudScape',
  'Figma & Figma Make',
  'React/TypeScript',
  'GraphQL',
  'AWS CDK',
];

export interface SkillCategory {
  category: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Design & UX',
    skills: [
      'Figma',
      'Figma Make',
      'CloudScape Design System',
      'Adobe Creative Suite (Illustrator, Photoshop, InDesign)',
      'Inkscape',
      'Design systems',
      'Prototyping',
      'Wireframing',
      'Accessibility (WCAG)',
      'Persona research',
      'Customer validation',
    ],
  },
  {
    category: 'Front-End',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SVG', 'D3.js', 'Component architecture', 'State management', 'Responsive design'],
  },
  {
    category: 'Back-End & Cloud',
    skills: ['GraphQL', 'Java', 'Python', 'AWS CDK', 'CloudFront', 'Route 53', 'ACM', 'S3', 'Lambda', 'REST APIs'],
  },
  {
    category: 'AI & Automation',
    skills: ['Kiro (AI-powered IDE)', 'Amazon Q', 'AI agent design', 'AI capabilities packaging', 'Workflow automation'],
  },
  {
    category: '3D / CAD',
    skills: ['SolidWorks', 'Revit', 'AutoCAD', '3D printing', 'Additive manufacturing', 'Technical drawing'],
  },
  {
    category: 'Industrial',
    skills: ['BMS', 'EPMS', 'SCADA', 'HMI', 'PLC', 'Ignition Systems'],
  },
];
