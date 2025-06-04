import HeroSection from "@/components/hero";
import { featuresData, howItWorksData, statsData, testimonialsData } from "@/data/landing";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";


export default function Home() {
  return (
  <div  className="mt-40">
<HeroSection/>
 

{/* <section className="py-20 bg-gray-100">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {statsData.map((statsData,index) => (
        <div key={index} className="text-center">
          <div className="text-4xl font-bold text-grey-100 mb-2">{statsData.value}</div>
          <div className="text-gray-700">{statsData.label}</div>
        </div>
      ))}
    </div>
  </div>
</section> */}
<section className="py-20 bg-gray-100 text-center">
  <p className="text-xl font-semibold text-gray-700">
    🎓 Over <span className="text-orange-500 font-bold">1,000 students</span> budget smarter with <span className="text-gray-900 font-bold">$martSpend</span>
  </p>
</section>

{/* <section className="py-20 bg-gray-100">
  <div className="container mx-auto flex flex-wrap justify-center items-center gap-8">
    <Image src="/gemini.svg" alt="Gemini" width={100} height={30} />
    <Image src="/clerk.svg" alt="Clerk" width={100} height={30} />
    <Image src="/nextdotjs.svg" alt="Next.js" width={100} height={30} />
    <Image src="/tailwindcss.svg" alt="Tailwind CSS" width={100} height={30} />
    <Image src="/prisma.svg" alt="Prisma" width={100} height={30} />
    <Image src="/shadcnui.svg" alt="shadcn/ui" width={100} height={30} />
 
  </div>
</section> */}



<section className="py-20 ">
<div className="container mx-auto px-4">
  <h1 className="text-3xl font-bold text-center mb-12">Everything you need to manage your finances</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {featuresData.map((feature, index) => (
      <Card key={index} className="p-6 ">
  <CardContent className="space-y-4 pt-4">
   {feature.icon}
   <h3 className="text-xl font-semibold">{feature.title}</h3>
   <p className="text-gray-600">{feature.description}</p>
  </CardContent>
      </Card>

    ))}
  </div>
</div>
  </section>

  <section className="py-20 bg-gray-100">
    <div className="container mx-auto px-4">
  <h1 className="text-3xl font-bold text-center mb-16">How It Works</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {howItWorksData.map((step, index) => (
      <div key={index} className="text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center 
        justify-center mx-auto mb-6">{step.icon}</div>
        <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
        <p className="text-gray-700">{step.description}</p>
        </div>

    ))}
  </div>
</div>

  </section>


  <section className="py-20 ">
<div className="container mx-auto px-4">
  <h1 className="text-3xl font-bold text-center mb-12">What Our Users Say</h1>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {testimonialsData.map((testimonial, index) => (
      <Card key={index} className="p-6 ">
        <CardContent className="space-y-4 pt-4">
          <div className="flex items-center mb-4">
       

           <div className="ml-4">
            <div className="font-semibold">{testimonial.name}</div>
            <div className="text-sm text-gray-600">{testimonial.role}</div>
           </div>
          </div>
          <p>{testimonial.quote}</p>
        </CardContent>
      </Card>

    ))}
  </div>
</div>
  </section>


  {/* <section className="py-20 bg-gray-500">
<div className="container mx-auto px-4 text-center">
  <h2 className="text-3xl text-white font-bold text-center mb-4">Ready to Take Control of Your Finances?</h2>
<p className="text-white mb-8 max-w-2xl mx-auto"> Thousands are transforming their financial 
  future—why not you? Start managing your money smarter with 'Budget' now!</p>
  <Link href="/dashboard">
  <Button size="lg"
  className="bg-white text-gray-900 hover:bg-gray-400 animate-bounce">
    Start Free Trial
    </Button></Link>
</div>

  </section> */}
  

  <div>

    <Footer/>
</div>
    </div>
    );
}
