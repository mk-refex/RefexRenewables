export default function CompanyInfo() {
  return (
    <section
      id="company-info"
      className="relative py-20 bg-white overflow-visible"
    >
      <div className="absolute top-0 left-0 w-[15%] opacity-[0.4]">
        <img
          src="https://refexrenewables.com/img/triangle-left.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-[15%] opacity-[0.4]">
        <img
          src="https://refexrenewables.com/img/triangle-right.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* <div
        className="absolute top-0 left-0 w-[25%] h-48"
        style={{
          transform: "rotate(-90deg)",
          // transform:
          //   "translate(0px, -11px) matrix(0, -1, -1, 1, 0, 0, -91) rotate(-180deg)",
          // transition: "transform 1.1s cubic-bezier(0.27, 0.93, 0.92, 0.87)",
          // willChange: "transform",
          // visibility: "inherit",
          // opacity: 1,
        }}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-orange-500 mb-8">
          Our Heritage
        </h2>
      </div>
      <div className="absolute top-[35%] left-[7.5%] w-px h-32 bg-black"></div> */}

      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-orange-500 mb-6">
              Refex Renewables & Infrastructure Limited (RRIL)
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="text-orange-500 font-bold text-2xl">R</span>efex
              Renewables & Infrastructure Limited (RRIL) embarked its journey in
              2018 as an Independent Power Producer (IPP), committed to driving
              the adoption of solar energy as a sustainable alternative across
              India. The Company excels in developing industrial and commercial
              rooftop systems, greenfield ground-mounted projects, and solar
              solutions tailored for land-owning farmers.
            </p>
          </div>

          <div className="bg-orange-50 rounded-2xl p-8 lg:p-12">
            <h4 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
              Over the years, RRIL has earned a solid reputation by delivering
              high-quality solar installations to a wide range of clients,
              including prestigious government bodies and renowned private
              enterprises. With operations spanning approximately 80+ sites
              across 11 states, it has emerged as one of India's leading solar
              power developers, contributing significantly to the nation's
              renewable energy landscape
            </h4>
          </div>

          <div className="space-y-6">
            <ul className="space-y-6 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-500 font-bold mr-3 mt-1">•</span>
                <span className="leading-relaxed">
                  Standing out as a full-spectrum IPP provider, Refex Renewables
                  offers technologically advanced, end-to-end solar energy
                  solutions. The Company's landmark projects such as canal-top
                  solar installations and fast-track deployments - underscore
                  its commitment to innovation, excellence, and sustainability
                  across commercial, industrial, and rural sectors.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 font-bold mr-3 mt-1">•</span>
                <span className="leading-relaxed">
                  RRIL entered the compressed biogas (CBG) sector in late 2024.
                  Building on its foundation in solar energy, the company has
                  strategically expanded into biogas through the acquisition of
                  an operational plant, securing major municipal tenders, and
                  rolling out long-term projects across Tamil Nadu. This growth
                  aligns seamlessly with national initiatives like Swachh Bharat
                  Mission Urban 2.0 and India's broader push toward clean energy
                  adoption.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
