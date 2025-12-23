export default function Glimpse() {
  const values = [
    {
      title: "Principled Excellence",
      description:
        "A commitment to high performance that is always grounded in strong, non-negotiable values.",
    },
    {
      title: "Authenticity",
      description:
        "Emphasizes being genuine and true to foster trust and transparency.",
    },
    {
      title: "Customer Value",
      description:
        "A commitment to deliver exceptional value to our customers by understanding their needs, providing innovative solutions, and consistently offering high-quality products and services. A focus on creating lasting relationships built on trust, satisfaction and mutual success.",
    },
    {
      title: "Esteem Culture",
      description:
        "A core belief that every individual deserves respect, recognition, and the opportunity to grow. A commitment to foster a culture where people feel valued, heard, and empowered to do their best work.",
    },
  ];

  return (
    <section
      id="glimpse"
      className="relative pt-20 bg-gradient-to-b from-white to-orange-50 overflow-hidden"
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

      <div className="container flex flex-col items-center mx-auto px-6 lg:px-12">
        <div className="w-[4%] h-[100px]">
          <img
            src="https://refexrenewables.com/img/sun-logo-white.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            A Glimpse of OUR FIRSTS
          </h2>
        </div>

        <div className="flex justify-center mb-16">
          <div className="w-full max-w-4xl">
            <img
              src="https://refexrenewables.com/img/about/glimps-img.png"
              alt="Solar Energy Transformation"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
      <div className="w-[100%] px-[10%] py-5 bg-[#fceee8] overflow-hidden">
        <div className="grid md:grid-cols-2 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div key={index} className="p-4">
              <div className="w-[7%] h-[100px]">
                <img
                  src="https://refexrenewables.com/img/sun-logo-white.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="text-xl font-bold text-orange-500 uppercase mb-3">
                {value.title}
              </h4>
              <div className="mb-3 w-20 h-[1px] bg-[#FF6B35]"></div>
              <p className="text-gray-700 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
