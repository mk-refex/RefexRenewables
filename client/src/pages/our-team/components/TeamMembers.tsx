import { useState } from "react";

interface TeamMember {
  name: string;
  position: string;
  image: string;
  bio: string;
}

export default function TeamMembers() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const teamMembers: TeamMember[] = [
    {
      name: "Purvesh Madhusudan Kapadia",
      position: "Chief Human Resource Officer",
      image: "/img/team/Purvesh-Kapadia.png",
      bio: `In a career span of 25+ Years – Purvesh has played multiple strategic pinnacle roles ranging from CHRO-Managing Partner-COO-Director HR etc.

Throughout his career he has taken up several challenging assignments and has been instrumental in redefining the HR process for several leading organizations globally. Business process reengineering is his exclusive strength tested and proven in his career span. His innate process-driven approach has helped in achieving double-digit top-line and bottom-line growth for several organizations, he has been associated with.

He has worked with several prestigious organizations such as Terex, Intervalve India Ltd, Sheetal Group etc. Purvesh has also spent 10+ years in the IT Education sector.

Academically, he has a Master's in Human Resources – Development & Management from Jamnalal Bajaj Institute of Management Studies and Honours in Systems Management (Information Technology) from National Institute of Information Technology.`,
    },
    {
      name: "Sahil Singla",
      position: "President - Corporate Finance",
      image: "/img/team/Sahil-Singla.png",
      bio: `Sahil has over 19 years of experience in fundraising across sectors and has cumulatively raised more than USD 5 BN from Banks/ FIs/ Private Equity etc.

He has a unique blend of technical, financial and legal domain knowledge which sets him apart.

His expertise is Project Structuring/ Advisory, Equity Investments & Divestments, Financial Modelling, Business Analysis, Negotiations & Regulatory/ Policy Advocacy.

He has demonstrated experience in spearheading strategic initiatives and managing large key accounts. In his earlier stints he has worked for various reputed organisations like JP Morgan, IL&FS Financial Services, SREI Infrastructure, PTC India Limited etc.

Sahil has completed his MBA in Finance from IMT Ghaziabad and his Bachelors in Legal Science from Government law college, Mumbai and a University topper in Law.`,
    },
    {
      name: "Sonal Jain",
      position: "Vice-President - Accounts & Taxation",
      image: "/img/team/Sonal-Jain.png",
      bio: `Sonal is an accomplished Chartered Accountant with excellent knowledge of financial reporting and accounting, having over 19 years of experience in Manufacturing and service industry including Transmission, Solar and EPC.

He has expertise in disclosure of information in financial reporting of the listed entities and evaluation of the Internal financial controls for the business and design and implementation of the internal controls in order to mitigate the financial risks.

He has worked with numerous listed entities and has released quarterly/ annual results of listed entity as per the requirement of SEBI LODR.

In his past, he has led the "Cost Reduction Team" for KEC International Limited, Jabalpur plant and was able to reduce the conversion cost of the plant by 25% over a period of 5 years.

He was a member of various Capex/ Opex Negotiation committees and was able to make substantial savings.

He is an expert in identifying revenue leakages and ways of fixing the same.

Academically he graduated from Rani Durgavati University, Jabalpur and is a Fellow Member of ICAI.`,
    },
    {
      name: "Harini Sriraaman",
      position: "Vice-President - Group General Counsel",
      image: "/img/team/Harini.S.png",
      bio: `Harini comes with over 17 years of experience in handling and addressing corporate legal and commercial matters and litigations. She has worked with esteemed organizations like HCL Technologies Limited, Siva Group, Tattva Group (part of India Cements Group) apart from her association with the law office of M/s. Satish Parasaran at Chennai.

At Refex, as a General Counsel, she handles Contracts review and management, IPR Management, Litigation management, Mergers & Acquisitions, Corporate Governance and compliances, Disputes Resolution etc. She also heads the POSH committee.

Academically Harini is a qualified Commerce and Law graduate. She is a certified M&A Professional – Legal & Business Strategies from Indian Academy of Law & Management, New Delhi.`,
    },
    {
      name: "Srividya Nirmalkumar",
      position: "Vice-President - Corporate Communications",
      image: "/img/team/Srividya.N.png",
      bio: `Srividya is an extremely goal-oriented communication professional with over 20 years of work experience in various leading organizations. She is highly experienced in internal and external communication, social media, digital marketing and event management.

Whether it is an analyst report or a marketing document, she is the go-to person. Srividya has also led diversity and inclusion and CSR initiatives in her career.

She is very passionate about D&I, whether strategy or implementation and strives to make a difference to society. She has won several D&I awards and recognition for the various initiatives that she implemented.

She has also been the head of the POSH committee. She has been recognized as a 'star performer' several times and has led award-winning teams.

Her strengths include process definition and project management and has been highly acclaimed for the same. She has worked for highly reputed organizations such as Satyam, UST, Accenture, AGS Health etc.

Academically she has completed her Master's in Public Administration and post-graduation in Digital Marketing from Mudra Institute of Communications, Ahmedabad.`,
    },
    {
      name: "Suhail Shariff",
      position: "Vice-President - Administration & Facility",
      image: "/img/team/Suhail_VP.png",
      bio: `Suhail has over 23 years of Facility Management experience including Asset Management, Project Management, Security Services, Transitions and Change Management.

A very goal-oriented leader, Suhail focuses on creating an enhanced customer experience through effective facility management solutions and has contributed to accomplishing critical FM transitions across India and global clients (APAC, EMEA & America Regions).

He has previously worked for esteemed organizations such as CB Richard Ellis, Cushman & Wakefield, and Jones Lang Lasalle.

Academically, Suhail holds a Commerce degree with a Certification in Leadership Programme issued by the Project Management Institute.`,
    },
    {
      name: "Gagan Bihari Pattnaik",
      position: "General Manager - ESG & Sustainability",
      image: "/img/team/Gagan-Bihari-Pattnaik.png",
      bio: `Gagan is a chartered environmentalist and sustainability professional (IEMA, UK, SEP-USGBC, USA) and a certified ESG analyst (CESGA®, EFFAS, Germany) with over 18 years of international experience.

His assignments include geographies such as India, USA, and the Middle East in Sustainability and ESG domain in the setting and driving Corporate Sustainability/ ESG Strategies leading to performance excellence.

In a nutshell, his professional expertise includes but is not limited to Decarbonization Strategy and Net Zero Goal, Climate Change and Adaptation, Built Sustainability (LEED), Energy Conservation, Audit, Sustainability Assurance & Verification, Circularity of Material, Water Stewardship, ESG Indices, and Matrices, ESG Performance Disclosure (BRSR, GRI, IIRC, TCFD, and CDP framework), CSR Project Implementation, Stakeholder Engagement, and Biodiversity Conservation program.

Academically Gagan is an M. Tech in Civil–Environmental Engineering, Distinction (UPTU, India, 2004).

He also holds a Diploma in ESG Analysis (EFFAS, Germany), Certificate in Corporate Sustainability (NYU Stern, USA) and a Certificate in CSR (IICA, Ministry of Corporate Affairs, India).`,
    },
    {
      name: "Srivaths Varadharajan",
      position: "Chief Technology Officer",
      image: "/img/team/Srivaths.png",
      bio: `Srivaths Varadharajan is a senior technology and business executive with over 25 years of extensive experience across diverse industries including fintech, banking, insurance, capital markets, telecom, and BPO/KPO. He has held leadership positions such as CTO, CIO, COO, CDO & CEO, demonstrating strategic vision and execution in digital transformation, enterprise architecture, cybersecurity, and platform development. His core strengths lie in aligning technology with business strategy, leading cross-functional teams, and delivering scalable digital products using emerging technologies like AI/ML, blockchain & cloud infrastructure.

Throughout his career, Srivaths has driven large-scale transformation initiatives at organizations like Spice Money, Niyogin Fintech, Kotak Securities, and Reliance Group. He has led the design and implementation of rule-based engines, smart automation tools, omni-channel platforms, and open-source digital ecosystems. As a founding team member at Niyogin Fintech, he helped build a paperless SME lending platform and led the creation of 21 applications and 42 microservices in just six months. At Spice Money, he was instrumental in expanding market share from 10.5% to 17.5% by modernizing the tech stack and building scalable, API-integrated platforms.

Recognized with awards such as the CIO 100 Honouree, Skoch Innovation Award, and EMC Transformers Award, Srivaths is known for delivering measurable impact on topline growth, operational efficiency, and customer experience. He holds an MBA from K. J. Somaiya Institute and certifications in Six Sigma and Project Management. A forward-thinking leader, he continues to advise organizations as an independent consultant, enabling digital transformation through design thinking, data science, and secure, cloud-native solutions.`,
    },
    {
      name: "Jaya Krishna",
      position: "Director - Corporate Finance",
      image: "/img/team/Jaya-Krishna.png",
      bio: `Jaya Krishna is a seasoned Chartered Accountant with over two decades of leadership experience across corporate finance, project funding, strategic planning, and international financial management.

Academically, he completed his Master's in Business Administration from the Indian Institute of Management - Mumbai.

He holds a professional license as a Chartered Accountant from the Institute of Chartered Accountants of India and a professional accountant in the UK.

Before Refex, he was with MEIL Group.

He has spearheaded critical financial functions for multinational companies, managing end-to-end finance operations including IPOs, M&A, private equity, treasury, international taxation, and regulatory compliance. His expertise spans diverse sectors and geographies, with a proven track record in handling large-scale greenfield projects, complex acquisition financing, and cross-border funding exceeding ₹15,000 Cr and USD 300+ Million.

He has played a pivotal role in managing investor relations, board reporting, and global financial consolidation across India, the US, and Europe. His leadership extends to SAP/ERP implementation, cost optimization, risk management, and working capital strategies. With deep knowledge of IFRS, US GAAP, and Indian GAAP, he has ensured strong financial controls and governance while successfully leading audits, compliance, and tax functions. He has also overseen strategic initiatives including debt syndication, structured finance, capital expenditure control, and expansion projects.

His key achievements include completing 6 successful M&A deals, securing large-scale financing from over 20 banks, leading global joint ventures, and setting up end-to-end finance, commercial, and IT systems. A strategic leader and mentor, he is committed to driving financial excellence, business growth, and long-term stakeholder value.`,
    },
    {
      name: "Mr. Rajeev Vaze",
      position: "Vice President - Supply Chain Management (SCM)",
      image: "/img/team/Rajeev-Vaze.png",
      bio: `Rajeev Vaze is Vice President & Head SCM with over 30 years of extensive experience driving strategic initiatives across the renewable energy and infrastructure sectors.

He is a recognized leader in Strategic Procurement, Cost Optimization, and Project Execution.

He holds a Graduate degree in Mechanical Engineering from the University of Pune and a Post Graduate Diploma in Materials Management from Symbiosis Institute of Business Management, Pune.

His proven track record includes impactful assignments at industry-leading companies such as Vikram Solar, Suzlon Energy, Kirloskar Brothers Ltd, and Thermax Ltd.`,
    },
  ];

  return (
    <>
      <section id="team-content" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Senior Management Personnel
              </h2>
              <div className="w-20 h-[1px] bg-[#FF6B35]"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                >
                  <div className="flex justify-center pt-8 pb-4">
                    <div className="w-48 h-48 rounded-full bg-gray-100 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-orange-500 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-gray-900 mb-3">
                      {member.position}
                    </p>
                    <button
                      className="text-orange-500 hover:text-orange-600 text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
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
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {selectedMember.name}
                </h3>
                <p className="text-orange-500 font-semibold">
                  {selectedMember.position}
                </p>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 text-3xl cursor-pointer"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedMember.bio}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
