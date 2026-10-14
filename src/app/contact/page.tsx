import { FaHeadset } from "react-icons/fa";
import SectionHeader from "../_components/sectionHeader/SectionHeader";
import ContactForm from "../_components/contact/ContactForm";
import HelpCenter from "../_components/contact/HelpCenter";
import ContactInfo from "../_components/contact/ContactInfo";



export default function Contact() {
  return <>
  <SectionHeader title="Contact Us" bgColor="bg-linear-to-r from-green-600 via-green-500 to-green-400" Icon={FaHeadset} icons='icons' desc="We'd love to hear from you. Get in touch with our team."/>

  
    <main className="bg-gray-50 py-10 md:py-14">

      <div className="mx-auto max-w-7xl px-4">

        <div className="grid gap-6 lg:grid-cols-12">

          {/* Left */}
          <div className="lg:col-span-4">
            <ContactInfo /> 
              

          </div> 


          {/* Right */}
          <div className="space-y-6 lg:col-span-8">

            <ContactForm />

            <HelpCenter />

          </div>

        </div>

      </div>

    </main>
  
  </>
}


