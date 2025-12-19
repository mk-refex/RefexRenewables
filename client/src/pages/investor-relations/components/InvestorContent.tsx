import { useState, useEffect, useRef } from "react";

const API_URL = (import.meta as any).env?.VITE_API_URL || "";

interface InvestorContentData {
  id: number;
  categoryId: string;
  categoryName: string;
  content: {
    sections: Array<{
      heading: string;
      items: Array<{
        name: string;
        fileUrl?: string;
        isStaticContent?: boolean;
        staticContent?: string;
      }>;
    }>;
  };
}

interface LegacyTimelineItem {
  id: number;
  year: string;
  type: "orange" | "white";
  text: string;
  arrowImage: string | null;
  align: "left" | "right";
}

// Timeline Item Component (extracted to properly use hooks)
function TimelineItem({
  item,
  index,
}: {
  item: LegacyTimelineItem;
  index: number;
}) {
  const [itemInView, setItemInView] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setItemInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  // Determine arrow direction based on arrow image
  // Orange arrows point DOWN (text below), white arrows point UP (text above)
  const isOrangeArrow = item.arrowImage?.includes("orange-arrow");
  const isWhiteArrow = item.arrowImage?.includes("white-arrow");
  const arrowPointsDown = isOrangeArrow;
  const textPosition = arrowPointsDown ? "below" : "above";

  // Fixed heights - MUST be same for ALL columns
  const TOP_SECTION_HEIGHT = "h-48"; // 192px - SAME for all columns
  const MIDDLE_SECTION_HEIGHT = "h-16"; // 64px - SAME for all columns (timeline line + arrow)
  const BOTTOM_SECTION_HEIGHT = "h-48"; // 192px - SAME for all columns

  return (
    <div
      ref={itemRef}
      className={`flex flex-col items-center transition-all duration-700 w-full relative ${
        itemInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* TOP SECTION - Circle above timeline (orange) or text above (when arrow points up) */}
      <div
        className={`${TOP_SECTION_HEIGHT} w-full flex flex-col items-center justify-center`}
      >
        {item.type === "orange" ? (
          // Orange circle always above timeline
          <div className="w-36 h-36 rounded-full flex items-center justify-center bg-orange-500 transition-all duration-500 hover:scale-110">
            <span className="font-bold text-white" style={{ fontSize: "28px" }}>
              {item.year}
            </span>
          </div>
        ) : textPosition === "above" ? (
          // Text above timeline (for white type with arrow pointing up)
          <div className="text-center px-2 w-full">
            <p className="text-gray-700 leading-relaxed text-sm">{item.text}</p>
          </div>
        ) : (
          // Empty space
          <div></div>
        )}
      </div>

      {/* MIDDLE SECTION - Timeline line + Arrow */}
      <div
        className={`${MIDDLE_SECTION_HEIGHT} w-full flex items-center justify-center relative`}
      >
        {/* Arrow/connector - centered on timeline */}
        {item.arrowImage && (
          <div
            className="flex-shrink-0 z-10"
            style={isWhiteArrow ? { marginTop: "-16%" } : {}}
          >
            <img
              src={item.arrowImage}
              alt="arrow"
              className={
                isWhiteArrow
                  ? "h-[52px] transition-transform duration-500 hover:scale-110"
                  : "h-12 transition-transform duration-500 hover:scale-110"
              }
            />
          </div>
        )}
      </div>

      {/* BOTTOM SECTION - Circle below timeline (white) or text below (when arrow points down) */}
      <div
        className={`${BOTTOM_SECTION_HEIGHT} w-full flex flex-col items-center justify-center`}
      >
        {item.type === "white" ? (
          // White circle always below timeline
          <div className="w-36 h-36 rounded-full flex items-center justify-center bg-white transition-all duration-500 hover:scale-110">
            <span
              className="font-bold text-orange-500"
              style={{ fontSize: "28px" }}
            >
              {item.year}
            </span>
          </div>
        ) : textPosition === "below" ? (
          // Text below timeline (for orange type with arrow pointing down)
          <div className="text-center px-2 w-full">
            <p className="text-gray-700 leading-relaxed text-sm">{item.text}</p>
          </div>
        ) : (
          // Empty space
          <div></div>
        )}
      </div>
    </div>
  );
}

// Static legacy timeline data
const STATIC_LEGACY_TIMELINE: LegacyTimelineItem[] = [
  {
    id: 1,
    year: "1959",
    type: "orange",
    text: "Refex Renewables started its journey as Monsanto Electronic Materials Company (MEMC), a silicon wafer manufacturing organization in 1959 to serve the emerging electronics industry.",
    arrowImage: "/img/orange-arrow-lg.png",
    align: "left",
  },
  {
    id: 2,
    year: "1960",
    type: "white",
    text: "In 1960, MEMC started its production of Silicon ingots at its location in St. Peters, Missouri followed by another production unit in Kuala Lumpur, Malaysia in 1970.",
    arrowImage: "/img/white-arrow-lg.png",
    align: "left",
  },
  {
    id: 3,
    year: "2006",
    type: "orange",
    text: "In 2006, MEMC entered in the solar market by signing agreement with China based Suntech Power and Taiwan-based Gintech Energy.",
    arrowImage: "/img/orange-arrow-md-lg.png",
    align: "left",
  },
  {
    id: 4,
    year: "2009",
    type: "white",
    text: "In 2009, MEMC and Q cells formed a joint venture to commission a 50 MW solar photovoltaic plant in Bavaria, Germany.",
    arrowImage: "/img/white-arrow-lg.png",
    align: "left",
  },
  {
    id: 5,
    year: "2009",
    type: "orange",
    text: "In November 2009, MEMC acquired North America’s largest solar energy service provider, Refex Renewables LLC.",
    arrowImage: "/img/orange-arrow-lg-end.png",
    align: "left",
  },
];

export default function InvestorContent() {
  const [activeTab, setActiveTab] = useState<string>("");
  const [expandedYears, setExpandedYears] = useState<{
    [key: string]: boolean;
  }>({});
  const [isVisible, setIsVisible] = useState(false);
  const [legacyInView, setLegacyInView] = useState(false);
  const [investorContent, setInvestorContent] = useState<InvestorContentData[]>(
    []
  );
  const [legacyTimeline] = useState<LegacyTimelineItem[]>(
    STATIC_LEGACY_TIMELINE
  );
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const legacyRef = useRef<HTMLDivElement>(null);

  // Fetch investor content from database
  useEffect(() => {
    const fetchInvestorContent = async () => {
      try {
        setLoading(true);
        const contentResponse = await fetch(`${API_URL}/api/investor-content`);

        if (contentResponse.ok) {
          const contentData = await contentResponse.json();
          setInvestorContent(contentData);

          // Select first category when content loads
          if (contentData.length > 0) {
            setActiveTab(contentData[0].categoryId);

            // Expand first section of every category by default
            const expanded: { [key: string]: boolean } = {};
            contentData.forEach((category: InvestorContentData) => {
              if (category.content.sections.length > 0) {
                const firstSection = category.content.sections[0];
                // Only expand if section has a heading (not empty)
                if (
                  firstSection.heading &&
                  firstSection.heading.trim() !== ""
                ) {
                  expanded[firstSection.heading] = true;
                }
              }
            });
            setExpandedYears(expanded);
          }
        }
      } catch (error) {
        console.error("Error fetching investor content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestorContent();
  }, []);

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLegacyInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (legacyRef.current) {
      observer.observe(legacyRef.current);
    }

    return () => {
      if (legacyRef.current) {
        observer.unobserve(legacyRef.current);
      }
    };
  }, []);

  // Generate tabs from fetched content
  const tabs = investorContent.map((content) => ({
    id: content.categoryId,
    label: content.categoryName,
  }));

  // Get current active content
  const currentContent = investorContent.find(
    (content) => content.categoryId === activeTab
  );

  const toggleYear = (year: string) => {
    setExpandedYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));
  };

  // Expand first section when switching to a different category
  useEffect(() => {
    if (currentContent && currentContent.content.sections.length > 0) {
      const firstSection = currentContent.content.sections[0];
      // Only auto-expand if section has a heading and is not already expanded
      if (
        firstSection.heading &&
        firstSection.heading.trim() !== "" &&
        !expandedYears[firstSection.heading]
      ) {
        setExpandedYears((prev) => ({
          ...prev,
          [firstSection.heading]: true,
        }));
      }
    }
  }, [activeTab]);

  return (
    <section id="content" className="bg-orange-50 pt-16" ref={sectionRef}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div
              className={`lg:col-span-1 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-20"
              }`}
            >
              <div className="bg-white rounded-lg shadow-xl overflow-hidden sticky top-24 py-6 border-b-4 border-[#df6420]">
                <div className="space-y-0">
                  {tabs.map((tab) => (
                    <div
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-1 text-sm font-bold transition-all duration-300 cursor-pointer flex items-center ${
                        activeTab === tab.id
                          ? "text-[#df6420]"
                          : "text-gray-700 hover:text-[#df6420]"
                      }`}
                    >
                      <i className="fa fa-angle-right mr-2"></i>
                      {tab.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div
              className={`lg:col-span-2 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-20"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <i className="ri-loader-4-line text-4xl text-orange-500 mb-3 animate-spin"></i>
                    <p className="text-gray-500">Loading content...</p>
                  </div>
                </div>
              ) : currentContent ? (
                <div>
                  <div className="mb-8">
                    <h2 className="investor-category-title text-[3rem] font-bold text-black relative">
                      {currentContent.categoryName}
                    </h2>
                  </div>

                  {/* Check if there's only one section with no heading - show items directly */}
                  {currentContent.content.sections.length === 1 &&
                  (!currentContent.content.sections[0].heading ||
                    currentContent.content.sections[0].heading.trim() ===
                      "") ? (
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 space-y-4">
                      {currentContent.content.sections[0].items.map(
                        (item, itemIndex) =>
                          item.isStaticContent && item.staticContent ? (
                            <div
                              key={itemIndex}
                              className="text-gray-700 prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{
                                __html: item.staticContent,
                              }}
                            />
                          ) : item.fileUrl ? (
                            <a
                              key={itemIndex}
                              href={item.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between hover:bg-gray-100 p-2 rounded transition-colors duration-300 cursor-pointer block"
                            >
                              <span className="text-gray-700 hover:text-orange-500 transition-colors">
                                {item.name}
                              </span>
                              <i className="ri-file-pdf-line text-orange-500 text-2xl transition-transform duration-300 hover:scale-110"></i>
                            </a>
                          ) : (
                            <div
                              key={itemIndex}
                              className="flex items-center justify-between hover:bg-gray-100 p-2 rounded transition-colors duration-300"
                            >
                              <span className="text-gray-700">{item.name}</span>
                              <i className="ri-file-pdf-line text-orange-500 text-2xl"></i>
                            </div>
                          )
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {currentContent.content.sections.map(
                        (section, sectionIndex) => (
                          <div
                            key={sectionIndex}
                            className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
                            style={{
                              animationDelay: `${sectionIndex * 150}ms`,
                              animation:
                                "slideInFromRight 0.8s ease-out forwards",
                              opacity: 0,
                            }}
                          >
                            <button
                              onClick={() => toggleYear(section.heading)}
                              className="w-full bg-orange-500 text-white px-6 py-4 flex items-center justify-between font-semibold hover:bg-orange-600 transition-all duration-300 cursor-pointer"
                            >
                              <span>{section.heading}</span>
                              <i
                                className={`ri-arrow-down-s-line transition-transform duration-300 ${
                                  expandedYears[section.heading]
                                    ? "rotate-180"
                                    : ""
                                }`}
                              ></i>
                            </button>
                            <div
                              className={`transition-all duration-500 ease-in-out ${
                                expandedYears[section.heading]
                                  ? "opacity-100"
                                  : "max-h-0 opacity-0"
                              }`}
                            >
                              <div className="p-6 bg-gray-50 space-y-4">
                                {section.items.map((item, itemIndex) =>
                                  item.isStaticContent && item.staticContent ? (
                                    <div
                                      key={itemIndex}
                                      className="text-gray-700 prose prose-sm max-w-none"
                                      dangerouslySetInnerHTML={{
                                        __html: item.staticContent,
                                      }}
                                    />
                                  ) : item.fileUrl ? (
                                    <a
                                      key={itemIndex}
                                      href={item.fileUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-between hover:bg-gray-100 p-2 rounded transition-colors duration-300 cursor-pointer block"
                                    >
                                      <span className="text-gray-700 hover:text-orange-500 transition-colors">
                                        {item.name}
                                      </span>
                                      <i className="ri-file-pdf-line text-orange-500 text-2xl transition-transform duration-300 hover:scale-110"></i>
                                    </a>
                                  ) : (
                                    <div
                                      key={itemIndex}
                                      className="flex items-center justify-between hover:bg-gray-100 p-2 rounded transition-colors duration-300"
                                    >
                                      <span className="text-gray-700">
                                        {item.name}
                                      </span>
                                      <i className="ri-file-pdf-line text-orange-500 text-2xl"></i>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="transition-all duration-500 animate-fadeIn">
                  <div className="mb-8">
                    <h2 className="investor-category-title text-[3rem] font-bold text-black relative">
                      {tabs.find((t) => t.id === activeTab)?.label || "Content"}
                    </h2>
                  </div>
                  <p className="text-gray-600">
                    No content available for this section.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Legacy Section */}
      <div className="container mt-16">
        <div
          ref={legacyRef}
          className={`mx-auto bg-orange-100 rounded-lg py-12 transition-all duration-1000 ${
            legacyInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-20"
          }`}
        >
          <div className="px-6 lg:px-12">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              Refex Renewables Legacy
            </h2>

            <div className="relative">
              <div className="grid grid-cols-5 relative z-10">
                {legacyTimeline.length === 0 ? (
                  <div className="col-span-5 text-center text-gray-500 py-8">
                    No legacy timeline data available.
                  </div>
                ) : (
                  legacyTimeline.map((item, index) => (
                    <TimelineItem key={item.id} item={item} index={index} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        /* Static content styling */
        .prose p {
          margin-bottom: 1em;
          line-height: 1.6;
        }

        .prose strong {
          font-weight: 600;
        }

        .prose em {
          font-style: italic;
        }

        .prose ol, .prose ul {
          margin-left: 1.5em;
          margin-bottom: 1em;
        }

        .prose li {
          margin-bottom: 0.5em;
        }

        .prose a {
          color: #df6420;
          text-decoration: underline;
        }

        .prose a:hover {
          color: #c5541a;
        }

        /* Category title underline */
        .investor-category-title {
          font-family: sans-serif;
        }

        .investor-category-title::after {
          content: '';
          position: absolute;
          width: 110px;
          height: 1px;
          background: #df6420;
          top: 70px;
          left: 0;
        }
      `}</style>
    </section>
  );
}
