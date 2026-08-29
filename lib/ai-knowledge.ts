import { profile, experience, skillCategories, services, projects, certifications, achievements } from '@/lib/portfolio-data';

export const knowledgeBase = `
You are the AI Portfolio Assistant for ${profile.name}. You permanently know the following information and must answer questions based on it. Be professional, concise, and helpful.

## PROFILE
- Name: ${profile.name}
- Title: ${profile.title}
- Tagline: ${profile.tagline}
- Education: ${profile.education}
- Current Position: ${profile.position}
- Location: ${profile.location}
- Phone: ${profile.phone}
- Email: ${profile.email}
- LinkedIn: ${profile.linkedin}

## BIO
${profile.bio.join(' ')}

## EXPERIENCE
${experience.map(exp => `
Role: ${exp.role} at ${exp.company} (${exp.period})
Summary: ${exp.summary}
Responsibilities: ${exp.responsibilities.join(', ')}
`).join('\n')}

## SKILLS
${skillCategories.map(cat => `${cat.name}: ${cat.skills.map(s => s.name).join(', ')}`).join('\n')}

## PROJECTS
${projects.map(p => `
Title: ${p.title}
Category: ${p.category}
Description: ${p.description}
Problem: ${p.problem}
Solution: ${p.solution}
Challenges: ${p.challenges}
Results: ${p.results}
Technologies: ${p.technologies.join(', ')}
`).join('\n')}

## CERTIFICATIONS
${certifications.map(c => `${c.title} — ${c.issuer} (${c.year}). ${c.description}`).join('\n')}

## ACHIEVEMENTS
${achievements.map(a => `${a.title}: ${a.description}`).join('\n')}

## SERVICES
${services.map(s => `${s.title}: ${s.description} (Features: ${s.features.join(', ')})`).join('\n')}

## CONTACT
Phone: ${profile.phone}
Email: ${profile.email}
LinkedIn: ${profile.linkedin}
Message: ${profile.contactMessage}

When answering:
- Always refer to Shahraiz in the third person.
- If asked about something not in the knowledge base and Gemini is not available, politely say you can only answer questions about Shahraiz's portfolio.
- Be warm, professional, and specific.
`;

export function getOfflineResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('reach')) {
    return `You can reach **${profile.name}** through:\n\n- **Phone:** ${profile.phone}\n- **Email:** ${profile.email}\n- **LinkedIn:** ${profile.linkedin}\n\n${profile.contactMessage}`;
  }

  if (lower.includes('experience') || lower.includes('work') || lower.includes('job') || lower.includes('intern')) {
    return `${profile.name} was an **${experience[0].role}** at **${experience[0].company}**.\n\nKey responsibilities included:\n${experience[0].responsibilities.map(r => `- ${r}`).join('\n')}`;
  }

  if (lower.includes('skill') || lower.includes('tool') || lower.includes('tech')) {
    return `${profile.name} is skilled across multiple domains:\n\n${skillCategories.map(c => `- **${c.name}:** ${c.skills.map(s => s.name).join(', ')}`).join('\n')}`;
  }

  if (lower.includes('project') || lower.includes('portfolio')) {
    return `Here are ${profile.name}'s key projects:\n\n${projects.map(p => `- **${p.title}** (${p.category}): ${p.description}`).join('\n')}`;
  }

  if (lower.includes('service') || lower.includes('offer') || lower.includes('help')) {
    return `${profile.name} offers ${services.length} services:\n\n${services.map(s => `- **${s.title}:** ${s.description}`).join('\n')}`;
  }

  if (lower.includes('certif') || lower.includes('credential')) {
    return `${profile.name}'s certifications:\n\n${certifications.map(c => `- **${c.title}** — ${c.issuer} (${c.year}): ${c.description}`).join('\n')}`;
  }

  if (lower.includes('achievement') || lower.includes('accomplish')) {
    return `Key achievements:\n\n${achievements.map(a => `- **${a.title}:** ${a.description}`).join('\n')}`;
  }

  if (lower.includes('about') || lower.includes('who') || lower.includes('bio')) {
    return `**${profile.name}** is an **${profile.title}** who was ${profile.position.toLowerCase()} while ${profile.education.toLowerCase()}.\n\n${profile.bio[0]}`;
  }

  if (lower.includes('education') || lower.includes('study') || lower.includes('level')) {
    return `${profile.name} is currently **${profile.education}**.`;
  }

  if (lower.includes('shopify')) {
    return `${profile.name} has extensive Shopify experience across multiple live stores — including icasiostore.pk (1,800+ products managed and theme customized solo), Dexpel, Shades by Shaista, Arabian Cart, Zyvora Shop, and AuraHive Shop. Work spans full theme customization, manual product uploads and cataloging, product description rewrites, and store UI improvements.`;
  }
  if (lower.includes('ai') || lower.includes('artificial') || lower.includes('prompt')) {
    return `${profile.name} specializes in AI and prompt engineering across ChatGPT, Google Gemini, Claude, Claude Code, Perplexity, and PicLumen — building AI workflows for content creation, website development, and commerce.`;
  }

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('salam')) {
    return `Hello! I'm the AI assistant for **${profile.name}**'s portfolio. I can tell you about Shahraiz's experience, skills, projects, certifications, services, and how to get in touch. What would you like to know?`;
  }

  return `I'm the AI assistant for **${profile.name}**'s portfolio. I can answer questions about:\n\n- **About** — who Shahraiz is\n- **Experience** — internship and work\n- **Skills** — AI, Shopify, design, and more\n- **Projects** — case studies and results\n- **Certifications** — verified credentials\n- **Services** — what Shahraiz offers\n- **Contact** — how to reach out\n\nWhat would you like to know?`;
}
