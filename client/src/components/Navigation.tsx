import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavigationProps {
  activeSection?: number;
}

export default function Navigation({
  activeSection: _activeSection,
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Check if any About Us submenu item is active
  const isAboutSubmenuActive = () => {
    const aboutPaths = [
      "/about-us",
      "/our-team",
      "/board-of-directors",
      "/audit-committee",
      "/nomination-remuneration-committee",
      "/stakeholders-relationship-committee",
      "/working-at-refex",
    ];
    return aboutPaths.some((path) => location.pathname === path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? "h-16" : "h-[120px]"
            }`}
          >
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  src="https://refexrenewables.com/img/logo.png"
                  alt="Refex Renewables"
                  className={`cursor-pointer transition-all duration-300 ${
                    isScrolled ? "h-[50px]" : "h-[68px]"
                  }`}
                />
              </Link>
            </div>

            <nav className="hidden lg:flex items-center space-x-[50px]">
              <div
                className="relative group"
                onMouseEnter={() => setIsAboutDropdownOpen(true)}
                onMouseLeave={() => setIsAboutDropdownOpen(false)}
              >
                <Link
                  to="/about-us"
                  className={`relative font-bold text-[13px] transition-colors whitespace-nowrap cursor-pointer before:content-[''] before:absolute before:top-[-20px] before:left-0 before:w-0 before:h-[2px] before:bg-[#FF6B35] before:transition-all before:duration-300 before:translate-y-[-32px] hover:before:w-full ${
                    isAboutSubmenuActive()
                      ? "text-orange-500 before:w-full"
                      : "text-black hover:text-orange-500"
                  }`}
                >
                  ABOUT US
                </Link>
                {isAboutDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="w-max bg-white shadow-xl rounded-md py-2 border border-gray-100 border-t-4 border-t-orange-500">
                      <Link
                        to="/about-us"
                        className={`block px-6 py-2 text-[13px] font-semibold transition-colors whitespace-nowrap ${
                          isActive("/about-us")
                            ? "text-orange-500"
                            : "text-black hover:text-orange-500"
                        }`}
                      >
                        About Us
                      </Link>
                      <Link
                        to="/our-team"
                        className={`block px-6 py-2 text-[13px] font-semibold transition-colors whitespace-nowrap ${
                          isActive("/our-team")
                            ? "text-orange-500"
                            : "text-black hover:text-orange-500"
                        }`}
                      >
                        Our Team
                      </Link>
                      <Link
                        to="/board-of-directors"
                        className={`block px-6 py-2 text-[13px] font-semibold transition-colors whitespace-nowrap ${
                          isActive("/board-of-directors")
                            ? "text-orange-500"
                            : "text-black hover:text-orange-500"
                        }`}
                      >
                        Board of Directors
                      </Link>
                      <Link
                        to="/audit-committee"
                        className={`block px-6 py-2 text-[13px] font-semibold transition-colors whitespace-nowrap ${
                          isActive("/audit-committee")
                            ? "text-orange-500"
                            : "text-black hover:text-orange-500"
                        }`}
                      >
                        Audit Committee
                      </Link>
                      <Link
                        to="/nomination-remuneration-committee"
                        className={`block px-6 py-2 text-[13px] font-semibold transition-colors whitespace-nowrap ${
                          isActive("/nomination-remuneration-committee")
                            ? "text-orange-500"
                            : "text-black hover:text-orange-500"
                        }`}
                      >
                        Nomination & Remuneration Committee
                      </Link>
                      <Link
                        to="/stakeholders-relationship-committee"
                        className={`block px-6 py-2 text-[13px] font-semibold transition-colors whitespace-nowrap ${
                          isActive("/stakeholders-relationship-committee")
                            ? "text-orange-500"
                            : "text-black hover:text-orange-500"
                        }`}
                      >
                        Stakeholders Relationship Committee
                      </Link>
                      <Link
                        to="/working-at-refex"
                        className={`block px-6 py-2 text-[13px] font-semibold transition-colors whitespace-nowrap ${
                          isActive("/working-at-refex")
                            ? "text-orange-500"
                            : "text-black hover:text-orange-500"
                        }`}
                      >
                        Working at Refex Renewables
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <Link
                to="/investor-relations"
                className={`relative font-bold text-[13px] transition-colors whitespace-nowrap cursor-pointer before:content-[''] before:absolute before:top-[-20px] before:left-0 before:w-0 before:h-[2px] before:bg-[#FF6B35] before:transition-all before:duration-300 before:translate-y-[-32px] hover:before:w-full ${
                  isActive("/investor-relations")
                    ? "text-orange-500 before:w-full"
                    : "text-black hover:text-orange-500"
                }`}
              >
                INVESTOR RELATIONS
              </Link>
              <Link
                to="/why-go-solar"
                className={`relative font-bold text-[13px] transition-colors whitespace-nowrap cursor-pointer before:content-[''] before:absolute before:top-[-20px] before:left-0 before:w-0 before:h-[2px] before:bg-[#FF6B35] before:transition-all before:duration-300 before:translate-y-[-32px] hover:before:w-full ${
                  isActive("/why-go-solar")
                    ? "text-orange-500 before:w-full"
                    : "text-black hover:text-orange-500"
                }`}
              >
                SOLAR ENERGY
              </Link>
              <Link
                to="/cbg-production"
                className={`relative font-bold text-[13px] transition-colors whitespace-nowrap cursor-pointer before:content-[''] before:absolute before:top-[-20px] before:left-0 before:w-0 before:h-[2px] before:bg-[#FF6B35] before:transition-all before:duration-300 before:translate-y-[-32px] hover:before:w-full ${
                  isActive("/cbg-production")
                    ? "text-orange-500 before:w-full"
                    : "text-black hover:text-orange-500"
                }`}
              >
                COMPRESSED BIOGAS
              </Link>
              <Link
                to="/contact"
                className={`relative font-bold text-[13px] transition-colors whitespace-nowrap cursor-pointer before:content-[''] before:absolute before:top-[-20px] before:left-0 before:w-0 before:h-[2px] before:bg-[#FF6B35] before:transition-all before:duration-300 before:translate-y-[-32px] hover:before:w-full ${
                  isActive("/contact")
                    ? "text-orange-500 before:w-full"
                    : "text-black hover:text-orange-500"
                }`}
              >
                CONTACT
              </Link>
            </nav>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden w-10 h-10 flex items-center justify-center ${
                isScrolled ? "text-gray-800" : "text-white"
              } hover:text-orange-500 transition-colors cursor-pointer`}
            >
              <i
                className={`text-2xl ${
                  isMobileMenuOpen ? "ri-close-line" : "ri-menu-line"
                }`}
              ></i>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <nav className="px-6 py-4 space-y-4">
              <div>
                <button
                  onClick={() => {
                    setIsAboutDropdownOpen(!isAboutDropdownOpen);
                  }}
                  className={`block w-full text-left font-bold text-[13px] transition-colors whitespace-nowrap cursor-pointer ${
                    isAboutSubmenuActive()
                      ? "text-orange-500"
                      : "text-gray-800 hover:text-orange-500"
                  }`}
                >
                  ABOUT US
                </button>
                {isAboutDropdownOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    <Link
                      to="/about-us"
                      className={`block font-bold text-[13px] transition-colors cursor-pointer ${
                        isActive("/about-us")
                          ? "text-orange-500"
                          : "text-black hover:text-orange-500"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      ABOUT US
                    </Link>
                    <Link
                      to="/our-team"
                      className={`block font-bold text-[13px] transition-colors cursor-pointer ${
                        isActive("/our-team")
                          ? "text-orange-500"
                          : "text-black hover:text-orange-500"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      OUR TEAM
                    </Link>
                    <Link
                      to="/board-of-directors"
                      className={`block font-bold text-[13px] transition-colors cursor-pointer ${
                        isActive("/board-of-directors")
                          ? "text-orange-500"
                          : "text-black hover:text-orange-500"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      BOARD OF DIRECTORS
                    </Link>
                    <Link
                      to="/audit-committee"
                      className={`block font-bold text-[13px] transition-colors cursor-pointer ${
                        isActive("/audit-committee")
                          ? "text-orange-500"
                          : "text-black hover:text-orange-500"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      AUDIT COMMITTEE
                    </Link>
                    <Link
                      to="/nomination-remuneration-committee"
                      className={`block font-bold text-[13px] transition-colors cursor-pointer ${
                        isActive("/nomination-remuneration-committee")
                          ? "text-orange-500"
                          : "text-black hover:text-orange-500"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      NOMINATION AND REMUNERATION COMMITTEE
                    </Link>
                    <Link
                      to="/stakeholders-relationship-committee"
                      className={`block font-bold text-[13px] transition-colors cursor-pointer ${
                        isActive("/stakeholders-relationship-committee")
                          ? "text-orange-500"
                          : "text-black hover:text-orange-500"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      STAKEHOLDERS RELATIONSHIP COMMITTEE
                    </Link>
                    <Link
                      to="/working-at-refex"
                      className={`block font-bold text-[13px] transition-colors cursor-pointer ${
                        isActive("/working-at-refex")
                          ? "text-orange-500"
                          : "text-black hover:text-orange-500"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      WORKING AT REFEX RENEWABLES
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to="/investor-relations"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left font-bold text-[13px] transition-colors whitespace-nowrap cursor-pointer ${
                  isActive("/investor-relations")
                    ? "text-orange-500"
                    : "text-gray-800 hover:text-orange-500"
                }`}
              >
                INVESTOR RELATIONS
              </Link>
              <Link
                to="/why-go-solar"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left font-bold text-[13px] transition-colors whitespace-nowrap cursor-pointer ${
                  isActive("/why-go-solar")
                    ? "text-orange-500"
                    : "text-gray-800 hover:text-orange-500"
                }`}
              >
                SOLAR ENERGY
              </Link>
              <Link
                to="/cbg-production"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left font-bold text-[13px] transition-colors whitespace-nowrap cursor-pointer ${
                  isActive("/cbg-production")
                    ? "text-orange-500"
                    : "text-gray-800 hover:text-orange-500"
                }`}
              >
                COMPRESSED BIOGAS
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left font-bold text-[13px] transition-colors whitespace-nowrap ${
                  isActive("/contact")
                    ? "text-orange-500"
                    : "text-gray-800 hover:text-orange-500"
                }`}
              >
                CONTACT
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
