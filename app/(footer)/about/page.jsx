// pages/about.js
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
<div>
    <div className="pt-16 mt-28">
      {/* Introduction Section */}
      <section className="text-center mb-20">
        <h1 className="text-4xl font-bold mb-4">About Smart<span className="text-orange-400">Spend</span></h1>
        <p className="text-lg text-gray-700">
          Monitor your spending, reduce unnecessary expenses, and leverage AI-powered insights to keep your finances in check.
        </p>
      </section>
</div>
      {/* our goal */}
      <section className="text-center pt-5  "><h2 className="text-lg px-30 pt-20 pb-20 text-center "
       style={{ backgroundColor: "#fffff0"  }}>Our goal is to revolutionize the way
         you manage your money—effortlessly,
         intelligently, and stress-free. With SmartSpend, we break down financial barriers and
          empower you to take full control of your spending, helping you save more and live better.
           Whether you're a student balancing your budget, a professional optimizing expenses, or an 
           entrepreneur striving for financial success, our AI-driven insights guide you every step of
           the way. Smart spending starts here. Take charge, make smarter decisions, and build a future where
           financial stability is within reach!This version makes your mission feel more dynamic and empowering.
            Let me know if you’d like any further tweaks!</h2></section>

      {/* Our Story */}
{/* Our Story Section with Separate Text and Image */}
<div className="w-full grid grid-cols-1 md:grid-cols-2 ">
  
  {/* Left Side - Text with Light Blue Background */}
  <div className="bg-[#5FA8D3] pl-5 py-16 flex items-center">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        SmartSpend was born out of a personal challenge. My mom’s constant reminders for my overspending made me realize that I was never truly aware of where my money was going. That frustration sparked the idea for SmartSpend—a tool designed to help you track every expense, so you can make smarter decisions with your money.
      </p>
      <p className="text-gray-700 leading-relaxed">
        Every month, our AI-powered system sends you a detailed report summarizing your total income, expenses, and net balance. It even breaks down your expenses by category and offers actionable insights. If your spending reaches or exceeds 80% of your monthly budget, you’ll receive an alert via email, keeping you on track.
      </p>
    </div>
  </div>

  {/* Right Side - Image Only */}
  <div className="flex ">
    <Image 
      src="/scenary.png" 
      alt="SmartSpend Story" 
      width={700} 
      height={400} 
      className=" shadow-lg"
    />
  </div>

</div>

<section className="text-center bg-blue-50  pb-20">
    
  <div className="pt-20 text-center px-15" >

  <h1 className="text-2xl text-gray-400">Today, we’re proud to support thousands of individuals, students, and business owners 
    in shaping a smarter financial future—one decision at a time.</h1>
  </div>
  <div className="pt-10 text-center px-15">
    <h1 className="text-2xl text-gray-600">
At SmartSpend, we believe financial awareness should be effortless, accessible, and empowering. 
Whether you're tracking daily expenses, planning for long-term savings, or optimizing your business
 spending, our AI-driven insights make money management seamless.</h1>
  </div>
  <div className="pt-10 text-center px-15">
 <h1 className="text-2xl ">
Every transaction you make contributes to something bigger: a financially confident, stress-free future.
We’re here to guide you every step of the way. Let’s make every dollar work for you! 
</h1>

  </div>
</section>

      {/* Key Features */}
      <section className="mb-16 pt-20 px-10">
        <h2 className="text-3xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc pl-8 text-gray-600 space-y-2">
          <li className="text-lg">
            <strong>Expense Monitoring:</strong> Precisely track where your money is spent.
          </li>
          <li>
            <strong>Recurring Transactions:</strong> Set transactions like monthly rent to be automatically updated, keeping your data accurate.
          </li>
          <li>
            <strong>Monthly Reports & Alerts:</strong> Receive detailed monthly reports and timely alerts if you approach or exceed 80% of your budget.
          </li>
          <li>
            <strong>AI Insights:</strong> Benefit from AI-driven recommendations and insights to optimize your financial habits.
          </li>
        </ul>
      </section>

      {/* About the Creator */}
      <div className="bg-blue-50 px-10 mt-20 pt-20">

      <section >
        <h2 className="text-3xl font-semibold mb-6">About the Creator</h2>
        <p className="text-gray-600 text-center pb-20 leading-relaxed  px-20">
          Hi, I'm Ranjeet. I'm currently pursuing a degree in Artificial Intelligence and Data Science at Sri Krishna College of Technology (3rd year). My personal experience with overspending—and the gentle, yet firm, advice from my mom—motivated me to create SmartSpend. I believe that by gaining clear insights into our spending habits, we can take control of our finances and improve our overall quality of life.
        </p>
        {/* Optional: add your profile picture
        <div className="flex justify-center">
        <Image
        src="/profile.jpg"
        alt="Ranjeet's Photo"
        width={150}
        height={150}
        className="rounded-full"
        />
        </div>
        */}
      </section>
        </div>
     

      {/* Call-to-Action */}
      <div className="bg-gray-200">

      <section className="px-10 pb-30 pt-30 text-center">
        <p className="text-lg text-gray-700 mb-4">Ready to take charge of your finances?</p>
        <Link
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition duration-300 inline-block"
          >
          Get Started Today
        </Link>
      </section>
            </div>
   
        <Footer/>
     
    </div>

  );
}