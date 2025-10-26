import { Link } from "react-router-dom";

const Footer = () => {
  const contactInfo = [
    { icon: "ri-map-pin-2-fill", text: "Hazaribag, Dhaka, Bangladesh" },
    { icon: "ri-mail-fill", text: "support@nazr.com" },
    { icon: "ri-phone-fill", text: "+8801705776033" },
  ];

  const companyLinks = ["Home", "About Us", "Work With Us", "Terms & Conditions"];
  
  const usefulLinks = [
    { name: "Facebook", url: "https://www.facebook.com/nazrPanjabi" },
    { name: "Instagram", url: "https://www.instagram.com/nazr_bd" },
    { name: "Messenger", url: "https://m.me/nazrPanjabi" },
    { name: "WhatsApp", url: "https://wa.me/01705776033" }, // Add your business number at the end
  ];

  return (
    <>
      {/* Main Footer Section */}
      <footer className="text-black py-14 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand & Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">Nazr</h2>
            <p className="text-gray-600">Your one-stop shop for premium fashion and accessories.</p>
            <div className="mt-4 space-y-2">
              {contactInfo.map((item, index) => (
                <p key={index} className="flex items-center gap-3 text-gray-600">
                  <i className={`${item.icon} text-lg text-primary`}></i> {item.text}
                </p>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link to="/" className="text-gray-600 hover:text-red-400 transition duration-300">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2">
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-red-300 transition duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-600 mb-3">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex items-center bg-gray-800 p-2 rounded-lg">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent text-white outline-none pl-3 py-2 flex-1"
              />
              <button className="bg-primary px-4 py-2 text-white font-semibold rounded-lg hover:bg-opacity-90 transition">
                Subscribe
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Footer Bottom Bar */}
      <div className="bg-gray-800 text-gray-400 text-center py-4">
        © 2025 <span className='text-2xl text-red-600'>A</span><span>RTZII</span>. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
