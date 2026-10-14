import Link from 'next/link'


interface BreadcrumbProps {
  currentPage: string;
  currentCategory?: string;
}


export default function Breadcrumb({currentPage, currentCategory}: BreadcrumbProps) {
  return (
     <nav className="flex items-center gap-3 ">
      <Link href="/" className="text-slate-800">
        Home
      </Link>

      <span className="text-slate-800">/</span>

      <span className="text-slate-800">
        {currentPage}
      </span>
    </nav>
  ) 
}
