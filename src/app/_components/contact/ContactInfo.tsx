import {
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react"
import { FaFacebookF ,FaTwitter ,FaInstagram , FaLinkedin} from "react-icons/fa";

import ContactInfoCard from "./ContactInfoCard"

export default function ContactInfo() {
  return (
    <div className="space-y-6">

      <ContactInfoCard icon={Phone} title="Phone">
        <p>Mon-Fri from 8am to 6pm</p>
        <p className="mt-2">
          +1 (800) 123-4567
        </p>
      </ContactInfoCard>


      <ContactInfoCard icon={Mail} title="Email">
        <p>We'll respond within 24 hours</p>
        <p className="mt-2">
          support@freshcart.com
        </p>
      </ContactInfoCard>


      <ContactInfoCard icon={MapPin} title="Office">
        <p>
          123 Commerce Street
          <br />
          New York, NY 10001
          <br />
          United States
        </p>
      </ContactInfoCard>


      <ContactInfoCard icon={Clock} title="Business Hours">
        <p>
          Monday - Friday: 8am - 6pm
          <br />
          Saturday: 9am - 4pm
          <br />
          Sunday: Closed
        </p>
      </ContactInfoCard>


      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900">
          Follow Us
        </h3>

        <div className="mt-5 flex gap-3">
          {[FaFacebookF, FaTwitter, FaInstagram , FaLinkedin].map(
            (Icon, index) => (
              <div
                key={index}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-green-50 hover:text-green-600"
              >
                <Icon className="h-5 w-5" />
              </div>
            )
          )}
        </div>
      </div>

    </div>
  )
}