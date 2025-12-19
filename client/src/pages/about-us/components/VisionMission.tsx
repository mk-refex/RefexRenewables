export default function VisionMission() {
  return (
    <section id="vision-mission" className="relative py-20 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
        <img src="https://refexrenewables.com/img/abt-Triangle1.png" alt="" className="w-full h-full object-contain" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 lg:p-12 text-white shadow-xl">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Mission</h2>
            <p className="text-lg leading-relaxed">
              Refex shall create enduring value across industries through innovation, operational excellence, and sustainable practices, thereby empowering our customers, enriching our communities, and delivering responsible growth for all stakeholders.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 lg:p-12 text-white shadow-xl">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Vision</h2>
            <p className="text-lg leading-relaxed">
              Refex aims to be a globally admired conglomerate, driving long-term sustainable growth through innovation, purposeful collaborations and partnerships, and an unwavering commitment to excellence, while contributing meaningfully to societal progress.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
