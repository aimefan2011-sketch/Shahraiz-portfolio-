import { profile, experience, skillCategories, services, projects, certifications, achievements } from '@/lib/portfolio-data';

function getCurrentDateInfo() {
  const now = new Date();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
  const fullDate = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const time = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  });
  return { dayName, fullDate, time };
}

export function buildKnowledgeBase() {
  const { dayName, fullDate, time } = getCurrentDateInfo();

  return `
You are the AI Portfolio Assistant for ${profile.name}. You are a genuinely capable, knowledgeable assistant — not a narrow FAQ bot. You permanently know the following information about ${profile.name} and must answer questions about him accurately based on it. You can and should also answer general knowledge questions, complex reasoning questions, everyday life questions, math, writing help, explanations of any topic, current-date/time questions, and anything else a helpful, expert-level AI assistant would answer — exactly like a frontier AI assistant would, using your own broad knowledge and reasoning ability.

## CURRENT DATE & TIME
Today is ${dayName}, ${fullDate}. The current UTC time is approximately ${time}. Always use this as the accurate current date/day when asked "what day is it", "what's today's date", "what year is it", or anything time-relative (e.g. calculating someone's age, days until an event, etc.). Never guess or say you don't know the date — you have it above.

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

## CURRENT ROLES & COMPANIES
${profile.name} is an expert-level AI and Shopify specialist who currently holds these leadership roles:
- **Co-Founder of Loinx Digital Agency**
- **CEO of Shaflow Digital Agency**
These are in addition to his past internship experience and freelance/client project work listed below.

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
Live link: ${p.link ?? 'N/A'}
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

## HOW TO ANSWER
- For questions about ${profile.name} himself (bio, roles, companies, experience, skills, projects, certifications, services, contact): answer in the third person, using the information above accurately. Don't invent facts not listed here.
- For general knowledge, everyday life, complex reasoning, math, coding, writing, explanations, current date/time, or any other topic: answer helpfully and accurately using your own full knowledge and reasoning, just like a top-tier AI assistant would. Do not refuse or deflect these — they are exactly what you should help with.
- Be warm, professional, clear, and specific. Use markdown formatting (headers, bold, lists) where it improves readability.
- Never say you can only answer portfolio questions — you can answer anything, well.
`;
}

// Backwards-compatible export: a static snapshot for any code that imports
// `knowledgeBase` directly. Prefer `buildKnowledgeBase()` where possible so
// the date/time context stays accurate on every request.
export const knowledgeBase = buildKnowledgeBase();

export function getOfflineResponse(message: string): string {
  const lower = message.toLowerCase();

  if (
    lower.includes('what day') ||
    lower.includes('today') ||
    lower.includes('current date') ||
    lower.includes("what's the date") ||
    lower.includes('what is the date') ||
    lower.includes('what year')
  ) {
    const { dayName, fullDate } = getCurrentDateInfo();
    return `Today is **${dayName}, ${fullDate}**.`;
  }

  if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('reach')) {
    return `You can reach **${profile.name}** through:\n\n- **Phone:** ${profile.phone}\n- **Email:** ${profile.email}\n- **LinkedIn:** ${profile.linkedin}\n\n${profile.contactMessage}`;
  }

  if (
    lower.includes('co-founder') ||
    lower.includes('cofounder') ||
    lower.includes('founder') ||
    lower.includes('ceo') ||
    lower.includes('loinx') ||
    lower.includes('shaflow') ||
    lower.includes('company') ||
    lower.includes('companies')
  ) {
    return `${profile.name} is the **Co-Founder of Loinx Digital Agency** and the **CEO of Shaflow Digital Agency**, alongside his hands-on Shopify and AI project work.`;
  }

  if (lower.includes('experience') || lower.includes('work') || lower.includes('job') || lower.includes('intern')) {
    return `${profile.name} was an **${experience[0].role}** at **${experience[0].company}**.\n\nKey responsibilities included:\n${experience[0].responsibilities.map(r => `- ${r}`).join('\n')}\n\nHe is also currently **Co-Founder of Loinx Digital Agency** and **CEO of Shaflow Digital Agency**.`;
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
    return `**${profile.name}** is an **${profile.title}**, Co-Founder of **Loinx Digital Agency**, and CEO of **Shaflow Digital Agency**. He was previously ${profile.position.toLowerCase()} while ${profile.education.toLowerCase()}.\n\n${profile.bio[0]}`;
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
    return `Hello! I'm the AI assistant for **${profile.name}**'s portfolio. I can tell you about Shahraiz's experience, companies, skills, projects, certifications, services, and how to get in touch — and I can also help with general questions. What would you like to know?`;
  }

  return `I'm the AI assistant for **${profile.name}**'s portfolio. I can answer questions about:\n\n- **About** — who Shahraiz is\n- **Companies** — Loinx Digital Agency and Shaflow Digital Agency\n- **Experience** — internship and work\n- **Skills** — AI, Shopify, design, and more\n- **Projects** — case studies and results\n- **Certifications** — verified credentials\n- **Services** — what Shahraiz offers\n- **Contact** — how to reach out\n\nI can also help with general knowledge, everyday questions, and more — just ask!`;
}
