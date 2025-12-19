export default function CommitteeMembers() {
  const members = [
    {
      name: "Ms. Jayanthi Talluri",
      position: "Independent Director",
      role: "(Chairperson)",
      image: "/img/investor/jayanthi.jpg",
    },
    {
      name: "Mr. Anil Jain",
      position: "Non-Executive Director",
      role: "(Member)",
      image: "/img/investor/anil-jain.jpg",
    },
    {
      name: "Mr. Pillappan Amalnathan",
      position: "Independent Director",
      role: "(Member)",
      image: "/img/team/Amalanathan.png",
    },
  ];

  return (
    <section id="content" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              <span className="text-orange-500">Nomination & Remuneration</span>{" "}
              Committee
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {members.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden flex items-center justify-center p-8 bg-gray-50">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-orange-500 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    {member.position}
                  </p>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
