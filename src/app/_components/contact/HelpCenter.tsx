import { CircleHelp, ArrowRight } from "lucide-react"

export default function HelpCenter() {
  return (
    <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
      <div className="flex items-start gap-4">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm">
          <CircleHelp className="h-5 w-5" />
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">
            Looking for quick answers?
          </h3>

          <p className="mt-1 text-sm leading-6 text-gray-600">
            Check out our Help Center for frequently asked
            questions about orders, shipping, returns, and more.
          </p>

          <button className="mt-4 flex items-center gap-1 text-sm font-medium text-green-600">
            Visit Help Center
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  )
}