export default function VisionMission() {
  return (
    <section
      id="vision-mission"
      className="w-[100%] px-[10%] py-[5%] relative bg-[#fceee8] overflow-hidden"
    >
      {/* <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 lg:p-12 text-white shadow-xl">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Mission</h2>
            <p className="text-lg leading-relaxed">
              Refex shall create enduring value across industries through
              innovation, operational excellence, and sustainable practices,
              thereby empowering our customers, enriching our communities, and
              delivering responsible growth for all stakeholders.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 lg:p-12 text-white shadow-xl">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Vision</h2>
            <p className="text-lg leading-relaxed">
              Refex aims to be a globally admired conglomerate, driving
              long-term sustainable growth through innovation, purposeful
              collaborations and partnerships, and an unwavering commitment to
              excellence, while contributing meaningfully to societal progress.
            </p>
          </div>
        </div>
      </div> */}
      <div className="relative flex">
        <div className="relative p-0 w-[48%] left-[-4%]">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-orange-500">
              Mission
            </h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed">
              Refex shall create enduring value across industries through
              innovation, operational excellence, and sustainable practices,
              thereby empowering our customers, enriching our communities, and
              delivering responsible growth for all stakeholders.
            </p>
          </div>
          <div className="mt-5 w-20 h-[1px] bg-[#FF6B35]"></div>
        </div>
        <div className="relative p-0 w-[48%] left-[10%]">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-orange-500">
              Vision
            </h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed">
              Refex aims to be a globally admired conglomerate, driving
              long-term sustainable growth through innovation, purposeful
              collaborations and partnerships, and an unwavering commitment to
              excellence, while contributing meaningfully to societal progress.
            </p>
          </div>
          <div className="mt-5 w-20 h-[1px] bg-[#FF6B35]"></div>
        </div>
      </div>
      <div className="absolute bottom-0 w-[27%] left-[35%] opacity-[0.5]">
        <img
          src="https://refexrenewables.com/img/abt-Triangle1.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
    </section>
  );
}
