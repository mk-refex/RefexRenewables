export default function AboutSlogan() {
  return (
    <section
      id="about-slogan"
      className="relative py-20 bg-gradient-to-b from-white to-orange-50 onverflow-visible"
    >
      <div className="container text-center flex flex-col items-center">
        <div className="w-[4%] h-[100px]">
          <img
            src="/img/sun-logo-white.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">
          About Us
        </h2>
        <div className="space-y-4">
          <h3 className="text-3xl lg:text-4xl font-extrabold text-orange-500">
            Protecting The Planet
          </h3>
          <h3 className="text-3xl lg:text-4xl font-extrabold text-orange-500">
            Isn't Just A Mission; It's A Responsibility Embraced
          </h3>
        </div>
      </div>

      <div
        className="absolute top-0 left-0 w-[25%] h-48"
        style={{
          transform: "rotate(-90deg)",
          // transform:
          //   "translate(0px, -11px) matrix(0, -1, -1, 1, 0, 0, -91) rotate(-180deg)",
          // transition: "transform 1.1s cubic-bezier(0.27, 0.93, 0.92, 0.87)",
          // willChange: "transform",
          // visibility: "inherit",
          // opacity: 1,
        }}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-orange-500 mb-8">
          Our Heritage
        </h2>
      </div>
      <div className="absolute bottom-0 left-[7.5%] w-px h-32 bg-black z-index-3"></div>

      <div className="absolute bottom-0 right-0 w-[13%] opacity-[0.4]">
        <img
          src="/img/triangle-right.png"
          alt=""
          className="max-w-[100%] h-auto object-contain"
        />
      </div>
    </section>
  );
}
