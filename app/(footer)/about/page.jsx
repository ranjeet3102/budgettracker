import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      <div className="pt-16 mt-28">
        <section className="text-center mb-20 px-4">
          <h1 className="text-4xl font-bold mb-4">
            About Smart<span className="text-orange-400">Spend</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Monitor your spending, reduce unnecessary expenses, and leverage AI-powered insights to keep your finances in check.
          </p>
        </section>
      </div>

      {/* Our Goal */}
      <section className="bg-yellow-50 px-4 py-12 text-center">
        <h2 className="text-xl text-gray-700 max-w-3xl mx-auto">
          Our goal is to revolutionize the way you manage your money—effortlessly, intelligently, and stress-free. With SmartSpend, we break down financial barriers and empower you to take full control of your spending, helping you save more and live better. Whether you're a student balancing your budget, a professional optimizing expenses, or an entrepreneur striving for financial success, our AI-driven insights guide you every step of the way. Smart spending starts here.
        </h2>
      </section>

      {/* Our Story */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Text */}
        <div className="bg-[#5FA8D3] text-white py-12 px-6 flex items-center">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold">Our Story</h2>
            <p className="leading-relaxed text-white">
              SmartSpend was born out of a personal challenge. My mom’s constant reminders for my overspending made me realize that I was never truly aware of where my money was going. That frustration sparked the idea for SmartSpend—a tool designed to help you track every expense, so you can make smarter decisions with your money.
            </p>
            <p className="leading-relaxed text-white">
              Every month, our AI-powered system sends you a detailed report summarizing your total income, expenses, and net balance. It even breaks down your expenses by category and offers actionable insights. If your spending reaches or exceeds 80% of your monthly budget, you’ll receive an alert via email, keeping you on track.
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="w-full h-full">
          <Image
            src="/scenary.png"
            alt="SmartSpend Story"
            width={700}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Mission Statement */}
      <section className="text-center bg-blue-50 px-4 py-16 space-y-10">
        <h2 className="text-2xl text-gray-500 max-w-3xl mx-auto">
          Today, we’re proud to support thousands of individuals, students, and business owners in shaping a smarter financial future—one decision at a time.
        </h2>
        <h2 className="text-2xl text-gray-700 max-w-3xl mx-auto">
          At SmartSpend, we believe financial awareness should be effortless, accessible, and empowering. Whether you're tracking daily expenses, planning for long-term savings, or optimizing your business spending, our AI-driven insights make money management seamless.
        </h2>
        <h2 className="text-2xl max-w-3xl mx-auto">
          Every transaction you make contributes to something bigger: a financially confident, stress-free future. We’re here to guide you every step of the way. Let’s make every dollar work for you!
        </h2>
      </section>

      {/* Key Features */}
      <section className="px-6 py-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">Key Features</h2>
        <ul className="list-disc pl-6 text-gray-600 max-w-3xl mx-auto space-y-3">
          <li>
            <strong>Expense Monitoring:</strong> Precisely track where your money is spent.
          </li>
          <li>
            <strong>Recurring Transactions:</strong> Set transactions like monthly rent to be automatically updated.
          </li>
          <li>
            <strong>Monthly Reports & Alerts:</strong> Receive detailed reports and budget alerts.
          </li>
          <li>
            <strong>AI Insights:</strong> Benefit from AI-driven recommendations and financial tips.
          </li>
        </ul>
      </section>

      {/* Creator Section */}
      <section className="bg-blue-50 px-6 pt-16 pb-10 text-center">
        <h2 className="text-3xl font-semibold mb-6">About the Creator</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Hi, I'm Ranjeet. I'm currently pursuing a degree in Artificial Intelligence and Data Science at Sri Krishna College of Technology (3rd year). My personal experience with overspending—and the gentle, yet firm, advice from my mom—motivated me to create SmartSpend. I believe that by gaining clear insights into our spending habits, we can take control of our finances and improve our overall quality of life.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-gray-100 text-center py-12 px-6">
        <p className="text-lg text-gray-700 mb-4">Ready to take charge of your finances?</p>
        <Link
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition duration-300 inline-block"
        >
          Get Started Today
        </Link>
      </section>

      <Footer />
    </div>
  );
}
