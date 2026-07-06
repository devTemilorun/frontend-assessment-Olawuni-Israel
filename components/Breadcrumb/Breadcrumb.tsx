'use client'

import Link from 'next/link'

interface BreadcrumbProps {
  items: { label: string; href: string; active?: boolean }[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-gray-400">/</span>}
          {item.active ? (
            <span className="text-gray-900 dark:text-white font-medium">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}