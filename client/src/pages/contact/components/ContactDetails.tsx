export default function ContactDetails() {
  const contactSections = [
    {
      title: 'Contact Details',
      subtitle: 'Corporate Address',
      company: 'Refex Renewables & Infrastructure Limited',
      cin: 'CIN: L40100TN1994PLC028263',
      address: [
        'Second Floor, Refex Towers, Sterling Road Signal,',
        '313, Valluvar Kottam High Road,',
        'Nungambakkam, Chennai –600034,',
        'Tamil Nadu, India'
      ],
      phone: '18001020765',
      email: 'cs@refexrenewables.com'
    },
    {
      title: 'Investor Grievances',
      subtitle: '',
      company: 'Mr. Vinay Aggarwal, Company Secretary & Compliance Officer',
      cin: 'Refex Renewables & Infrastructure Limited',
      address: [
        'Second Floor, Refex Towers, Sterling Road Signal,',
        '313, Valluvar Kottam High Road,',
        'Nungambakkam, Chennai –600034,',
        'Tamil Nadu, India'
      ],
      phone: '04443405950',
      email: 'cs@refexrenewables.com'
    },
    {
      title: 'For Determining Materiality of Events',
      subtitle: '',
      company: 'Mr. Kalpesh Kumar, Managing Director',
      cin: 'Mr. Vinay Aggarwal, Company Secretary & Compliance Officer',
      address: [
        'Mr. Manikandan T, Chief Financial Officer',
        'Refex Renewables & Infrastructure Limited',
        'Second Floor, Refex Towers, Sterling Road Signal,',
        '313, Valluvar Kottam High Road,',
        'Nungambakkam, Chennai –600034,',
        'Tamil Nadu, India'
      ],
      phone: '04443405950',
      email: 'cs@refexrenewables.com'
    },
    {
      title: 'Registrar & Transfer Agent',
      subtitle: '',
      company: 'Mr. Krishna Kumar N, Director/Compliance Officer,',
      cin: 'GNSA Infotech Private Limited',
      address: [
        'Nelson Chambers, STA Department Block, 4th Floor,',
        '115 Nelson Manickam Road, Aminjikari,',
        'Chennai – 600029, Tamil Nadu, India'
      ],
      phone: '+91 44 42962025',
      email: 'sta@gnsaindia.com'
    }
  ];

  return (
    <section id="contact-details" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {contactSections.map((section, index) => (
            <div key={index} className="relative bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-orange-500"></div>
              <div className="p-8 lg:p-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-orange-500 mb-6">
                  {section.title}
                </h2>
                
                {section.subtitle && (
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {section.subtitle}
                  </h3>
                )}
                
                <p className="font-bold text-gray-900 mb-2">{section.company}</p>
                {section.cin && (
                  <p className={`${index === 0 ? 'mb-4' : 'font-bold mb-2'} text-gray-900`}>
                    {section.cin}
                  </p>
                )}
                
                <div className="text-gray-700 mb-6 space-y-1">
                  {section.address.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <a 
                    href={`tel:${section.phone}`}
                    className="flex items-center text-gray-900 hover:text-orange-500 transition-colors"
                  >
                    <span className="font-bold mr-2 flex items-center">
                      <div className="w-5 h-5 flex items-center justify-center mr-1">
                        <i className="ri-phone-line"></i>
                      </div>
                      T:
                    </span>
                    {section.phone}
                  </a>
                  <a 
                    href={`mailto:${section.email}`}
                    className="flex items-center text-gray-900 hover:text-orange-500 transition-colors"
                  >
                    <span className="font-bold mr-2 flex items-center">
                      <div className="w-5 h-5 flex items-center justify-center mr-1">
                        <i className="ri-mail-line"></i>
                      </div>
                      E:
                    </span>
                    {section.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
