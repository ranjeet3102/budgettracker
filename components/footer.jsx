const Footer = () => (
  <footer className="bg-blue-50 text- py-12">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
      {/* About Section */}
      <div>
        <h2 className="text-xl font-semibold mb-3">About SmartSpend</h2>
        <p className=" text-sm">
          SmartSpend is an AI-powered financial assistant that empowers you to manage your money smartly with real-time insights. Our mission is to simplify budgeting so you can achieve financial freedom.
        </p>
        <a href="/about" className="text-orange-400 hover:underline text-sm mt-2 inline-block">
          Learn More →
        </a>
      </div>

      {/* Navigation Links */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
        <ul className="space-y-2  text-sm">
          <li>
            <a href="/about" className="hover:underline">
              About Us
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
          </li>
         
        </ul>
      </div>

      {/* Social & Contact */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Connect</h2>
        <ul className="space-y-2  text-sm">
          <li>
            <a href="https://twitter.com" className="hover:underline">
              Twitter
            </a>
          </li>
          <li>
            <a href="https://linkedin.com" className="hover:underline">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://github.com" className="hover:underline">
              GitHub
            </a>
          </li>
          {/* <li>
            <span>Email: support@smartspend.co</span>
          </li> */}
        </ul>
      </div>
    </div>
    <div className="container mx-auto text-center text-gray-600 mt-8 text-xs">
      © 2025 SmartSpend. All rights reserved.
    </div>
  </footer>
);

export default Footer;