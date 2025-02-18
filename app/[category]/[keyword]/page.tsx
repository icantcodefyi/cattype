import { Suspense } from "react"
import type { Metadata, Viewport } from "next"
import { MainContent } from "@/components/main-content"
import { codeSnippets } from "@/lib/code-snippets"

export async function generateStaticParams() {
  const paths: { category: string; keyword: string }[] = []

  // Get all unique categories and their keywords
  const categoryKeywords = new Map<string, Set<string>>()

  codeSnippets.forEach((snippet) => {
    const category = snippet.category.toLowerCase().replace(/\s+/g, "-")
    if (!categoryKeywords.has(category)) {
      categoryKeywords.set(category, new Set())
    }

    snippet.keywords.forEach((keyword) => {
      categoryKeywords.get(category)?.add(keyword.toLowerCase().replace(/\s+/g, "-"))
    })
  })

  // Generate paths for each category and keyword combination
  categoryKeywords.forEach((keywords, category) => {
    keywords.forEach((keyword) => {
      paths.push({
        category,
        keyword,
      })
    })
  })

  return paths
}

interface PageParams {
  category: string
  keyword: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { category, keyword } = await params
  const formattedKeyword = keyword.replace(/-/g, " ")
  const formattedCategory = category.replace(/-/g, " ")

  return {
    title: `${formattedKeyword} Typing Test | cattype`,
    description: `Practice typing ${formattedKeyword} code snippets. Improve your ${formattedCategory} typing speed and accuracy with our minimalist developer typing test.`,
    keywords: [
      formattedKeyword,
      formattedCategory,
      "typing test",
      "developer tools",
      "coding practice",
      "speed typing",
      "programming",
    ],
    openGraph: {
      title: `${formattedKeyword} Typing Test | cattype`,
      description: `Practice typing ${formattedKeyword} code snippets. Improve your ${formattedCategory} typing speed and accuracy with our minimalist developer typing test.`,
    },
    twitter: {
      title: `${formattedKeyword} Typing Test | cattype`,
      description: `Practice typing ${formattedKeyword} code snippets. Improve your ${formattedCategory} typing speed and accuracy with our minimalist developer typing test.`,
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function Page({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { category, keyword } = await params
  return (
    <Suspense>
      <MainContent category={category} keyword={keyword} />
    </Suspense>
  )
}
