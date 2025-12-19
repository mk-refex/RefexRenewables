import { useState, useEffect } from 'react';

const API_URL = (import.meta as any).env?.VITE_API_URL || '';

interface TitleItem {
  text: string;
  size: 'small' | 'normal';
  order: number;
}

interface HeroData {
  id: number;
  imageUrl: string | null;
  text?: string | null; // Legacy support
  titleItems?: TitleItem[];
}

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData>({
    id: 0,
    imageUrl: null,
    titleItems: [
      { text: 'Investor', size: 'small', order: 0 },
      { text: '& Relations', size: 'normal', order: 1 }
    ]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/investor-hero`);
        if (response.ok) {
          const data = await response.json();
          setHeroData(data);
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  const scrollToContent = () => {
    const nextSection = document.querySelector('#content');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render title items based on size
  const renderTitleItems = () => {
    // Use titleItems if available and not empty
    if (heroData.titleItems && Array.isArray(heroData.titleItems) && heroData.titleItems.length > 0) {
      // Sort by order to ensure correct display order
      const sortedItems = [...heroData.titleItems].sort((a, b) => (a.order || 0) - (b.order || 0));
      
      return sortedItems.map((item, index) => {
        const sizeClass = item.size === 'small' 
          ? 'text-3xl md:text-4xl font-light' 
          : 'text-5xl md:text-7xl font-light';
        
        return (
          <span key={index} className={sizeClass}>
            {item.text}
            {index < sortedItems.length - 1 && <span> </span>}
          </span>
        );
      });
    }
    
    // Fallback to legacy text if titleItems not available
    if (heroData.text) {
      return <span className="text-5xl md:text-7xl font-light">{heroData.text}</span>;
    }
    
    // Final fallback to default
    return (
      <>
        <span className="text-3xl md:text-4xl font-light">Investor</span>
        <span> </span>
        <span className="text-5xl md:text-7xl font-light">& Relations</span>
      </>
    );
  };

  if (loading) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <i className="ri-loader-4-line text-4xl text-orange-500 mb-3 animate-spin"></i>
          <p className="text-gray-500">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: heroData.imageUrl ? `url(${heroData.imageUrl})` : undefined,
        backgroundColor: heroData.imageUrl ? undefined : '#f3f4f6'
      }}
    >
      <div className="relative z-10 text-center px-6">
        <h1 className="text-black mb-8 flex flex-wrap items-center justify-center gap-2">
          {renderTitleItems()}
        </h1>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4">
        <div className="w-px h-32 bg-black"></div>
        <button
          onClick={scrollToContent}
          className="w-10 h-10 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center cursor-pointer hover:bg-orange-500 transition-all duration-300 group"
          aria-label="Scroll to content"
        >
          <i className="ri-arrow-down-s-fill text-xl text-black group-hover:text-white w-6 h-6 flex items-center justify-center"></i>
        </button>
      </div>
    </section>
  );
}
