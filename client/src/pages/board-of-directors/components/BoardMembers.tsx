import { useState } from "react";

interface BoardMember {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  din?: string;
  directorships?: string[];
}

const boardMembers: BoardMember[] = [
  {
    id: 1,
    name: "Mr. Kalpesh Kumar",
    position: "Managing Director",
    image: "/img/team/Kalpesh.jpg",
    din: "07966090",
    bio: `Mr. Kalpesh Kumar (age 41 years), is a commerce graduate from M.D.S. University, Ajmer and did his Post Graduate Diploma in Business Management (PGDBM) at M.S. Ramaiah Institute of Management (MSRIM), Bangalore, specializing in Finance and Marketing and Executive Leadership Programme (EPLM) from IIM Calcutta.

Mr. Kalpesh has 18+ years of experience in the solar and renewables space, corporate finance and M&A and investor relations. He understands both financial and business metrics very well which helps to lead the business understanding its nuances.

From the initial stages, Mr. Kalpesh has been responsible for Solar Commercial & Industrial (C&I) business right from strategy to winning the business and to execute and finance.

His experience has provided him the expertise to forecast short term and long-term financial needs of the company based on business plan and projects on hand, identify sources and mobilize funds at a low cost.`,
    directorships: [
      "Sherisha Solar SPV Two Private Limited",
      "Taper Solar Energy Limited",
      "Wither Solar Energy Private Limited",
      "Broil Solar Energy Private Limited",
      "Refex Green Power Limited (Managing Director)",
      "Sherisha Rooftop Solar SPV Three Private Limited",
      "Sherisha Rooftop Solar SPV Four Private Limited",
      "Sherisha Agriculture Private Limited",
      "STPL Horticulture Private Limited",
    ],
  },
  {
    id: 2,
    name: "Mr. Anil Jain",
    position: "Non-Executive Director",
    image: "/img/investor/anil-jain.jpg",
    din: "00181960",
    bio: `Mr. Anil Jain is a leading industrialist with a vision and drive to establish a successful Refex business portfolio. Gifted with innate talent in business and acuity, Anil has grown his businesses into many successful diversified business units with the purpose of creating sustainable solutions and providing environment-friendly energy alternatives in India.

He has also been instrumental in setting up the angel investment & incubation Center of JITO for pan-India operation when he was the Secretary General of Jain International Trade Organization.`,
    directorships: [
      "Venwind Refex Power Limited",
      "R.L.Fine Chem Private Limited",
      "PHD Chamber of Commerce & Industry",
      "Venwind Refex Limited",
      "Lee Pharma Limited",
      "EMCO Limited",
      "Refex Holding Private Limited (Managing Director)",
      "Refex Industries Limited (Managing Director)",
      "3I Medical Technologies Private Limited",
      "SILRES Energy Solutions Private Limited",
      "Refex Green Power Limited",
      "Refex Airports and Transportation Private Limited",
      "Refex Beverages Private Limited",
      "AJ Incubation Forum",
    ],
  },
  {
    id: 3,
    name: "Mr. Dinesh Kumar Agarwal",
    position: "Non Executive Director",
    image: "/img/team/dinesh.jpg",
    din: "07544757",
    bio: `Mr. Dinesh Kumar Agarwal has honed his entrepreneurial skills across several business domains and has always been successful in all his business endeavour. His expertise with numbers has helped several businesses to move up in the growth trajectory.

His business acumen in Corporate Finance spanning Audit, Financial Accounting and Planning, Tax and Fundraising has helped raise over ₹3,000 crores (Equity + Debt) for clients.

Mr. Dinesh has made a significant difference to our business since he joined us in 2014. His expertise combined with his passion and zeal to grow Refex business reflects in our growth journey.

In the past, Dinesh has been working in reputed organizations Aircel and Brisk specializing in streamlining internal processes and functions.

His diverse experience includes Solar EPC segments and Utility-scale projects, consulting for start-ups, SMEs, established Corporate Houses, and International NGOs.

Mr. Dinesh has received several industry recognitions for his contribution to management and related areas.`,
    directorships: [
      "Venwind Refex Limited",
      "Venwind Refex Power Limited",
      "Refex Holding Private Limited (WTD, CFO & CEO)",
      "Refex Industries Limited (WTD & CFO)",
      "Refex Solar Power Private Limited",
      "EMCO Limited",
      "Anam Medical Solutions Private Limited",
      "Aj Incubation Forum",
      "Torrid Solar Power Private Limited",
      "Refex Life Sciences Private Limited",
      "Refex Pharma Services Private Limited",
      "VS Lignite Power Private Limited",
      "Sourashakthi Energy Private Limited",
      "Spangle Energy Private Limited",
      "Sherisha Infrastructure Private Limited",
      "Scorch Solar Energy Private Limited",
      "Singe Solar Energy Private Limited",
      "Sparzana Aviation Private Limited",
    ],
  },
  {
    id: 4,
    name: "Ms. Talluri Jayanthi",
    position: "Independent Director",
    image: "/img/investor/jayanthi.jpg",
    din: "09272993",
    bio: `Ms. Talluri Jayanthi is a legal professional with an extensive experience of more than 24 years comprising of successful litigant counsel and in-house Corporate Counsel in varied sectors including but not limited to Healthcare, IT& ITES, Infrastructure, Real Estate, Commercial Corporate matters, Airports, Domestic & Family disputes, Labour Laws, Property Laws, Corporate Litigation.

A Tech Savvy Legal Entrepreneur, Founder & Managing Director of Talluri Law Consultancy Private Limited, handling corporate litigation, with solution-oriented analysis and providing full life cycle legal solutions & legal strategy.`,
    directorships: [
      "Securekloud Technologies Limited",
      "Talluri's Kitchen Temple Private Limited",
      "Som Datt Finance Corporation Limited",
      "Talluri Law Consultancy (OPC) Private Limited",
      "International Conveyors Limited",
    ],
  },
  {
    id: 5,
    name: "Mr. Pillappan Amalnathan",
    position: "Independent Director",
    image: "/img/team/Amalanathan.png",
    din: "08730795",
    bio: `Mr. Pillappan Amalanathan has an established independent practice for the past 20 years with a well-equipped library, office and three junior associates.

He appeared in many cases relating to political fronts, commercial matters for several private concerns and companies including matters relating to Company Law such as winding up, amalgamation and reconstitution and have advised on company formation, tax planning, pre-litigation settlements, international contracts formation.

He has wide exposure and experience in diverse fields of law and enjoy a good reputation in the Bar.`,
    directorships: [
      "Krish Solar Ventures Private Limited",
      "Torrid Solar Power Private Limited",
      "V Tree Traders Private Limited",
    ],
  },
  {
    id: 6,
    name: "Ms. Latha Venkatesh",
    position: "Independent Director",
    image: "/img/team/latha.jpg",
    din: "06983347",
    bio: `Ms. Latha Venkatesh is a senior Auditor with eleven years of experience in practice. Having worked with clients in multiple industries, she has good knowledge and vast experience in cost audit, internal audits, processes and standards that significantly improve the opinion on company records, banking practices and management & taxation, technology driven performances.

She has engaged with multiple business sectors like Engineering & Manufacturing, Construction & Civil Engineering and Banking.`,
    directorships: [
      "K.S.Oils Limited",
      "Torrid Solar Power Private Limited",
      "Refex Industries Limited",
    ],
  },
];

