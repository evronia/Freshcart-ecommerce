"use client"

import {
  Headphones,
  Send,
  ChevronDown,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ContactForm() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">

      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
          <Headphones className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Send us a Message
          </h2>

          <p className="text-sm text-gray-500">
            Fill out the form and we'll get back to you
          </p>
        </div>
      </div>


      <div className="grid gap-6 md:grid-cols-2">

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">
            Full Name
          </label>

          <Input
            placeholder="John Doe"
            className="h-14 rounded-xl"
          />
        </div>


        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">
            Email Address
          </label>

          <Input
            type="email"
            placeholder="john@example.com"
            className="h-14 rounded-xl"
          />
        </div>

      </div>


      <div className="mt-6 space-y-2">
        <label className="text-sm font-medium text-gray-900">
          Subject
        </label>

        <Select>
          <SelectTrigger className="h-14 rounded-xl">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="order">
              Order Support
            </SelectItem>

            <SelectItem value="shipping">
              Shipping
            </SelectItem>

            <SelectItem value="returns">
              Returns
            </SelectItem>

            <SelectItem value="payment">
              Payment
            </SelectItem>

            <SelectItem value="other">
              Other
            </SelectItem>
          </SelectContent>
        </Select>
      </div>


      <div className="mt-6 space-y-2">
        <label className="text-sm font-medium text-gray-900">
          Message
        </label>

        <Textarea
          placeholder="How can we help you?"
          className="min-h-40 resize-none rounded-xl"
        />
      </div>


      <Button
        className="mt-7 h-14 rounded-xl bg-green-600 px-8 text-base font-semibold hover:bg-green-700"
      >
        <Send className="mr-2 h-5 w-5" />
        Send Message
      </Button>

    </div>
  )
}