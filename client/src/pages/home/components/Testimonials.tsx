import { useState, useEffect, useRef } from 'react';

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      text: "When I decided to start using Solar Energy, I was approached by many companies but I chose Refex Renewables as they are reliable, the water pumps work well and I am very satisfied.",
      author: "OVR Somasundaram",
      location: "Pollachi, Tamil Nadu"
    },
    {
      text: "With Refex Renewables's solar water pumps, I've seen a four fold increase in my income. Our lives have completely been transformed. From the bottom of our hearts we thank Refex Renewables.",
      author: "Satisfied Customer",
      location: "India"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    setTranslateX(walk);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (translateX > 100) {
      setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    } else if (translateX < -100) {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }
    setTranslateX(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setTranslateX(0);
    }
  };

  return (
    <section id="testimonials" data-section className="relative py-32 overflow-hidden h-[105vh] homeTestimonials" ref={sectionRef}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://static.readdy.ai/image/d0ead66ce635a168f1e83b108be94826/466afa88e148739006516fa46801891e.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/60"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div 
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-black mb-4">
              Testimonials
            </h2>
          </div>

          <div 
            ref={containerRef}
            className={`overflow-hidden cursor-grab active:cursor-grabbing transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(calc(-${activeTestimonial * 100}% + ${translateX}px))` 
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="min-w-full px-4"
                >
                  <div className="max-w-4xl mx-auto text-center">
                    <p className="text-2xl lg:text-3xl text-black leading-relaxed mb-12 font-light">
                      {testimonial.text}
                    </p>
                    <div className="border-t-2 border-black w-24 mx-auto mb-8"></div>
                    <div>
                      <p className="font-bold text-black text-xl mb-2">
                        {testimonial.author}
                      </p>
                      <p className="text-black/80 text-lg">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center space-x-3 mt-16">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  activeTestimonial === index ? 'bg-black w-8' : 'bg-black/30 hover:bg-black/50'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
