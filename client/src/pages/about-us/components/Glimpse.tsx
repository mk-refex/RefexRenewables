export default function Glimpse() {
  const values = [
    {
      title: 'Principled Excellence',
      description: 'A commitment to high performance that is always grounded in strong, non-negotiable values.'
    },
    {
      title: 'Authenticity',
      description: 'Emphasizes being genuine and true to foster trust and transparency.'
    },
    {
      title: 'Customer Value',
      description: 'A commitment to deliver exceptional value to our customers by understanding their needs, providing innovative solutions, and consistently offering high-quality products and services. A focus on creating lasting relationships built on trust, satisfaction and mutual success.'
    },
    {
      title: 'Esteem Culture',
      description: 'A core belief that every individual deserves respect, recognition, and the opportunity to grow. A commitment to foster a culture where people feel valued, heard, and empowered to do their best work.'
    }
  ];

  return (
    <section id="glimpse" className="relative py-20 bg-gradient-to-b from-white to-orange-50 overflow-hidden">
      <div className="absolute top-0 left-0 w-48 h-48 opacity-10">
        <img src="https://refexrenewables.com/img/triangle-left.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10">
        <img src="https://refexrenewables.com/img/triangle-right.png" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">A Glimpse of OUR FIRSTS</h2>
        </div>

        <div className="flex justify-center mb-16">
          <div className="w-full max-w-2xl">
            <img 
              src="https://refexrenewables.com/img/about/glimps-img.png" 
              alt="Solar Energy Transformation" 
              className="w-full h-auto rounded-full shadow-2xl"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-bold text-orange-500 uppercase mb-4">
                {value.title}
              </h4>
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
