import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="footer bg-white py-16 border-t border-gray-200">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-2">
              <img
                src="https://refexrenewables.com/img/logo.png"
                alt="Refex Renewables"
                className="h-auto w-full max-w-[150px] mb-6"
              />
            </div>

            <div className="lg:col-span-4">
              <h4 className="font-bold text-gray-900 mb-4 pb-2">
                Registered Office
              </h4>
              <p className="text-gray-700 mb-2">
                <div className="flex gap-2">
                <strong><i className="ri-map-pin-fill text-black"></i></strong>
                <div>
                <div className="mb-[16px]">
                <strong>
                  Refex Renewables & Infrastructure Limited
                  <br />
                  CIN: L40100TN1994PLC028263
                </strong>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                Second Floor, Refex Towers, Sterling Road Signal,
                <br />
                313, Valluvar Kottam High Road,
                <br />
                Nungambakkam, Chennai – 600034,
                <br />
                Tamil Nadu, India
                </p>
                </div>
                </div>
              </p>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-bold text-gray-900 mb-4 pb-2">Navigation</h4>
              <div className="space-y-2">
                <a
                  href="/about-us"
                  className="block text-gray-700 hover:text-orange-500 transition-colors"
                >
                  About Us
                </a>
                <a
                  href="/why-go-solar"
                  className="block text-gray-700 hover:text-orange-500 transition-colors"
                >
                  Why Go Solar
                </a>
                <a
                  href="/contact"
                  className="block text-gray-700 hover:text-orange-500 transition-colors"
                >
                  Contact
                </a>
                <a
                  href="https://www.refex.group/careers/?slide=4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-700 hover:text-orange-500 transition-colors"
                >
                  ESOP Testimonials
                </a>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-bold text-gray-900 mb-4 pb-2">Services</h4>
              <a
                href="/cbg-production"
                className="block text-gray-700 hover:text-orange-500 transition-colors"
              >
                Compressed Biogas
              </a>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-bold text-gray-900 mb-4 pb-2">Contact</h4>
              <div className="space-y-2">
                <a
                  href="tel:18001020765"
                  className="block text-gray-700 hover:text-orange-500 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-phone-fill text-black"></i>
                    </div>
                    <span>1800 102 0765</span>
                  </div>
                </a>
                <a
                  href="mailto:cs@refexrenewables.com"
                  className="block text-gray-700 hover:text-orange-500 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-mail-fill text-black"></i>
                    </div>
                    <span>cs@refexrenewables.com</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="bg-orange-500 py-6 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white text-sm">
          <div>
            <p>REFEX RENEWABLES © 2025 All Rights Reserved.</p>
          </div>
          <div>
            <p>This website is in the process of being updated</p>
          </div>
          <div className="flex items-center space-x-2 text-white text-sm">
            <Link
              to="/terms-conditions"
              className="text-white hover:text-black transition-colors"
            >
              Terms & Conditions
            </Link>
            <span>|</span>
            <Link
              to="/privacy-policy"
              className="text-white hover:text-black transition-colors"
            >
              Privacy Policy
            </Link>
            <span>|</span>
            <Link
              to="/legal-disclaimer"
              className="text-white hover:text-black transition-colors"
            >
              Legal Disclaimer
            </Link>
            {/* <span>|</span>
            <p>Maintained by <a href="https://sharajman.com/" rel="nofollow" target="_blank" className="text-white hover:text-black transition-colors">Sharajman Technologies</a></p> */}
          </div>
        </div>
      </footer>
    </>
  );
}
