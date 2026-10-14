import { IconType } from "react-icons"

interface ContactInfoCardProps {
  icon: IconType
  title: string
  children: React.ReactNode
}

export default function ContactInfoCard({
  icon: Icon,
  title,
  children,
}: ContactInfoCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
          <Icon className="h-5 w-5"  />
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">
            {title}
          </h3>

          <div className="mt-1 text-sm leading-6 text-gray-500">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}