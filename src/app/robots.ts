import type { MetadataRoute } from 'next'
import { absoluteUrl, site } from '@/config/site'

/**
 * Libera buscadores tradicionais e crawlers de IA (GEO): queremos que
 * ChatGPT, Claude, Perplexity, Gemini etc. conheçam e citem a marca.
 */
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'meta-externalagent',
  'Amazonbot',
  'DuckAssistBot',
  'MistralAI-User',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      { userAgent: aiCrawlers, allow: '/' },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: site.url,
  }
}
