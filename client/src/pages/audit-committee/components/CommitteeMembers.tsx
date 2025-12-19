import React from 'react';

const CommitteeMembers: React.FC = () => {
  const members = [
    {
      name: 'Ms. Jayanthi Talluri',
      position: 'Independent Director',
      role: '(Chairperson)',
      image: 'https://refexrenewables.com/img/investor/jayanthi.jpg',
    },
    {
      name: 'Mr. Dinesh Kumar Agarwal',
      position: 'Non-Executive Director',
      role: '(Member)',
      image: 'https://refexrenewables.com/img/team/dinesh.jpg',
    },
    {
      name: 'Mr. Pillappan Amalnathan',
      position: 'Independent Director',
      role: '(Member)',
      image: 'https://refexrenewables.com/img/team/Amalanathan.png',
    },
  ];

  return (
    <section id="content" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              <span className="text-orange-500">Audit</span> Committee
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {members.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full max-w-sm"
              >
                <div className="p-8 flex flex-col items-center">
                  <div className="w-48 h-48 rounded-full bg-gray-200 mb-6 overflow-hidden flex items-center justify-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 mb-1 text-center">{member.position}</p>
                  <p className="text-orange-500 font-semibold text-center">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommitteeMembers;