export default function BoardMembers() {
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(
    null
  );

  return (
    <>
      <section id="board-members" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              <span className="text-[#FF6B35]"></span> Board of Directors
            </h2>
            <div className="w-20 h-1 bg-[#FF6B35]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {boardMembers.slice(0, 3).map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <div className="flex justify-center pt-8 pb-4">
                  <div className="w-48 h-48 rounded-full bg-gray-100 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-avatar.jpg";
                      }}
                    />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[#FF6B35] mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-900 font-semibold mb-4">
                    {member.position}
                  </p>
                  <button
                    className="text-[#FF6B35] font-semibold hover:underline whitespace-nowrap"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMember(member);
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {boardMembers.slice(3, 6).map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <div className="flex justify-center pt-8 pb-4">
                  <div className="w-48 h-48 rounded-full bg-gray-100 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-avatar.jpg";
                      }}
                    />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[#FF6B35] mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-900 font-semibold mb-4">
                    {member.position}
                  </p>
                  <button
                    className="text-[#FF6B35] font-semibold hover:underline whitespace-nowrap"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMember(member);
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <a
              href="/pdf/RRIL-Ceased-Directors.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#FF6B35] text-white px-8 py-3 rounded font-semibold hover:bg-[#e55a2a] transition-colors whitespace-nowrap"
            >
              RRIL - Directors Ceased
            </a>
          </div>
        </div>
      </section>

      {selectedMember && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedMember.name}
              </h3>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-gray-500 hover:text-gray-700 text-3xl leading-none w-8 h-8 flex items-center justify-center"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <p className="font-bold text-gray-900 mb-1">
                {selectedMember.position}
              </p>
              {selectedMember.din && (
                <p className="font-bold text-gray-900 mb-4">
                  DIN: {selectedMember.din}
                </p>
              )}
              <div className="text-gray-700 whitespace-pre-line mb-6">
                {selectedMember.bio}
              </div>
              {selectedMember.directorships &&
                selectedMember.directorships.length > 0 && (
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">
                      Directorship:
                    </h4>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                      {selectedMember.directorships.map(
                        (directorship, index) => (
                          <li key={index}>{directorship}</li>
                        )
                      )}
                    </ol>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
