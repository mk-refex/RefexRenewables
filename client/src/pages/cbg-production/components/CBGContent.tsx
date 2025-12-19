import { useState } from 'react';

export default function CBGContent() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: 'Clean Energy in Remote Regions',
      icon: 'https://refexrenewables.com/img/residential/premium-icon-1.svg',
      content: 'The decentralized solar installations provide reliable, grid-independent electricity to rural and remote communities - places where traditional power infrastructure is economically or logistically unfeasible. This electrification enables better access to education, healthcare, and economic opportunities, transforming quality of life.'
    },
    {
      title: 'Cleaner Jobs, Safer Workers',
      icon: 'https://refexrenewables.com/img/residential/service-icon-1.svg',
      content: 'The solar and bioenergy sectors create thousands of green jobs across installation, operations, and maintenance, which are inherently safer and less polluting than coal mining or fossil fuel extraction. These roles minimize workers\' exposure to hazardous particulate matter and toxic emissions.'
    },
    {
      title: 'Emission Footprint Comparison',
      icon: 'https://refexrenewables.com/img/residential/software-icon-1.svg',
      content: 'Solar PV emits 95% less GHGs than coal over its lifecycle and consumes 30–40 times less water per MWh. It also dramatically reduces particulate matter (PM2.5) emissions, helping mitigate urban air pollution and improve respiratory health.'
    }
  ];

  return (
    <div id="content" className="bg-white">
      {/* Growing CBG Footprint */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-orange-500 mb-6">RRIL's Growing CBG Footprint</h2>
          <h3 className="text-2xl font-semibold text-gray-800 mb-12">RRIL is actively expanding its CBG capacity to address both the national energy demand and sustainable waste management:</h3>
        </div>
      </section>

      {/* The Commitment Forward */}
      <section className="relative py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://refexrenewables.com/img/foot-print.jpg" 
                alt="CBG Footprint" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">The Commitment Forward</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                With bioenergy positioned at the intersection of clean energy, climate action, and waste circularity, RRIL is scaling operations to become a national leader in CBG production. The Company's future roadmap includes new project sites, feedstock partnerships with urban local bodies and agri-cooperatives, and adoption of advanced anaerobic digestion and biogas purification technologies.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                By transforming waste into a high-value renewable fuel, RRIL is turning vision into impact - delivering clean air, clean energy, and cleaner cities for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ESG & Community Impact */}
      <section className="relative py-20 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">ESG & Community Impact: Empowering Progress, Sustaining the Future</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                At RRIL, Environmental, Social, and Governance (ESG) principles are not peripheral - they form the core of the Company's purpose-led strategy. Through the twin engines of solar energy and Compressed Biogas (CBG), the Company is delivering real-world environmental gains, creating dignified green jobs, empowering communities in underserved areas, and establishing robust systems of ethical governance. This integrated approach to ESG is shaping a cleaner, more equitable, and energy-independent India.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://refexrenewables.com/img/residential/rural-sunEdiosn.jpg" 
                alt="ESG Impact" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Stewardship */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Environmental Stewardship</h2>
          
          <div className="mb-8">
            <div className="flex items-start gap-8">
              <div className="flex-shrink-0">
                <img 
                  src={tabs[activeTab].icon} 
                  alt={tabs[activeTab].title} 
                  className="w-24 h-24"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{tabs[activeTab].title}</h3>
                <p className="text-gray-700 text-lg leading-relaxed">{tabs[activeTab].content}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === index
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CBG: A Circular, low Carbon Fuel */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-orange-500 mb-6">CBG: A Circular, low Carbon Fuel</h2>
            <h3 className="text-2xl font-semibold text-gray-800 mb-8">CBG offers remarkable environmental co-benefits:</h3>
            
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                <strong>Low Carbon Potential:</strong> Since it captures methane from biogenic sources - agricultural waste, press mud, food industry and MSW - CBG can result in a net reduction in atmospheric carbon.
              </p>
              <p>
                <strong>MSW Management:</strong> With RRIL's growing CBG footprint, the Company will be diverting tonnes of organic municipal waste per day from open dumping, easing landfill pressure and improving public hygiene.
              </p>
              <p>
                <strong>Avoided Methane Emissions:</strong> Methane that would otherwise escape from landfills (a gas 28x more potent than CO₂) is captured and converted into fuel.
              </p>
              <p>
                <strong>Water Use Efficiency:</strong> CBG production has a relatively low water footprint compared to fossil-fuel processing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-6xl font-bold">
            <span className="text-gray-900">02</span>
            <span className="text-orange-500">|</span>
            <span className="text-gray-900">ABOUT</span>
          </div>
        </div>
      </section>

      {/* The Road Ahead */}
      <section className="relative py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://refexrenewables.com/img/Carbon-low-fuel.jpg" 
                alt="The Road Ahead" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">The Road Ahead</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                As RRIL scale to 45 MT/day CBG production capacity and expand solar operations across new regions, the ESG impact will grow exponentially.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                One of the by-products, decomposed feed will be introduced as a product Fermented Organic Manure (FOM) ensuring circularity and enhancing agricultural productivity, simultaneously enriching the surroundings environment. The Company is planning to marketize the product after proper processing as a bio fertilizer which will again help in reducing carbon footprint by avoiding methane emission from Chemical fertilizer. It will promote organic farming and reducing import dependency on imported fertilizer and achieving the goal of Viksit Bharat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Green Quotient Calculator */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-5xl mx-auto text-center text-white">
          <div className="mb-12">
            <p className="text-sm font-semibold mb-2">AVERAGE YEARLY SAVINGS</p>
            <p className="text-5xl font-bold">
              <i className="ri-money-rupee-circle-line"></i> INR 25,920*
            </p>
          </div>
          
          <h3 className="text-3xl font-bold mb-12">YOUR GREEN QUOTIENT</h3>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <p className="text-sm font-semibold mb-4 uppercase">Reduction of carbon footprint over 20 years</p>
              <p className="text-5xl font-bold">76* TONNES</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <p className="text-sm font-semibold mb-4">Number of Trees saved in 20 years</p>
              <p className="text-5xl font-bold">129*</p>
            </div>
          </div>
          
          <p className="text-sm">* Note: These are approximate values</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-gray-800">
            SunEdison can help you go solar in the fastest time possible thanks to our lean technique practices so call us at once @ <a href="tel:044-43405950" className="text-orange-500 hover:text-orange-600 transition-colors cursor-pointer">044-4340 5950</a>
          </h3>
        </div>
      </section>

      {/* Social Impact */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Social Impact</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://refexrenewables.com/img/residential/rural-projects.png" 
                alt="Social Impact" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Inclusive Development</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  The solar and CBG operations prioritize local sourcing of manpower and engage rural and semi-urban communities, stimulating inclusive economic growth and skill development in underserved areas.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Health</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  By reducing air pollution and promoting clean cooking and transport fuels, contributing to lower incidence of respiratory illnesses and improve urban air quality.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Energy Equity</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Providing clean energy access in off-grid zones helps bridge India's urban-rural energy divide, promoting equity and dignity through electrification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
