export default function Presence() {
  return (
    <section id="presence" className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">Our Presence</h2>
            <div className="flex justify-center">
              <img 
                src="https://refexrenewables.com/img/about/map.png" 
                alt="Our Presence Map" 
                className="w-full max-w-lg h-auto"
              />
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">State-wise</h2>
            <div className="flex justify-center">
              <img 
                src="https://refexrenewables.com/img/about/state-img.png" 
                alt="State-wise Presence" 
                className="w-full max-w-lg h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
