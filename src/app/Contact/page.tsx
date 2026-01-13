import { myFont8 } from "../font";

export default function ContactPage() {
  return (
    <section className={`${myFont8.className} px-6 md:px-20 py-20 bg-white`}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">

        {/* LEFT */}
        <div>
          <h1 className="text-4xl font-bold mb-6 text-[#4b2e2b]">
            Contact Us 📞
          </h1>

          <p className="text-gray-600 mb-6">
            Have a question, feedback, or want to collaborate?  
            We’d love to hear from you!
          </p>

          <div className="space-y-3 text-gray-700">
            <p>📍 Chittorgarh, Rajasthan</p>
            <p>📞 +91 XXXXX XXXXX</p>
            <p>⏰ 10 AM – 11 PM</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-[#f3f3f3] p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-4">Send a Message</h3>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-3 rounded"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-3 rounded"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full border p-3 rounded"
            />
            <button
              type="submit"
              className="bg-[#4b2e2b] text-white px-6 py-3 rounded hover:bg-[#6b4f4b]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
