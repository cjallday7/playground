//Page header with breadcrumbs

"use client"

import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Map route segments to display names
const routeLabels: Record<string, string> = {
  "": "Paddock",
  "races": "Race Central",
  "drivers": "Drivers",
  "constructors": "Constructors",
  "calendar": "Calendar",
}

export function Header() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  // Build breadcrumb items from path segments
  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    const isLast = index === segments.length - 1
    const label = routeLabels[segment] || decodeURIComponent(segment)

    return { href, label, isLast }
  })

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            {segments.length === 0 ? (
              <BreadcrumbPage>Paddock</BreadcrumbPage>
            ) : (
              <BreadcrumbLink href="/">Paddock</BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {breadcrumbs.map((crumb) => (
            <BreadcrumbItem key={crumb.href}>
              <BreadcrumbSeparator />
              {crumb.isLast ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}