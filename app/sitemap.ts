import { MetadataRoute } from 'next';
import { codeSnippets } from '@/lib/code-snippets';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.cattype.live';

  // Get all unique categories and their keywords
  const categoryKeywords = new Map<string, Set<string>>();
  
  codeSnippets.forEach((snippet) => {
    const category = snippet.category.toLowerCase().replace(/\s+/g, '-');
    if (!categoryKeywords.has(category)) {
      categoryKeywords.set(category, new Set());
    }
    
    snippet.keywords.forEach((keyword) => {
      categoryKeywords.get(category)?.add(keyword.toLowerCase().replace(/\s+/g, '-'));
    });
  });

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // Add routes for each category and keyword combination
  categoryKeywords.forEach((keywords, category) => {
    keywords.forEach((keyword) => {
      routes.push({
        url: `${baseUrl}/${category}/${keyword}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  return routes;
} 