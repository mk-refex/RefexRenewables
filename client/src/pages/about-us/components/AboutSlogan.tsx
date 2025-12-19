export default function AboutSlogan() {
  return (
    <section id="about-slogan" className="relative py-20 bg-gradient-to-b from-white to-orange-50 overflow-hidden">
      <div className="absolute top-20 right-0 w-48 h-48 opacity-10">
        <img src="https://refexrenewables.com/img/triangle-right.png" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">About Us</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          <h3 className="text-3xl lg:text-5xl font-extrabold text-orange-500">
            Protecting The Planet
          </h3>
          <h3 className="text-3xl lg:text-5xl font-extrabold text-orange-500">
            Isn't Just A Mission; It's A Responsibility Embraced
          </h3>
        </div>
      </div>
    </section>
  );
}
