import { useState, useEffect, useRef } from "react";

const Clients = () => {
  const clients = [
    {
      name: "Client 1",
      logo: "/img/home/clients-logo/client-logo1.png",
    },
    {
      name: "Client 2",
      logo: "/img/home/clients-logo/client-logo2.png",
    },
    {
      name: "Client 3",
      logo: "/img/home/clients-logo/client-logo3.png",
    },
    {
      name: "Client 4",
      logo: "/img/home/clients-logo/client-logo4.png",
    },
    {
      name: "Client 5",
      logo: "/img/home/clients-logo/client-logo5.png",
    },
    {
      name: "Client 6",
      logo: "/img/home/clients-logo/client-logo6.png",
    },
    {
      name: "Client 7",
      logo: "/img/home/clients-logo/client-logo7.png",
    },
    {
      name: "Client 8",
      logo: "/img/home/clients-logo/client-logo8.png",
    },
    {
      name: "Client 9",
      logo: "/img/home/clients-logo/client-logo9.png",
    },
    {
      name: "Client 10",
      logo: "/img/home/clients-logo/client-logo10.png",
    },
    {
      name: "Client 11",
      logo: "/img/home/clients-logo/client-logo11.png",
    },
    {
      name: "Client 12",
      logo: "/img/home/clients-logo/client-logo12.png",
    },
    {
      name: "Client 13",
      logo: "/img/home/clients-logo/client-logo13.png",
    },
    {
      name: "Client 14",
      logo: "/img/home/clients-logo/client-logo14.png",
    },
    {
      name: "Client 15",
      logo: "/img/home/clients-logo/client-logo15.png",
    },
    {
      name: "Client 16",
      logo: "/img/home/clients-logo/client-logo16.png",
    },
    {
      name: "Client 17",
      logo: "/img/home/clients-logo/client-logo17.png",
    },
    {
      name: "Client 18",
      logo: "/img/home/clients-logo/client-logo18.png",
    },
    {
      name: "Client 19",
      logo: "/img/home/clients-logo/client-logo19.png",
    },
    {
      name: "Client 20",
      logo: "/img/home/clients-logo/client-logo20.png",
    },
    {
      name: "Client 21",
      logo: "/img/home/clients-logo/client-logo21.png",
    },
    {
      name: "Client 22",
      logo: "/img/home/clients-logo/client-logo22.png",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Group clients into slides of 8
  const slidesData = [];
  for (let i = 0; i < clients.length; i += 8) {
    slidesData.push(clients.slice(i, i + 8));
  }

  const totalSlides = slidesData.length;

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isDragging, totalSlides]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = x - startX;
    setTranslateX(walk);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = x - startX;
    setTranslateX(walk);
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    // Determine if we should move to next/previous slide
    if (translateX < -100 && currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (translateX > 100 && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }

    setTranslateX(0);
  };

  return (
    <section id="clients" data-section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Clients
            </h2>
          </div>

          <div className="relative overflow-hidden">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
              style={{
                transform: `translateX(calc(-${
                  currentSlide * 100
                }% + ${translateX}px))`,
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleDragEnd}
            >
              {slidesData.map((slideClients, slideIndex) => (
                <div key={slideIndex} className="min-w-full flex-shrink-0">
                  <div className="space-y-12">
                    {/* First Row - 4 logos */}
                    <div className="grid grid-cols-4 gap-8">
                      {slideClients.slice(0, 4).map((client, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center w-[250px]"
                        >
                          <img
                            src={client.logo}
                            alt={client.name}
                            className="max-w-full max-h-full object-contain"
                            draggable="false"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Second Row - 4 logos */}
                    <div className="grid grid-cols-4 gap-8">
                      {slideClients.slice(4, 8).map((client, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center w-[250px]"
                        >
                          <img
                            src={client.logo}
                            alt={client.name}
                            className="max-w-full max-h-full object-contain"
                            draggable="false"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
