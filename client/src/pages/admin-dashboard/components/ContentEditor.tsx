import { useState, useEffect } from 'react';

const API_URL = (import.meta as any).env?.VITE_API_URL || '';

interface ContentEditorProps {
  selectedPage: string;
}

interface TeamMember {
  name: string;
  position: string;
  image: string;
  bio: string;
}

interface InvestorCategory {
  title: string;
  sections: {
    heading: string;
    pdfs: {
      name: string;
      url: string;
    }[];
  }[];
}

interface ClientLogo {
  name: string;
  logo: string;
}

interface Testimonial {
  text: string;
  author: string;
}

interface InvestorPDF {
  id: string;
  name: string;
  url: string;
  isStaticContent?: boolean; // If true, show static content instead of PDF
  staticContent?: string; // HTML content for static text
}

interface InvestorSection {
  id: string;
  heading: string;
  pdfs: InvestorPDF[];
}

interface InvestorCategory {
  id: string;
  title: string;
  sections: InvestorSection[];
}

interface HeaderContent {
  logo: {
    imageUrl: string;
    altText: string;
  };
  navLinks: Array<{
    label: string;
    url: string;
  }>;
}

interface FooterContent {
  registeredOffice: {
    companyName: string;
    cin: string;
    address: string;
  };
  navigation: {
    aboutUs: string;
    whyGoSolar: string;
    contact: string;
    esopTestimonials: string;
  };
  services: {
    compressedBiogas: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  copyright: {
    text: string;
    updateNotice: string;
    termsLink: string;
    privacyLink: string;
    legalLink: string;
    maintainedBy: string;
    maintainedByLink: string;
  };
}

interface HeroTitleItem {
  id: string;
  title: string;
  isSmall: boolean;
}

interface HeroSlide {
  image: string;
  titleItems: HeroTitleItem[];
}

interface ContentData {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImages: string[];
  heroSlides?: HeroSlide[];
  heroTitleItems?: HeroTitleItem[];
  clientLogos?: Array<{ name: string; logo: string }>;
  testimonials?: Testimonial[];
  services?: Array<{ image: string; title: string; description: string; link: string }>;
}

export default function ContentEditor({ selectedPage }: ContentEditorProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [saved, setSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Team members state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // Board members state
  const [boardMembers, setBoardMembers] = useState<TeamMember[]>([]);

  // Audit committee members state
  const [auditMembers, setAuditMembers] = useState<TeamMember[]>([]);

  // Nomination & Remuneration committee members state
  const [nominationMembers, setNominationMembers] = useState<TeamMember[]>([]);

  // Stakeholders Relationship committee members state
  const [stakeholdersMembers, setStakeholdersMembers] = useState<TeamMember[]>([]);

  // Investor Relations state
  const [investorCategories, setInvestorCategories] = useState<InvestorCategory[]>([]);
  const [loadingInvestorContent, setLoadingInvestorContent] = useState(false);
  interface TitleItem {
    text: string;
    size: 'small' | 'normal';
    order: number;
  }

  const [investorHero, setInvestorHero] = useState<{ imageUrl: string | null; titleItems: TitleItem[] }>({
    imageUrl: null,
    titleItems: [
      { text: 'Investor', size: 'small', order: 0 },
      { text: '& Relations', size: 'normal', order: 1 }
    ]
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  // Add state for selected category
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Header content state
  const [headerContent, setHeaderContent] = useState<HeaderContent>({
    logo: {
      imageUrl: 'https://refexrenewables.com/img/logo.png',
      altText: 'Refex Renewables'
    },
    navLinks: [
      { label: 'Home', url: '/' },
      { label: 'About Us', url: '/about-us' },
      { label: 'Investor Relations', url: '/investor-relations' },
      { label: 'Contact', url: '/contact' }
    ]
  });

  // Footer content state
  const [footerContent, setFooterContent] = useState<FooterContent>({
    registeredOffice: {
      companyName: 'REFEX RENEWABLES & INFRASTRUCTURE LIMITED',
      cin: 'L40108TN2021PLC142396',
      address: 'No. 5, Cenotaph Road, Teynampet, Chennai - 600 018, Tamil Nadu, India'
    },
    navigation: {
      aboutUs: '/about-us',
      whyGoSolar: '/why-go-solar',
      contact: '/contact',
      esopTestimonials: 'https://www.refex.group/careers/?slide=4'
    },
    services: {
      compressedBiogas: '/cbg-production'
    },
    contact: {
      phone: '1800 102 0765',
      email: 'cs@refexrenewables.com'
    },
    copyright: {
      text: 'REFEX RENEWABLES © 2025 All Rights Reserved.',
      updateNotice: 'This website is in the process of being updated',
      termsLink: '/terms-conditions',
      privacyLink: '/privacy-policy',
      legalLink: '/legal-disclaimer',
      maintainedBy: 'Sharajman Technologies',
      maintainedByLink: 'https://sharajman.com/'
    }
  });

  // Content state
  const [content, setContent] = useState<ContentData>({
    heroTitle: '',
    heroSubtitle: '',
    heroDescription: '',
    heroImages: [''],
    heroSlides: [],
    heroTitleItems: [],
    clientLogos: []
  });

  // Define sections based on the selected page
  const getSections = () => {
    if (!selectedPage) return [];
    
    const pageSections: Record<string, string[]> = {
      'Header (Global)': ['Logo', 'Nav Links'],
      'Footer (Global)': ['Registered Office', 'Navigation Links', 'Services', 'Contact Info', 'Copyright & Legal'],
      'Home': ['Hero', 'About', 'Services', 'Solar Energy', 'Clients', 'Testimonials'],
      'About Us': ['Hero', 'Company Info', 'Vision & Mission', 'Presence', 'Glimpse', 'About Slogan'],
      'Our Team': ['Hero', 'Team Members'],
      'Board of Directors': ['Hero', 'Board Members'],
      'Audit Committee': ['Hero', 'Committee Members'],
      'Nomination & Remuneration Committee': ['Hero', 'Committee Members'],
      'Stakeholders Relationship Committee': ['Hero', 'Committee Members'],
      'Working at Refex': ['Hero', 'Working Content'],
      'Investor Relations': ['Hero', 'Investor Content'],
      'Why Go Solar': ['Hero', 'Solar Content'],
      'CBG Production': ['Hero', 'CBG Content'],
      'Contact': ['Hero', 'Contact Details'],
      'Privacy Policy': ['Hero', 'Privacy Content'],
      'Terms & Conditions': ['Hero', 'Terms Content'],
      'Legal Disclaimer': ['Hero', 'Legal Content'],
    };

    return pageSections[selectedPage] || [];
  };

  const sections = getSections();

  // Fetch investor content and hero from database
  useEffect(() => {
    if (selectedPage === 'Investor Relations') {
      const fetchInvestorData = async () => {
        try {
          setLoadingInvestorContent(true);
          const token = localStorage.getItem('token');
          const [contentResponse, heroResponse] = await Promise.all([
            fetch(`${API_URL}/api/investor-content`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }),
            fetch(`${API_URL}/api/investor-hero`)
          ]);

          if (contentResponse.ok) {
            const data = await contentResponse.json();
            // Transform database structure to local state structure
            const transformed = data.map((item: any) => ({
              id: item.categoryId,
              title: item.categoryName,
              sections: item.content.sections.map((section: any, idx: number) => ({
                id: `${item.categoryId}-${idx}`,
                heading: section.heading,
                pdfs: section.items.map((item: any, itemIdx: number) => ({
                  id: `${item.categoryId}-${idx}-${itemIdx}`,
                  name: item.name,
                  url: item.fileUrl || '',
                  isStaticContent: item.isStaticContent || false,
                  staticContent: item.staticContent || '',
                })),
              })),
            }));
            setInvestorCategories(transformed);
          }

          if (heroResponse.ok) {
            const heroData = await heroResponse.json();
            setInvestorHero({
              imageUrl: heroData.imageUrl,
              titleItems: heroData.titleItems || [
                { text: 'Investor', size: 'small', order: 0 },
                { text: '& Relations', size: 'normal', order: 1 }
              ]
            });
          }
        } catch (error) {
          console.error('Error fetching investor data:', error);
        } finally {
          setLoadingInvestorContent(false);
        }
      };

      fetchInvestorData();
    }
  }, [selectedPage]);

  // Also fetch hero data when switching to Hero section
  useEffect(() => {
    if (selectedPage === 'Investor Relations') {
      const currentSection = sections[activeSection];
      if (currentSection === 'Hero') {
        const fetchHeroData = async () => {
          try {
            const heroResponse = await fetch(`${API_URL}/api/investor-hero`);
            if (heroResponse.ok) {
            const heroData = await heroResponse.json();
            setInvestorHero({
              imageUrl: heroData.imageUrl,
              titleItems: heroData.titleItems || [
                { text: 'Investor', size: 'small', order: 0 },
                { text: '& Relations', size: 'normal', order: 1 }
              ]
            });
            }
          } catch (error) {
            console.error('Error fetching investor hero:', error);
          }
        };

        fetchHeroData();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPage, activeSection]);

  useEffect(() => {
    if (selectedPage === 'Header (Global)') {
      // Load header content from localStorage
      const savedHeaderContent = localStorage.getItem('header_content');
      if (savedHeaderContent) {
        setHeaderContent(JSON.parse(savedHeaderContent));
      }
    } else if (selectedPage === 'Footer (Global)') {
      // Load footer content from localStorage
      const savedFooterContent = localStorage.getItem('footer_content');
      if (savedFooterContent) {
        setFooterContent(JSON.parse(savedFooterContent));
      }
    } else if (selectedPage === 'Our Team') {
      // Load team members from localStorage
      const savedTeamMembers = localStorage.getItem('team_members');
      if (savedTeamMembers) {
        setTeamMembers(JSON.parse(savedTeamMembers));
      }
      const savedContent = localStorage.getItem(`page_${selectedPage}_section_${sections[activeSection]}`);
      if (savedContent) {
        const parsed = JSON.parse(savedContent);
        setContent({
          heroTitle: parsed.heroTitle || '',
          heroSubtitle: parsed.heroSubtitle || '',
          heroDescription: parsed.heroDescription || '',
          heroImages: Array.isArray(parsed.heroImages) ? parsed.heroImages : [''],
        });
      } else {
        setContent({
          heroTitle: '',
          heroSubtitle: '',
          heroDescription: '',
          heroImages: [''],
        });
      }
    } else if (selectedPage === 'Board of Directors') {
      const savedBoardMembers = localStorage.getItem('board_members');
      if (savedBoardMembers) {
        setBoardMembers(JSON.parse(savedBoardMembers));
      }
      const savedContent = localStorage.getItem(`page_${selectedPage}_section_${sections[activeSection]}`);
      if (savedContent) {
        const parsed = JSON.parse(savedContent);
        setContent({
          heroTitle: parsed.heroTitle || '',
          heroSubtitle: parsed.heroSubtitle || '',
          heroDescription: parsed.heroDescription || '',
          heroImages: Array.isArray(parsed.heroImages) ? parsed.heroImages : [''],
        });
      } else {
        setContent({
          heroTitle: '',
          heroSubtitle: '',
          heroDescription: '',
          heroImages: [''],
        });
      }
    } else if (selectedPage === 'Audit Committee') {
      const savedAuditMembers = localStorage.getItem('audit_members');
      if (savedAuditMembers) {
        setAuditMembers(JSON.parse(savedAuditMembers));
      }
      const savedContent = localStorage.getItem(`page_${selectedPage}_section_${sections[activeSection]}`);
      if (savedContent) {
        const parsed = JSON.parse(savedContent);
        setContent({
          heroTitle: parsed.heroTitle || '',
          heroSubtitle: parsed.heroSubtitle || '',
          heroDescription: parsed.heroDescription || '',
          heroImages: Array.isArray(parsed.heroImages) ? parsed.heroImages : [''],
        });
      } else {
        setContent({
          heroTitle: '',
          heroSubtitle: '',
          heroDescription: '',
          heroImages: [''],
        });
      }
    } else if (selectedPage === 'Nomination & Remuneration Committee') {
      const savedNominationMembers = localStorage.getItem('nomination_members');
      if (savedNominationMembers) {
        setNominationMembers(JSON.parse(savedNominationMembers));
      }
      const savedContent = localStorage.getItem(`page_${selectedPage}_section_${sections[activeSection]}`);
      if (savedContent) {
        const parsed = JSON.parse(savedContent);
        setContent({
          heroTitle: parsed.heroTitle || '',
          heroSubtitle: parsed.heroSubtitle || '',
          heroDescription: parsed.heroDescription || '',
          heroImages: Array.isArray(parsed.heroImages) ? parsed.heroImages : [''],
        });
      } else {
        setContent({
          heroTitle: '',
          heroSubtitle: '',
          heroDescription: '',
          heroImages: [''],
        });
      }
    } else if (selectedPage === 'Stakeholders Relationship Committee') {
      const savedStakeholdersMembers = localStorage.getItem('stakeholders_members');
      if (savedStakeholdersMembers) {
        setStakeholdersMembers(JSON.parse(savedStakeholdersMembers));
      }
      const savedContent = localStorage.getItem(`page_${selectedPage}_section_${sections[activeSection]}`);
      if (savedContent) {
        const parsed = JSON.parse(savedContent);
        setContent({
          heroTitle: parsed.heroTitle || '',
          heroSubtitle: parsed.heroSubtitle || '',
          heroDescription: parsed.heroDescription || '',
          heroImages: Array.isArray(parsed.heroImages) ? parsed.heroImages : [''],
        });
      } else {
        setContent({
          heroTitle: '',
          heroSubtitle: '',
          heroDescription: '',
          heroImages: [''],
        });
      }
    } else if (selectedPage) {
      // Load content from localStorage (temporary - will use Supabase)
      const savedContent = localStorage.getItem(`page_${selectedPage}_section_${sections[activeSection]}`);
      if (savedContent) {
        const parsed = JSON.parse(savedContent);
        // Ensure heroImages is always an array
        setContent({
          heroTitle: parsed.heroTitle || '',
          heroSubtitle: parsed.heroSubtitle || '',
          heroDescription: parsed.heroDescription || '',
          heroImages: Array.isArray(parsed.heroImages) ? parsed.heroImages : [''],
          heroTitleItems: Array.isArray(parsed.heroTitleItems) ? parsed.heroTitleItems : [],
          clientLogos: Array.isArray(parsed.clientLogos) ? parsed.clientLogos : [],
          testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : [],
          services: Array.isArray(parsed.services) ? parsed.services : []
        });
      } else {
        setContent({
          heroTitle: '',
          heroSubtitle: '',
          heroDescription: '',
          heroImages: selectedPage === 'Home' ? ['', '', ''] : [''],
          heroTitleItems: [],
          clientLogos: [],
          testimonials: [],
          services: []
        });
      }
    }
  }, [selectedPage, activeSection]);

  // Map page names to page IDs for permission checking
  const getPageIdFromName = (pageName: string): string | null => {
    const pageMap: Record<string, string> = {
      'Home': 'home',
      'About Us': 'about-us',
      'Our Team': 'our-team',
      'Board of Directors': 'board-of-directors',
      'Audit Committee': 'audit-committee',
      'Nomination & Remuneration Committee': 'nomination-remuneration-committee',
      'Stakeholders Relationship Committee': 'stakeholders-relationship-committee',
      'Working at Refex': 'working-at-refex',
      'Investor Relations': 'investor-relations',
      'Why Go Solar': 'why-go-solar',
      'CBG Production': 'cbg-production',
      'Contact': 'contact',
      'Privacy Policy': 'privacy-policy',
      'Terms & Conditions': 'terms-conditions',
      'Legal Disclaimer': 'legal-disclaimer',
      'Header (Global)': 'header',
      'Footer (Global)': 'footer',
    };
    return pageMap[pageName] || null;
  };

  // Check if user has access to the current page
  const checkPageAccess = (pageName: string): boolean => {
    const pageId = getPageIdFromName(pageName);
    if (!pageId) return false; // Unknown page, deny access

    const userStr = localStorage.getItem('user');
    if (!userStr) return false;

    try {
      const user = JSON.parse(userStr);
      // Admins have all access
      const isAdmin = user.role === 'admin' || user.permissions === null;
      if (isAdmin) return true;

      // Check if user has permission for this page
      return user.permissions && Array.isArray(user.permissions) && user.permissions.includes(pageId);
    } catch (e) {
      console.error('Error parsing user data:', e);
      return false;
    }
  };

  const handleSave = async () => {
    // Check if user has access to this page
    if (!checkPageAccess(selectedPage)) {
      alert(`You do not have permission to edit ${selectedPage}. Please contact an administrator.`);
      return;
    }

    if (selectedPage === 'Investor Relations' && sections[activeSection] === 'Hero') {
      // Save investor hero to database
      try {
        setSaved(false);
        const token = localStorage.getItem('token');
        
        if (!token) {
          alert('You must be logged in to save content. Please log in again.');
          return;
        }

        // When saving URL changes (no file upload), send as JSON
        // When uploading file, FormData is already sent during upload
        const response = await fetch(`${API_URL}/api/investor-hero`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            titleItems: investorHero.titleItems,
            imageUrl: investorHero.imageUrl || ''
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
          throw new Error(errorData.message || `Failed to save investor hero: ${response.status} ${response.statusText}`);
        }

        const savedData = await response.json();
        setInvestorHero({
          imageUrl: savedData.imageUrl,
          titleItems: savedData.titleItems || investorHero.titleItems
        });

        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        return;
      } catch (error: any) {
        console.error('Error saving investor hero:', error);
        alert(`Failed to save investor hero: ${error.message || 'Please try again.'}`);
        return;
      }
    }

    if (selectedPage === 'Investor Relations' && sections[activeSection] === 'Investor Content') {
      // Save investor content to database
      try {
        setSaved(false);
        const token = localStorage.getItem('token');
        
        if (!token) {
          alert('You must be logged in to save content. Please log in again.');
          return;
        }
        
        // First, fetch all existing categories from database to compare
        const existingResponse = await fetch(`${API_URL}/api/investor-content`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        let existingCategories: string[] = [];
        if (existingResponse.ok) {
          const existingData = await existingResponse.json();
          existingCategories = existingData.map((cat: any) => cat.categoryId);
        }

        // Get current category IDs from state
        const currentCategoryIds = investorCategories.map(cat => cat.id);

        // Delete categories that are in database but not in current state
        for (const existingCategoryId of existingCategories) {
          if (!currentCategoryIds.includes(existingCategoryId)) {
            const deleteResponse = await fetch(`${API_URL}/api/investor-content/${existingCategoryId}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });

            if (!deleteResponse.ok) {
              console.warn(`Failed to delete category ${existingCategoryId}`);
            }
          }
        }
        
        // Transform local state to database structure and save each category (in order)
        for (let index = 0; index < investorCategories.length; index++) {
          const category = investorCategories[index];
          const dbData = {
            categoryId: category.id,
            categoryName: category.title,
            content: {
              sections: category.sections.map((section, sectionIndex) => ({
                heading: section.heading,
                items: section.pdfs.map((pdf, pdfIndex) => ({
                  name: pdf.name,
                  fileUrl: pdf.url || undefined,
                  isStaticContent: pdf.isStaticContent || false,
                  staticContent: pdf.staticContent || undefined,
                })),
              })),
            },
            isActive: true,
            displayOrder: index, // Save order based on array index
          };

          const response = await fetch(`${API_URL}/api/investor-content`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dbData),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
            throw new Error(errorData.message || `Failed to save investor content: ${response.status} ${response.statusText}`);
          }
        }

        // Reload data from database to ensure sync
        const reloadResponse = await fetch(`${API_URL}/api/investor-content`);
        if (reloadResponse.ok) {
          const reloadData = await reloadResponse.json();
          const transformed = reloadData.map((item: any) => ({
            id: item.categoryId,
            title: item.categoryName,
            sections: item.content.sections.map((section: any, idx: number) => ({
              id: `${item.categoryId}-${idx}`,
              heading: section.heading || '',
              pdfs: section.items.map((item: any, itemIdx: number) => ({
                id: `${item.categoryId}-${idx}-${itemIdx}`,
                name: item.name || '',
                url: item.fileUrl || '',
                isStaticContent: item.isStaticContent || false,
                staticContent: item.staticContent || '',
              })),
            })),
          }));
          
          // Preserve selected category and expanded sections state
          const currentSelectedId = selectedCategoryId;
          const currentExpanded = expandedSections;
          
          setInvestorCategories(transformed);
          
          // Restore selected category if it still exists
          if (currentSelectedId && transformed.find(cat => cat.id === currentSelectedId)) {
            setSelectedCategoryId(currentSelectedId);
            // Restore expanded sections for the selected category
            const selectedCategory = transformed.find(cat => cat.id === currentSelectedId);
            if (selectedCategory) {
              const restoredExpanded: { [key: string]: boolean } = {};
              selectedCategory.sections.forEach((section: any) => {
                if (currentExpanded[section.id]) {
                  restoredExpanded[section.id] = true;
                }
              });
              if (Object.keys(restoredExpanded).length > 0) {
                setExpandedSections(prev => ({ ...prev, ...restoredExpanded }));
              }
            }
          }
        }

        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } catch (error: any) {
        console.error('Error saving investor content:', error);
        alert(`Failed to save investor content: ${error.message || 'Please try again.'}`);
      }
      return;
    }

    if (selectedPage === 'Header (Global)') {
      localStorage.setItem('header_content', JSON.stringify(headerContent));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else if (selectedPage === 'Footer (Global)') {
      localStorage.setItem('footer_content', JSON.stringify(footerContent));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else if (selectedPage === 'Our Team') {
      if (sections[activeSection] === 'Team Members') {
        localStorage.setItem('team_members', JSON.stringify(teamMembers));
      } else {
        localStorage.setItem(`page_${selectedPage}_section_${sections[activeSection]}`, JSON.stringify(content));
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else if (selectedPage === 'Board of Directors') {
      if (sections[activeSection] === 'Board Members') {
        localStorage.setItem('board_members', JSON.stringify(boardMembers));
      } else {
        localStorage.setItem(`page_${selectedPage}_section_${sections[activeSection]}`, JSON.stringify(content));
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else if (selectedPage === 'Audit Committee') {
      if (sections[activeSection] === 'Committee Members') {
        localStorage.setItem('audit_members', JSON.stringify(auditMembers));
      } else {
        localStorage.setItem(`page_${selectedPage}_section_${sections[activeSection]}`, JSON.stringify(content));
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else if (selectedPage === 'Nomination & Remuneration Committee') {
      if (sections[activeSection] === 'Committee Members') {
        localStorage.setItem('nomination_members', JSON.stringify(nominationMembers));
      } else {
        localStorage.setItem(`page_${selectedPage}_section_${sections[activeSection]}`, JSON.stringify(content));
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else if (selectedPage === 'Stakeholders Relationship Committee') {
      if (sections[activeSection] === 'Committee Members') {
        localStorage.setItem('stakeholders_members', JSON.stringify(stakeholdersMembers));
      } else {
        localStorage.setItem(`page_${selectedPage}_section_${sections[activeSection]}`, JSON.stringify(content));
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else if (selectedPage) {
      localStorage.setItem(`page_${selectedPage}_section_${sections[activeSection]}`, JSON.stringify(content));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  // Reset to last saved changes
  const handleReset = async () => {
    if (selectedPage === 'Investor Relations') {
      if (window.confirm('Are you sure you want to discard all unsaved changes and reset to the last saved state?')) {
        try {
          setLoadingInvestorContent(true);
          const token = localStorage.getItem('token');
          const [contentResponse, heroResponse] = await Promise.all([
            fetch(`${API_URL}/api/investor-content`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }),
            fetch(`${API_URL}/api/investor-hero`)
          ]);

          if (contentResponse.ok) {
            const data = await contentResponse.json();
            // Transform database structure to local state structure
            const transformed = data.map((item: any) => ({
              id: item.categoryId,
              title: item.categoryName,
              sections: item.content.sections.map((section: any, idx: number) => ({
                id: `${item.categoryId}-${idx}`,
                heading: section.heading,
                pdfs: section.items.map((item: any, itemIdx: number) => ({
                  id: `${item.categoryId}-${idx}-${itemIdx}`,
                  name: item.name,
                  url: item.fileUrl || '',
                  isStaticContent: item.isStaticContent || false,
                  staticContent: item.staticContent || '',
                })),
              })),
            }));
            setInvestorCategories(transformed);
            
            // Reset selected category and expanded sections
            if (transformed.length > 0) {
              setSelectedCategoryId(transformed[0].id);
              const newExpandedSections: { [key: string]: boolean } = {};
              transformed.forEach(cat => {
                if (cat.sections.length > 0 && cat.sections[0].heading) {
                  newExpandedSections[cat.sections[0].id] = true;
                }
              });
              setExpandedSections(newExpandedSections);
            }
          }

          if (heroResponse.ok) {
            const heroData = await heroResponse.json();
            setInvestorHero({
              imageUrl: heroData.imageUrl,
              titleItems: heroData.titleItems || [
                { text: 'Investor', size: 'small', order: 0 },
                { text: '& Relations', size: 'normal', order: 1 }
              ]
            });
          }

          alert('Changes have been reset to the last saved state.');
        } catch (error) {
          console.error('Error resetting data:', error);
          alert('Failed to reset changes. Please try again.');
        } finally {
          setLoadingInvestorContent(false);
        }
      }
    } else {
      // For other pages, reload from localStorage or reset to defaults
      if (window.confirm('Are you sure you want to discard all unsaved changes?')) {
        // This would reload from localStorage or reset state
        window.location.reload(); // Simple approach - reload the page
      }
    }
  };

  // Get the preview URL
  const getPreviewUrl = () => {
    const pageRoutes: Record<string, string> = {
      'Header (Global)': '/',
      'Footer (Global)': '/',
      'Home': '/',
      'About Us': '/about-us',
      'Our Team': '/our-team',
      'Board of Directors': '/board-of-directors',
      'Audit Committee': '/audit-committee',
      'Nomination & Remuneration Committee': '/nomination-remuneration-committee',
      'Stakeholders Relationship Committee': '/stakeholders-relationship-committee',
      'Working at Refex': '/working-at-refex',
      'Investor Relations': '/investor-relations',
      'Why Go Solar': '/why-go-solar',
      'CBG Production': '/cbg-production',
      'Contact': '/contact',
      'Privacy Policy': '/privacy-policy',
      'Terms & Conditions': '/terms-conditions',
      'Legal Disclaimer': '/legal-disclaimer',
    };

    return pageRoutes[selectedPage || ''] || '/';
  };

  const handleAddNavLink = () => {
    setHeaderContent({
      ...headerContent,
      navLinks: [...headerContent.navLinks, { label: 'New Link', url: '/' }]
    });
  };

  const handleRemoveNavLink = (index: number) => {
    const newNavLinks = headerContent.navLinks.filter((_, i) => i !== index);
    setHeaderContent({
      ...headerContent,
      navLinks: newNavLinks
    });
  };

  const handleUpdateNavLink = (index: number, field: 'label' | 'url', value: string) => {
    const newNavLinks = [...headerContent.navLinks];
    newNavLinks[index][field] = value;
    setHeaderContent({
      ...headerContent,
      navLinks: newNavLinks
    });
  };

  const handleAddSlideImage = () => {
    if (selectedPage === 'Home') {
      setContent({
        ...content,
        heroSlides: [...(content.heroSlides || []), { image: '', titleItems: [] }]
      });
    } else {
      setContent({
        ...content,
        heroImages: [...content.heroImages, '']
      });
    }
  };

  const handleRemoveSlideImage = (index: number) => {
    if (selectedPage === 'Home') {
      const newSlides = (content.heroSlides || []).filter((_, i) => i !== index);
      setContent({
        ...content,
        heroSlides: newSlides
      });
    } else {
      const newImages = content.heroImages.filter((_, i) => i !== index);
      setContent({
        ...content,
        heroImages: newImages
      });
    }
  };

  const handleUpdateSlideImage = (index: number, value: string) => {
    if (selectedPage === 'Home') {
      const newSlides = [...(content.heroSlides || [])];
      newSlides[index] = { ...newSlides[index], image: value };
      setContent({
        ...content,
        heroSlides: newSlides
      });
    } else {
      const newImages = [...content.heroImages];
      newImages[index] = value;
      setContent({
        ...content,
        heroImages: newImages
      });
    }
  };

  // Slide title items handlers
  const handleAddSlideTitleItem = (slideIndex: number) => {
    const newSlides = [...(content.heroSlides || [])];
    newSlides[slideIndex].titleItems.push({
      id: Date.now().toString(),
      title: '',
      isSmall: false
    });
    setContent({
      ...content,
      heroSlides: newSlides
    });
  };

  const handleRemoveSlideTitleItem = (slideIndex: number, itemId: string) => {
    const newSlides = [...(content.heroSlides || [])];
    newSlides[slideIndex].titleItems = newSlides[slideIndex].titleItems.filter(item => item.id !== itemId);
    setContent({
      ...content,
      heroSlides: newSlides
    });
  };

  const handleUpdateSlideTitleItem = (slideIndex: number, itemId: string, field: 'title' | 'isSmall', value: string | boolean) => {
    const newSlides = [...(content.heroSlides || [])];
    newSlides[slideIndex].titleItems = newSlides[slideIndex].titleItems.map(item =>
      item.id === itemId ? { ...item, [field]: value } : item
    );
    setContent({
      ...content,
      heroSlides: newSlides
    });
  };

  const handleMoveSlideTitleItem = (slideIndex: number, itemId: string, direction: 'up' | 'down') => {
    const newSlides = [...(content.heroSlides || [])];
    const items = [...newSlides[slideIndex].titleItems];
    const index = items.findIndex(item => item.id === itemId);
    
    if (direction === 'up' && index > 0) {
      [items[index], items[index - 1]] = [items[index - 1], items[index]];
    } else if (direction === 'down' && index < items.length - 1) {
      [items[index], items[index + 1]] = [items[index + 1], items[index]];
    }
    
    newSlides[slideIndex].titleItems = items;
    setContent({
      ...content,
      heroSlides: newSlides
    });
  };

  const handleAddTeamMember = () => {
    setTeamMembers([...teamMembers, {
      photo: '',
      name: '',
      designation: '',
      company: '',
      bio: ''
    }]);
  };

  const handleRemoveTeamMember = (index: number) => {
    const newTeamMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(newTeamMembers);
  };

  const handleUpdateTeamMember = (index: number, field: string, value: string) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index] = {
      ...newTeamMembers[index],
      [field]: value
    };
    setTeamMembers(newTeamMembers);
  };

  // Board members handlers
  const handleAddBoardMember = () => {
    setBoardMembers([...boardMembers, {
      photo: '',
      name: '',
      designation: '',
      company: '',
      bio: ''
    }]);
  };

  const handleRemoveBoardMember = (index: number) => {
    const newBoardMembers = boardMembers.filter((_, i) => i !== index);
    setBoardMembers(newBoardMembers);
  };

  const handleUpdateBoardMember = (index: number, field: string, value: string) => {
    const newBoardMembers = [...boardMembers];
    newBoardMembers[index] = {
      ...newBoardMembers[index],
      [field]: value
    };
    setBoardMembers(newBoardMembers);
  };

  // Audit committee handlers
  const handleAddAuditMember = () => {
    setAuditMembers([...auditMembers, {
      photo: '',
      name: '',
      designation: '',
      company: '',
      bio: ''
    }]);
  };

  const handleRemoveAuditMember = (index: number) => {
    const newAuditMembers = auditMembers.filter((_, i) => i !== index);
    setAuditMembers(newAuditMembers);
  };

  const handleUpdateAuditMember = (index: number, field: string, value: string) => {
    const newAuditMembers = [...auditMembers];
    newAuditMembers[index] = {
      ...newAuditMembers[index],
      [field]: value
    };
    setAuditMembers(newAuditMembers);
  };

  // Nomination committee handlers
  const handleAddNominationMember = () => {
    setNominationMembers([...nominationMembers, {
      photo: '',
      name: '',
      designation: '',
      company: '',
      bio: ''
    }]);
  };

  const handleRemoveNominationMember = (index: number) => {
    const newNominationMembers = nominationMembers.filter((_, i) => i !== index);
    setNominationMembers(newNominationMembers);
  };

  const handleUpdateNominationMember = (index: number, field: string, value: string) => {
    const newNominationMembers = [...nominationMembers];
    newNominationMembers[index] = {
      ...newNominationMembers[index],
      [field]: value
    };
    setNominationMembers(newNominationMembers);
  };

  // Stakeholders committee handlers
  const handleAddStakeholdersMember = () => {
    setStakeholdersMembers([...stakeholdersMembers, {
      photo: '',
      name: '',
      designation: '',
      company: '',
      bio: ''
    }]);
  };

  const handleRemoveStakeholdersMember = (index: number) => {
    const newStakeholdersMembers = stakeholdersMembers.filter((_, i) => i !== index);
    setStakeholdersMembers(newStakeholdersMembers);
  };

  const handleUpdateStakeholdersMember = (index: number, field: string, value: string) => {
    const newStakeholdersMembers = [...stakeholdersMembers];
    newStakeholdersMembers[index] = {
      ...newStakeholdersMembers[index],
      [field]: value
    };
    setStakeholdersMembers(newStakeholdersMembers);
  };

  // Client logos handlers
  const handleAddClientLogo = () => {
    setContent({
      ...content,
      clientLogos: [...(content.clientLogos || []), { name: '', logo: '' }]
    });
  };

  const handleRemoveClientLogo = (index: number) => {
    const newClientLogos = (content.clientLogos || []).filter((_, i) => i !== index);
    setContent({
      ...content,
      clientLogos: newClientLogos
    });
  };

  const handleUpdateClientLogo = (index: number, field: 'name' | 'logo', value: string) => {
    const newClientLogos = [...(content.clientLogos || [])];
    newClientLogos[index] = {
      ...newClientLogos[index],
      [field]: value
    };
    setContent({
      ...content,
      clientLogos: newClientLogos
    });
  };

  // Investor Relations handlers
  const handleAddInvestorCategory = () => {
    const newCategory: InvestorCategory = {
      id: Date.now().toString(),
      title: 'New Category',
      sections: []
    };
    setInvestorCategories([...investorCategories, newCategory]);
  };

  const handleRemoveInvestorCategory = async (categoryId: string) => {
    // Confirm deletion
    if (!confirm(`Are you sure you want to delete this category? This action cannot be undone.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to delete categories.');
        return;
      }

      // URL encode the categoryId to handle special characters
      const encodedCategoryId = encodeURIComponent(categoryId);
      
      console.log(`Attempting to delete category: ${categoryId} (encoded: ${encodedCategoryId})`);

      // Delete from database immediately
      const deleteResponse = await fetch(`${API_URL}/api/investor-content/${encodedCategoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!deleteResponse.ok) {
        const errorData = await deleteResponse.json().catch(() => ({ message: `HTTP ${deleteResponse.status}: ${deleteResponse.statusText}` }));
        console.error('Delete response error:', errorData);
        throw new Error(errorData.message || `Failed to delete category: ${deleteResponse.status} ${deleteResponse.statusText}`);
      }

      const responseData = await deleteResponse.json().catch(() => ({ message: 'Deleted successfully' }));
      console.log('Delete successful:', responseData);

      // Remove from local state only after successful deletion
      setInvestorCategories(investorCategories.filter(cat => cat.id !== categoryId));
      
      // If this was the selected category, clear selection
      if (selectedCategoryId === categoryId) {
        setSelectedCategoryId(null);
      }

      alert('Category deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting category:', error);
      alert(`Failed to delete category: ${error.message || 'Please try again.'}`);
    }
  };

  const handleUpdateInvestorCategory = (categoryId: string, field: string, value: string) => {
    setInvestorCategories(investorCategories.map(cat =>
      cat.id === categoryId ? { ...cat, [field]: value } : cat
    ));
  };

  const handleMoveCategoryUp = (categoryId: string) => {
    const index = investorCategories.findIndex(cat => cat.id === categoryId);
    if (index > 0) {
      const newCategories = [...investorCategories];
      [newCategories[index], newCategories[index - 1]] = [newCategories[index - 1], newCategories[index]];
      setInvestorCategories(newCategories);
    }
  };

  const handleMoveCategoryDown = (categoryId: string) => {
    const index = investorCategories.findIndex(cat => cat.id === categoryId);
    if (index < investorCategories.length - 1) {
      const newCategories = [...investorCategories];
      [newCategories[index], newCategories[index + 1]] = [newCategories[index + 1], newCategories[index]];
      setInvestorCategories(newCategories);
    }
  };

  const handleAddSection = (categoryId: string) => {
    setInvestorCategories(investorCategories.map(cat => {
      if (cat.id === categoryId) {
        const newSection: InvestorSection = {
          id: Date.now().toString(),
          heading: 'New Section',
          pdfs: []
        };
        return { ...cat, sections: [...cat.sections, newSection] };
      }
      return cat;
    }));
  };

  const handleRemoveSection = (categoryId: string, sectionId: string) => {
    setInvestorCategories(investorCategories.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, sections: cat.sections.filter(sec => sec.id !== sectionId) };
      }
      return cat;
    }));
  };

  const handleUpdateSection = (categoryId: string, sectionId: string, field: string, value: string) => {
    setInvestorCategories(investorCategories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          sections: cat.sections.map(sec =>
            sec.id === sectionId ? { ...sec, [field]: value } : sec
          )
        };
      }
      return cat;
    }));
  };

  const handleMoveSectionUp = (categoryId: string, sectionId: string) => {
    setInvestorCategories(investorCategories.map(cat => {
      if (cat.id === categoryId) {
        const index = cat.sections.findIndex(sec => sec.id === sectionId);
        if (index > 0) {
          const newSections = [...cat.sections];
          [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
          return { ...cat, sections: newSections };
        }
      }
      return cat;
    }));
  };

  const handleMoveSectionDown = (categoryId: string, sectionId: string) => {
    setInvestorCategories(investorCategories.map(cat => {
      if (cat.id === categoryId) {
        const index = cat.sections.findIndex(sec => sec.id === sectionId);
        if (index < cat.sections.length - 1) {
          const newSections = [...cat.sections];
          [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
          return { ...cat, sections: newSections };
        }
      }
      return cat;
    }));
  };

  const handleAddPDF = (categoryId: string, sectionId: string) => {
    setInvestorCategories(investorCategories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          sections: cat.sections.map(sec => {
            if (sec.id === sectionId) {
              const newPDF: InvestorPDF = {
                id: Date.now().toString(),
                name: 'New PDF',
                url: '',
                isStaticContent: false,
                staticContent: ''
              };
              return { ...sec, pdfs: [...sec.pdfs, newPDF] };
            }
            return sec;
          })
        };
      }
      return cat;
    }));
  };

  const handleRemovePDF = (categoryId: string, sectionId: string, pdfId: string) => {
    setInvestorCategories(investorCategories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          sections: cat.sections.map(sec => {
            if (sec.id === sectionId) {
              return { ...sec, pdfs: sec.pdfs.filter(pdf => pdf.id !== pdfId) };
            }
            return sec;
          })
        };
      }
      return cat;
    }));
  };

  const handleUpdatePDF = (categoryId: string, sectionId: string, pdfId: string, field: string, value: string | boolean) => {
    setInvestorCategories(investorCategories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          sections: cat.sections.map(sec => {
            if (sec.id === sectionId) {
              return {
                ...sec,
                pdfs: sec.pdfs.map(pdf =>
                  pdf.id === pdfId ? { ...pdf, [field]: value } : pdf
                )
              };
            }
            return sec;
          })
        };
      }
      return cat;
    }));
  };

  const handleMovePDFUp = (categoryId: string, sectionId: string, pdfId: string) => {
    setInvestorCategories(investorCategories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          sections: cat.sections.map(sec => {
            if (sec.id === sectionId) {
              const index = sec.pdfs.findIndex(pdf => pdf.id === pdfId);
              if (index > 0) {
                const newPDFs = [...sec.pdfs];
                [newPDFs[index], newPDFs[index - 1]] = [newPDFs[index - 1], newPDFs[index]];
                return { ...sec, pdfs: newPDFs };
              }
            }
            return sec;
          })
        };
      }
      return cat;
    }));
  };

  const handleMovePDFDown = (categoryId: string, sectionId: string, pdfId: string) => {
    setInvestorCategories(investorCategories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          sections: cat.sections.map(sec => {
            if (sec.id === sectionId) {
              const index = sec.pdfs.findIndex(pdf => pdf.id === pdfId);
              if (index < sec.pdfs.length - 1) {
                const newPDFs = [...sec.pdfs];
                [newPDFs[index], newPDFs[index + 1]] = [newPDFs[index + 1], newPDFs[index]];
                return { ...sec, pdfs: newPDFs };
              }
            }
            return sec;
          })
        };
      }
      return cat;
    }));
  };

  // State for expanded categories and sections
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Testimonials handlers
  const handleAddTestimonial = () => {
    setContent(prev => ({
      ...prev,
      testimonials: [...(prev.testimonials || []), { text: '', author: '' }]
    }));
  };

  const handleRemoveTestimonial = (index: number) => {
    setContent(prev => ({
      ...prev,
      testimonials: prev.testimonials?.filter((_, i) => i !== index) || []
    }));
  };

  const handleUpdateTestimonial = (index: number, field: keyof Testimonial, value: string) => {
    setContent(prev => ({
      ...prev,
      testimonials: prev.testimonials?.map((testimonial, i) => 
        i === index ? { ...testimonial, [field]: value } : testimonial
      ) || []
    }));
  };

  // Handler functions for Services
  const handleAddService = () => {
    setContent(prev => ({
      ...prev,
      services: [...(prev.services || []), { image: '', title: '', description: '', link: '' }]
    }));
  };

  const handleRemoveService = (index: number) => {
    setContent(prev => ({
      ...prev,
      services: prev.services?.filter((_, i) => i !== index) || []
    }));
  };

  const handleUpdateService = (index: number, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      services: prev.services?.map((service, i) => 
        i === index ? { ...service, [field]: value } : service
      ) || []
    }));
  };

  // Hero Title Items handlers
  const handleAddHeroTitleItem = () => {
    setContent({
      ...content,
      heroTitleItems: [...(content.heroTitleItems || []), { id: Date.now().toString(), title: '', isSmall: false }]
    });
  };

  const handleRemoveHeroTitleItem = (id: string) => {
    setContent({
      ...content,
      heroTitleItems: (content.heroTitleItems || []).filter(item => item.id !== id)
    });
  };

  const handleUpdateHeroTitleItem = (id: string, field: 'title' | 'isSmall', value: string | boolean) => {
    setContent({
      ...content,
      heroTitleItems: (content.heroTitleItems || []).map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  const handleMoveHeroTitleItem = (id: string, direction: 'up' | 'down') => {
    const items = [...(content.heroTitleItems || [])];
    const index = items.findIndex(item => item.id === id);
    
    if (direction === 'up' && index > 0) {
      [items[index], items[index - 1]] = [items[index - 1], items[index]];
    } else if (direction === 'down' && index < items.length - 1) {
      [items[index], items[index + 1]] = [items[index + 1], items[index]];
    }
    
    setContent({
      ...content,
      heroTitleItems: items
    });
  };

  // Reusable member editor renderer
  const renderMemberEditor = (
    members: TeamMember[],
    handleAdd: () => void,
    handleRemove: (id: string) => void,
    handleUpdate: (id: string, field: string, value: string) => void,
    title: string
  ) => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">Manage {title.toLowerCase()} profiles</p>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-add-line"></i>
            Add {title.includes('Team') ? 'Team Member' : 'Member'}
          </button>
        </div>

        {members.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <i className="ri-user-add-line text-4xl text-gray-400 mb-3"></i>
            <p className="text-gray-500 mb-2">No {title.toLowerCase()} added yet</p>
            <p className="text-sm text-gray-400">Add Your First {title.includes('Team') ? 'Team Member' : 'Member'}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {members.map((member, index) => (
              <div key={member.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Member #{index + 1}</h4>
                  <button
                    onClick={() => handleRemove(member.id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-300 cursor-pointer"
                  >
                    <i className="ri-delete-bin-line text-xl"></i>
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Photo URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={member.photo}
                        onChange={(e) => handleUpdate(member.id, 'photo', e.target.value)}
                        placeholder="Enter image URL"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm whitespace-nowrap cursor-pointer">
                        <i className="ri-upload-2-line mr-2"></i>
                        Upload
                      </button>
                    </div>
                    {member.photo && (
                      <div className="mt-3">
                        <img src={member.photo} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleUpdate(member.id, 'name', e.target.value)}
                      placeholder="Enter name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  {/* Designation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                    <input
                      type="text"
                      value={member.designation}
                      onChange={(e) => handleUpdate(member.id, 'designation', e.target.value)}
                      placeholder="Enter designation"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      value={member.company}
                      onChange={(e) => handleUpdate(member.id, 'company', e.target.value)}
                      placeholder="Enter company"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  {/* Professional Bio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
                    <textarea
                      value={member.bio}
                      onChange={(e) => handleUpdate(member.id, 'bio', e.target.value)}
                      placeholder="Enter professional bio"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">{member.bio.length} characters</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (!selectedPage) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-edit-line text-gray-400 text-2xl"></i>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">No Page Selected</h3>
        <p className="text-sm text-gray-600">Select a page from the sidebar to edit its content</p>
      </div>
    );
  }

  // Header editing interface
  if (selectedPage === 'Header (Global)') {
    return (
      <>
        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
            {/* Modal Header */}
            <div className="bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="ri-eye-line text-white text-xl"></i>
                <div>
                  <h3 className="text-lg font-bold text-white">Preview: {selectedPage}</h3>
                  <p className="text-xs text-gray-400">Live preview of your page</p>
                </div>
              </div>
              <button
                onClick={handleClosePreview}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap text-sm font-medium"
              >
                <i className="ri-close-line text-lg"></i>
                Close Preview
              </button>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src={getPreviewUrl()}
                className="w-full h-full border-0"
                title="Page Preview"
              />
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Page Name Header with Actions */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <i className="ri-layout-top-line text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-xs text-orange-100 font-medium uppercase tracking-wide">
                    Editing Global Component
                  </p>
                  <h2 className="text-2xl font-bold text-white">Header (Global)</h2>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePreview}
                  className="flex items-center gap-2 px-6 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap font-medium text-sm backdrop-blur-sm"
                >
                  <i className="ri-eye-line"></i>
                  Preview Page
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap font-medium text-sm backdrop-blur-sm border border-white/20"
                  title="Reset to last saved changes"
                >
                  <i className="ri-restart-line"></i>
                  Reset
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-gray-100 text-orange-600 rounded-lg transition-colors cursor-pointer whitespace-nowrap font-medium text-sm"
                >
                  <i className="ri-save-line"></i>
                  {saved ? 'Saved!' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Scrollable Section Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              <div className="flex gap-2 px-6 py-4 min-w-max">
                {sections.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSection(index)}
                    className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all whitespace-nowrap cursor-pointer ${
                      activeSection === index
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>

            {/* Header Content Editor */}
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <i className="ri-edit-box-line text-gray-700 text-lg"></i>
                <h3 className="text-lg font-bold text-gray-900">Editing: {sections[activeSection]}</h3>
              </div>

              {/* Logo Section */}
              {activeSection === 0 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo Image URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={headerContent.logo.imageUrl}
                        onChange={(e) => setHeaderContent({
                          ...headerContent,
                          logo: { ...headerContent.logo, imageUrl: e.target.value }
                        })}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                        placeholder="https://refexrenewables.com/img/logo.png"
                      />
                      <button className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm whitespace-nowrap cursor-pointer flex items-center gap-2">
                        <i className="ri-upload-2-line"></i>
                        Upload
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo Alt Text
                    </label>
                    <input
                      type="text"
                      value={headerContent.logo.altText}
                      onChange={(e) => setHeaderContent({
                        ...headerContent,
                        logo: { ...headerContent.logo, altText: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Refex Renewables"
                    />
                  </div>

                  {/* Logo Preview */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-3">Logo Preview:</p>
                    <div className="bg-white p-4 rounded-lg inline-block">
                      <img 
                        src={headerContent.logo.imageUrl} 
                        alt={headerContent.logo.altText}
                        className="h-12 w-auto"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/150x50?text=Logo';
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Nav Links Section */}
              {activeSection === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600">Manage navigation menu links</p>
                    <button
                      onClick={handleAddNavLink}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap text-sm font-medium"
                    >
                      <i className="ri-add-line"></i>
                      Add Link
                    </button>
                  </div>

                  {headerContent.navLinks.map((link, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Link {index + 1}</span>
                        <button
                          onClick={() => handleRemoveNavLink(index)}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Label
                        </label>
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => handleUpdateNavLink(index, 'label', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                          placeholder="Home"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          URL
                        </label>
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) => handleUpdateNavLink(index, 'url', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                          placeholder="/"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Supabase Connection Notice */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="ri-database-2-line text-white"></i>
              </div>
              <div>
                <h4 className="font-bold text-orange-900 mb-2">Connect Supabase for Database Storage</h4>
                <p className="text-sm text-orange-800 mb-3">
                  Currently, header content is stored in browser localStorage (temporary). Connect Supabase to:
                </p>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>• Store header content permanently in a database</li>
                  <li>• Edit logo and navigation links across all pages</li>
                  <li>• Real-time content updates</li>
                  <li>• Content versioning and backup</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Footer editing interface
  if (selectedPage === 'Footer (Global)') {
    return (
      <>
        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
            {/* Modal Header */}
            <div className="bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="ri-eye-line text-white text-xl"></i>
                <div>
                  <h3 className="text-lg font-bold text-white">Preview: {selectedPage}</h3>
                  <p className="text-xs text-gray-400">Live preview of your page</p>
                </div>
              </div>
              <button
                onClick={handleClosePreview}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap text-sm font-medium"
              >
                <i className="ri-close-line text-lg"></i>
                Close Preview
              </button>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src={getPreviewUrl()}
                className="w-full h-full border-0"
                title="Page Preview"
              />
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Page Name Header with Actions */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <i className="ri-layout-bottom-line text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-xs text-orange-100 font-medium uppercase tracking-wide">
                    Editing Global Component
                  </p>
                  <h2 className="text-2xl font-bold text-white">Footer (Global)</h2>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePreview}
                  className="flex items-center gap-2 px-6 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap font-medium text-sm backdrop-blur-sm"
                >
                  <i className="ri-eye-line"></i>
                  Preview Page
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap font-medium text-sm backdrop-blur-sm border border-white/20"
                  title="Reset to last saved changes"
                >
                  <i className="ri-restart-line"></i>
                  Reset
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-gray-100 text-orange-600 rounded-lg transition-colors cursor-pointer whitespace-nowrap font-medium text-sm"
                >
                  <i className="ri-save-line"></i>
                  {saved ? 'Saved!' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Scrollable Section Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              <div className="flex gap-2 px-6 py-4 min-w-max">
                {sections.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSection(index)}
                    className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all whitespace-nowrap cursor-pointer ${
                      activeSection === index
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Content Editor */}
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <i className="ri-edit-box-line text-gray-700 text-lg"></i>
                <h3 className="text-lg font-bold text-gray-900">Editing: {sections[activeSection]}</h3>
              </div>

              {/* Registered Office Section */}
              {activeSection === 0 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={footerContent.registeredOffice.companyName}
                      onChange={(e) => setFooterContent({
                        ...footerContent,
                        registeredOffice: { ...footerContent.registeredOffice, companyName: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Enter company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CIN Number
                    </label>
                    <input
                      type="text"
                      value={footerContent.registeredOffice.cin}
                      onChange={(e) => setFooterContent({
                        ...footerContent,
                        registeredOffice: { ...footerContent.registeredOffice, cin: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Enter CIN number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      value={footerContent.registeredOffice.address}
                      onChange={(e) => setFooterContent({
                        ...footerContent,
                        registeredOffice: { ...footerContent.registeredOffice, address: e.target.value }
                      })}
                      rows={5}
                      maxLength={500}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm resize-none"
                      placeholder="Enter registered office address"
                    />
                    <p className="text-xs text-gray-500 mt-1">{footerContent.registeredOffice.address.length}/500 characters</p>
                  </div>
                </div>
              )}

              {/* Navigation Links Section */}
              {activeSection === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      About Us Link
                    </label>
                    <input
                      type="text"
                      value={footerContent.navigation.aboutUs}
                      onChange={(e) => setFooterContent({
                        ...footerContent,
                        navigation: { ...footerContent.navigation, aboutUs: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="/about-us"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Why Go Solar Link
                    </label>
                    <input
                      type="text"
                      value={footerContent.navigation.whyGoSolar}
                      onChange={(e) => setFooterContent({
                        ...footerContent,
                        navigation: { ...footerContent.navigation, whyGoSolar: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="/why-go-solar"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Link
                    </label>
                    <input
                      type="text"
                      value={footerContent.navigation.contact}
                      onChange={(e) => setFooterContent({
                        ...footerContent,
                        navigation: { ...footerContent.navigation, contact: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="/contact"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ESOP Testimonials Link
                    </label>
                    <input
                      type="text"
                      value={footerContent.navigation.esopTestimonials}
                      onChange={(e) => setFooterContent({
                        ...footerContent,
                        navigation: { ...footerContent.navigation, esopTestimonials: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="https://www.refex.group/careers/?slide=4"
                    />
                  </div>
                </div>
              )}

              {/* Services Section */}
              {activeSection === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Compressed Biogas Link
                    </label>
                    <input
                      type="text"
                      value={footerContent.services.compressedBiogas}
                      onChange={(e) => setFooterContent({
                        ...footerContent,
                        services: { ...footerContent.services, compressedBiogas: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="/cbg-production"
                    />
                  </div>
                </div>
              )}

              {/* Contact Info Section */}
              {activeSection === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={footerContent.contact.phone}
                      onChange={(e) => setFooterContent({
                        ...footerContent,
                        contact: { ...footerContent.contact, phone: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="1800 102 0765"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={footerContent.contact.email}
                      onChange={(e) => setFooterContent({
                        ...footerContent,
                        contact: { ...footerContent.contact, email: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="cs@refexrenewables.com"
                    />
                  </div>
                </div>
              )}

              {/* Copyright & Legal Section */}
              {activeSection === 4 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Copyright Text
                    </label>
                    <input
                      type="text"
                      value={footerContent.copyright.text}
                      onChange={(e) => setFooterContent({
                        ...footerContent,
                        copyright: { ...footerContent.copyright, text: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="REFEX RENEWABLES © 2025 All Rights Reserved."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Update Notice
                    </label>
                    <input
                      type="text"
                      value={footerContent.copyright.updateNotice}
                      onChange={(e) => setFooterContent({
                        ...footerContent,
                        copyright: { ...footerContent.copyright, updateNotice: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="This website is in the process of being updated"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Terms & Conditions Link
                    </label>
                    <input
                      type="text"
                      value={footerContent.copyright.termsLink}
                      onChange={(e) => setFooterContent({
                        ...footerContent,
                        copyright: { ...footerContent.copyright, termsLink: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="/terms-conditions"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Privacy Policy Link
                    </label>
                    <input
                      type="text"
                      value={footerContent.copyright.privacyLink}
                      onChange={(e) => setFooterContent({
                        ...footerContent,
                        copyright: { ...footerContent.copyright, privacyLink: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="/privacy-policy"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Legal Disclaimer Link
                    </label>
                    <input
                      type="text"
                      value={footerContent.copyright.legalLink}
                      onChange={(e) => setFooterContent({
                        ...footerContent,
                        copyright: { ...footerContent.copyright, legalLink: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="/legal-disclaimer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maintained By (Company Name)
                    </label>
                    <input
                      type="text"
                      value={footerContent.copyright.maintainedBy}
                      onChange={(e) => setFooterContent({
                        ...footerContent,
                        copyright: { ...footerContent.copyright, maintainedBy: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Sharajman Technologies"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maintained By (Website Link)
                    </label>
                    <input
                      type="text"
                      value={footerContent.copyright.maintainedByLink}
                      onChange={(e) => setFooterContent({
                        ...footerContent,
                        copyright: { ...footerContent.copyright, maintainedByLink: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="https://sharajman.com/"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Supabase Connection Notice */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="ri-database-2-line text-white"></i>
              </div>
              <div>
                <h4 className="font-bold text-orange-900 mb-2">Connect Supabase for Database Storage</h4>
                <p className="text-sm text-orange-800 mb-3">
                  Currently, footer content is stored in browser localStorage (temporary). Connect Supabase to:
                </p>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>• Store footer content permanently in a database</li>
                  <li>• Edit all footer sections across all pages</li>
                  <li>• Real-time content updates</li>
                  <li>• Content versioning and backup</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
          {/* Modal Header */}
          <div className="bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className="ri-eye-line text-white text-xl"></i>
              <div>
                <h3 className="text-lg font-bold text-white">Preview: {selectedPage}</h3>
                <p className="text-xs text-gray-400">Live preview of your page</p>
              </div>
            </div>
            <button
              onClick={handleClosePreview}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap text-sm font-medium"
            >
              <i className="ri-close-line text-lg"></i>
              Close Preview
            </button>
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-hidden">
            <iframe
              src={getPreviewUrl()}
              className="w-full h-full border-0"
              title="Page Preview"
            />
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Page Name Header with Actions */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <i className={`${selectedPage?.includes('Global') ? 'ri-global-line' : 'ri-file-edit-line'} text-white text-xl`}></i>
              </div>
              <div>
                <p className="text-xs text-orange-100 font-medium uppercase tracking-wide">
                  {selectedPage?.includes('Global') ? 'Editing Global Component' : 'Editing Page'}
                </p>
                <h2 className="text-2xl font-bold text-white">{selectedPage}</h2>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePreview}
                className="flex items-center gap-2 px-6 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap font-medium text-sm backdrop-blur-sm"
              >
                <i className="ri-eye-line"></i>
                Preview Page
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap font-medium text-sm backdrop-blur-sm border border-white/20"
                title="Reset to last saved changes"
              >
                <i className="ri-restart-line"></i>
                Reset
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-gray-100 text-orange-600 rounded-lg transition-colors cursor-pointer whitespace-nowrap font-medium text-sm"
              >
                <i className="ri-save-line"></i>
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Section Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div className="flex gap-2 px-6 py-4 min-w-max">
              {sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSection(index)}
                  className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all whitespace-nowrap cursor-pointer ${
                    activeSection === index
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>

          {/* Content Editor Form */}
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <i className="ri-edit-box-line text-gray-700 text-lg"></i>
              <h3 className="text-lg font-bold text-gray-900">Editing: {sections[activeSection]}</h3>
            </div>

            {/* Team Members Section */}
            {selectedPage === 'Our Team' && sections[activeSection] === 'Team Members' ? (
              renderMemberEditor(teamMembers, handleAddTeamMember, handleRemoveTeamMember, handleUpdateTeamMember, 'Team Members')
            ) : selectedPage === 'Board of Directors' && sections[activeSection] === 'Board Members' ? (
              renderMemberEditor(boardMembers, handleAddBoardMember, handleRemoveBoardMember, handleUpdateBoardMember, 'Board Members')
            ) : selectedPage === 'Audit Committee' && sections[activeSection] === 'Committee Members' ? (
              renderMemberEditor(auditMembers, handleAddAuditMember, handleRemoveAuditMember, handleUpdateAuditMember, 'Committee Members')
            ) : selectedPage === 'Nomination & Remuneration Committee' && sections[activeSection] === 'Committee Members' ? (
              renderMemberEditor(nominationMembers, handleAddNominationMember, handleRemoveNominationMember, handleUpdateNominationMember, 'Committee Members')
            ) : selectedPage === 'Stakeholders Relationship Committee' && sections[activeSection] === 'Committee Members' ? (
              renderMemberEditor(stakeholdersMembers, handleAddStakeholdersMember, handleRemoveStakeholdersMember, handleUpdateStakeholdersMember, 'Committee Members')
            ) : selectedPage === 'Investor Relations' && sections[activeSection] === 'Hero' ? (
              <div className="space-y-6">
                {/* Hero Image Upload */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    <i className="ri-image-line mr-2"></i>
                    Hero Background Image
                  </label>
                  
                  <div className="space-y-4">
                    {/* Option 1: Upload New Image */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">
                        Option 1: Upload New Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        id="hero-image-upload"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          try {
                            setUploadingImage(true);
                            const token = localStorage.getItem('token');
                            if (!token) {
                              alert('You must be logged in to upload images.');
                              return;
                            }

                            const formData = new FormData();
                            formData.append('image', file);
                            formData.append('titleItems', JSON.stringify(investorHero.titleItems));

                            const response = await fetch(`${API_URL}/api/investor-hero`, {
                              method: 'POST',
                              headers: {
                                'Authorization': `Bearer ${token}`,
                              },
                              body: formData,
                            });

                            if (!response.ok) {
                              throw new Error('Failed to upload image');
                            }

                            const savedData = await response.json();
                            setInvestorHero({
                              imageUrl: savedData.imageUrl,
                              titleItems: savedData.titleItems || investorHero.titleItems
                            });
                            alert('Image uploaded successfully! Click "Save Changes" to confirm.');
                          } catch (error: any) {
                            console.error('Error uploading image:', error);
                            alert(`Failed to upload image: ${error.message || 'Please try again.'}`);
                          } finally {
                            setUploadingImage(false);
                          }
                        }}
                      />
                      <label
                        htmlFor="hero-image-upload"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors cursor-pointer"
                      >
                        <i className="ri-upload-2-line"></i>
                        {uploadingImage ? 'Uploading...' : 'Upload New Image'}
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        Recommended size: 1920x1080px for best quality. Max file size: 5MB
                      </p>
                    </div>

                    {/* Option 2: Edit Image URL */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">
                        Option 2: Edit Image URL
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={investorHero.imageUrl || ''}
                          onChange={(e) => setInvestorHero({ ...investorHero, imageUrl: e.target.value })}
                          placeholder="Enter image URL (e.g., /uploads/images/filename.jpg or https://example.com/image.jpg)"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Enter a relative path (e.g., /uploads/images/filename.jpg) or an external URL
                      </p>
                    </div>

                    {/* Current Image Preview */}
                    {investorHero.imageUrl && (
                      <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                        <p className="text-xs font-medium text-gray-700 mb-2">Current Image Preview:</p>
                        <img 
                          src={investorHero.imageUrl} 
                          alt="Hero preview"
                          className="w-full h-48 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/1920x1080?text=Image+Not+Found';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Hero Title Items */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      <i className="ri-text mr-2"></i>
                      Hero Title Items (Ordered)
                    </label>
                    <button
                      onClick={() => {
                        const newItems = [...investorHero.titleItems];
                        newItems.push({
                          text: '',
                          size: 'normal',
                          order: newItems.length
                        });
                        setInvestorHero({ ...investorHero, titleItems: newItems });
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap text-xs font-medium"
                    >
                      <i className="ri-add-line"></i>
                      Add Item
                    </button>
                  </div>

                  {investorHero.titleItems.length === 0 ? (
                    <div className="text-center py-8 bg-white rounded-lg border-2 border-dashed border-gray-300">
                      <i className="ri-text text-3xl text-gray-400 mb-2"></i>
                      <p className="text-sm text-gray-500">No title items added yet</p>
                      <p className="text-xs text-gray-400 mt-1">Add your first title item</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {investorHero.titleItems
                        .sort((a, b) => a.order - b.order)
                        .map((item, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                {item.order + 1}
                              </span>
                              <span className="text-sm font-medium text-gray-700">Title Item {index + 1}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  const newItems = [...investorHero.titleItems];
                                  if (item.order > 0) {
                                    const prevItem = newItems.find(i => i.order === item.order - 1);
                                    if (prevItem) {
                                      prevItem.order = item.order;
                                      item.order = item.order - 1;
                                    }
                                  }
                                  setInvestorHero({ ...investorHero, titleItems: newItems });
                                }}
                                disabled={item.order === 0}
                                className={`${item.order === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-orange-500 cursor-pointer'} transition-colors`}
                              >
                                <i className="ri-arrow-up-line text-lg"></i>
                              </button>
                              <button
                                onClick={() => {
                                  const newItems = [...investorHero.titleItems];
                                  const maxOrder = Math.max(...newItems.map(i => i.order));
                                  if (item.order < maxOrder) {
                                    const nextItem = newItems.find(i => i.order === item.order + 1);
                                    if (nextItem) {
                                      nextItem.order = item.order;
                                      item.order = item.order + 1;
                                    }
                                  }
                                  setInvestorHero({ ...investorHero, titleItems: newItems });
                                }}
                                disabled={item.order === Math.max(...investorHero.titleItems.map(i => i.order))}
                                className={`${item.order === Math.max(...investorHero.titleItems.map(i => i.order)) ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-orange-500 cursor-pointer'} transition-colors`}
                              >
                                <i className="ri-arrow-down-line text-lg"></i>
                              </button>
                              <button
                                onClick={() => {
                                  const newItems = investorHero.titleItems.filter((_, i) => i !== index);
                                  // Reorder remaining items
                                  newItems.forEach((item, idx) => {
                                    item.order = idx;
                                  });
                                  setInvestorHero({ ...investorHero, titleItems: newItems });
                                }}
                                className="text-red-500 hover:text-red-700 transition-colors cursor-pointer ml-2"
                              >
                                <i className="ri-delete-bin-line text-lg"></i>
                              </button>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Text
                              </label>
                              <input
                                type="text"
                                value={item.text}
                                onChange={(e) => {
                                  const newItems = [...investorHero.titleItems];
                                  newItems[index].text = e.target.value;
                                  setInvestorHero({ ...investorHero, titleItems: newItems });
                                }}
                                placeholder="Enter text (e.g., Investor, & Relations, Nomination)"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Text Size
                              </label>
                              <select
                                value={item.size}
                                onChange={(e) => {
                                  const newItems = [...investorHero.titleItems];
                                  newItems[index].size = e.target.value as 'small' | 'normal';
                                  setInvestorHero({ ...investorHero, titleItems: newItems });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                              >
                                <option value="small">Small Text</option>
                                <option value="normal">Normal Text (Big)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mt-3">
                    <i className="ri-information-line mr-1"></i>
                    Use the arrows to reorder items. Items are displayed in order from left to right.
                  </p>
                </div>
              </div>
            ) : selectedPage === 'Investor Relations' && sections[activeSection] === 'Investor Content' ? (
              <div className="space-y-6">
                {/* Two Column Layout */}
                <div className="grid grid-cols-12 gap-6">
                  {/* Left Sidebar - Categories List */}
                  <div className="col-span-4">
                    <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden sticky top-6">
                      {/* Header */}
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <i className="ri-folder-line text-white text-xl"></i>
                            <h3 className="text-white font-bold">Categories</h3>
                          </div>
                          <button
                            onClick={handleAddInvestorCategory}
                            className="w-8 h-8 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-300 flex items-center justify-center cursor-pointer"
                            title="Add Category"
                          >
                            <i className="ri-add-line text-lg"></i>
                          </button>
                        </div>
                      </div>

                      {/* Categories List */}
                      <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                        {investorCategories.length === 0 ? (
                          <div className="p-6 text-center">
                            <i className="ri-folder-open-line text-4xl text-gray-400 mb-3"></i>
                            <p className="text-sm text-gray-500 mb-3">No categories yet</p>
                            <button
                              onClick={handleAddInvestorCategory}
                              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 inline-flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm"
                            >
                              <i className="ri-add-line"></i>
                              Add First Category
                            </button>
                          </div>
                        ) : (
                          <div className="divide-y divide-gray-200">
                            {investorCategories.map((category, index) => (
                              <div
                                key={category.id}
                                className={`p-4 transition-all duration-300 cursor-pointer ${
                                  selectedCategoryId === category.id
                                    ? 'bg-orange-50 border-l-4 border-orange-500'
                                    : 'hover:bg-gray-50'
                                }`}
                                onClick={() => setSelectedCategoryId(category.id)}
                              >
                                <div className="flex items-center gap-3">
                                  {/* Order Number */}
                                  <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                                    {index + 1}
                                  </div>

                                  {/* Category Info */}
                                  <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 truncate">{category.title}</p>
                                    <p className="text-xs text-gray-500">
                                      {category.sections.length} section{category.sections.length !== 1 ? 's' : ''}
                                    </p>
                                  </div>

                                  {/* Arrow Icon */}
                                  <i className={`ri-arrow-right-s-line text-xl transition-colors ${
                                    selectedCategoryId === category.id ? 'text-orange-500' : 'text-gray-400'
                                  }`}></i>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Content - Sections & PDFs */}
                  <div className="col-span-8">
                    {!selectedCategoryId ? (
                      <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                        <i className="ri-arrow-left-line text-4xl text-gray-400 mb-3"></i>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">Select a Category</h4>
                        <p className="text-sm text-gray-500">Choose a category from the left to view and edit its sections and PDFs</p>
                      </div>
                    ) : (
                      (() => {
                        const selectedCategory = investorCategories.find(cat => cat.id === selectedCategoryId);
                        if (!selectedCategory) return null;

                        return (
                          <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
                            {/* Category Header */}
                            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
                              <div className="flex items-start gap-4">
                                <div className="flex-1">
                                  <label className="block text-xs text-orange-100 font-medium mb-2">CATEGORY NAME</label>
                                  <input
                                    type="text"
                                    value={selectedCategory.title}
                                    onChange={(e) => handleUpdateInvestorCategory(selectedCategory.id, 'title', e.target.value)}
                                    placeholder="Category Name"
                                    className="w-full bg-white/10 border border-white/30 text-white placeholder-white/60 px-4 py-2.5 rounded-lg focus:bg-white/20 focus:border-white/50 focus:outline-none transition-all font-semibold text-lg"
                                  />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      const index = investorCategories.findIndex(cat => cat.id === selectedCategory.id);
                                      handleMoveCategoryUp(selectedCategory.id);
                                    }}
                                    disabled={investorCategories.findIndex(cat => cat.id === selectedCategory.id) === 0}
                                    className={`w-9 h-9 rounded-lg transition-colors duration-300 flex items-center justify-center ${
                                      investorCategories.findIndex(cat => cat.id === selectedCategory.id) === 0
                                        ? 'bg-white/5 text-white/30 cursor-not-allowed'
                                        : 'bg-white/10 hover:bg-white/20 text-white cursor-pointer'
                                    }`}
                                    title="Move Up"
                                  >
                                    <i className="ri-arrow-up-line text-lg"></i>
                                  </button>

                                  <button
                                    onClick={() => handleMoveCategoryDown(selectedCategory.id)}
                                    disabled={investorCategories.findIndex(cat => cat.id === selectedCategory.id) === investorCategories.length - 1}
                                    className={`w-9 h-9 rounded-lg transition-colors duration-300 flex items-center justify-center ${
                                      investorCategories.findIndex(cat => cat.id === selectedCategory.id) === investorCategories.length - 1
                                        ? 'bg-white/5 text-white/30 cursor-not-allowed'
                                        : 'bg-white/10 hover:bg-white/20 text-white cursor-pointer'
                                    }`}
                                    title="Move Down"
                                  >
                                    <i className="ri-arrow-down-line text-lg"></i>
                                  </button>

                                  <button
                                    onClick={() => {
                                      handleRemoveInvestorCategory(selectedCategory.id);
                                      setSelectedCategoryId(null);
                                    }}
                                    className="w-9 h-9 bg-white/10 hover:bg-red-500 text-white rounded-lg transition-colors duration-300 cursor-pointer flex items-center justify-center"
                                    title="Delete Category"
                                  >
                                    <i className="ri-delete-bin-line text-lg"></i>
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Sections Content */}
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <h4 className="font-bold text-gray-900 text-lg">Sections</h4>
                                  <p className="text-sm text-gray-500">Organize documents by time periods or sub-categories</p>
                                </div>
                                <button
                                  onClick={() => handleAddSection(selectedCategory.id)}
                                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm font-medium"
                                >
                                  <i className="ri-add-line"></i>
                                  Add Section
                                </button>
                              </div>

                              {selectedCategory.sections.length === 0 ? (
                                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                  <i className="ri-inbox-line text-4xl text-gray-400 mb-3"></i>
                                  <p className="text-sm text-gray-500 mb-3">No sections yet</p>
                                  <button
                                    onClick={() => handleAddSection(selectedCategory.id)}
                                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 inline-flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm"
                                  >
                                    <i className="ri-add-line"></i>
                                    Add First Section
                                  </button>
                                </div>
                              ) : (
                                <div className="space-y-4">
                                  {selectedCategory.sections.map((section, secIndex) => (
                                    <div key={section.id} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                                      {/* Section Header */}
                                      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                                        <div className="flex items-center gap-3">
                                          {/* Expand/Collapse Button */}
                                          <button
                                            onClick={() => toggleSection(section.id)}
                                            className="w-8 h-8 bg-white hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-300 cursor-pointer flex items-center justify-center flex-shrink-0"
                                            title={expandedSections[section.id] ? 'Collapse' : 'Expand'}
                                          >
                                            <i className={`ri-arrow-${expandedSections[section.id] ? 'down' : 'right'}-s-line text-lg`}></i>
                                          </button>

                                          {/* Order Number */}
                                          <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                                            {secIndex + 1}
                                          </div>

                                          {/* Section Heading Input */}
                                          <div className="flex-1">
                                            <input
                                              type="text"
                                              value={section.heading}
                                              onChange={(e) => handleUpdateSection(selectedCategory.id, section.id, 'heading', e.target.value)}
                                              placeholder="Section Heading (e.g., 2024-2025)"
                                              className="w-full bg-white border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm font-medium"
                                            />
                                          </div>

                                          {/* Action Buttons */}
                                          <div className="flex items-center gap-2">
                                            <button
                                              onClick={() => handleMoveSectionUp(selectedCategory.id, section.id)}
                                              disabled={secIndex === 0}
                                              className={`w-8 h-8 rounded-lg transition-colors duration-300 flex items-center justify-center ${
                                                secIndex === 0
                                                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                                  : 'bg-white hover:bg-gray-200 text-gray-700 cursor-pointer'
                                              }`}
                                              title="Move Up"
                                            >
                                              <i className="ri-arrow-up-line"></i>
                                            </button>

                                            <button
                                              onClick={() => handleMoveSectionDown(selectedCategory.id, section.id)}
                                              disabled={secIndex === selectedCategory.sections.length - 1}
                                              className={`w-8 h-8 rounded-lg transition-colors duration-300 flex items-center justify-center ${
                                                secIndex === selectedCategory.sections.length - 1
                                                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                                  : 'bg-white hover:bg-gray-200 text-gray-700 cursor-pointer'
                                              }`}
                                              title="Move Down"
                                            >
                                              <i className="ri-arrow-down-line"></i>
                                            </button>

                                            <button
                                              onClick={() => handleRemoveSection(selectedCategory.id, section.id)}
                                              className="w-8 h-8 bg-white hover:bg-red-50 text-red-500 hover:text-red-600 rounded-lg transition-colors duration-300 cursor-pointer flex items-center justify-center"
                                              title="Delete Section"
                                            >
                                              <i className="ri-close-line text-lg"></i>
                                            </button>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Section Body - PDFs */}
                                      {expandedSections[section.id] && (
                                        <div className="p-4 bg-white">
                                          <div className="flex items-center justify-between mb-3">
                                            <p className="text-sm font-medium text-gray-700">PDF Documents</p>
                                            <button
                                              onClick={() => handleAddPDF(selectedCategory.id, section.id)}
                                              className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-300 flex items-center gap-2 cursor-pointer text-xs font-medium"
                                            >
                                              <i className="ri-file-add-line"></i>
                                              Add PDF
                                            </button>
                                          </div>

                                          {section.pdfs.length === 0 ? (
                                            <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                              <i className="ri-file-list-line text-2xl text-gray-400 mb-2"></i>
                                              <p className="text-xs text-gray-500">No PDFs yet</p>
                                            </div>
                                          ) : (
                                            <div className="space-y-2">
                                              {section.pdfs.map((pdf, pdfIndex) => {
                                                const currentPdfId = pdf.id;
                                                return (
                                                <div key={pdf.id} className="bg-gray-50 rounded-lg border border-gray-200 p-3">
                                                  <div className="flex items-start gap-3">
                                                    {/* Order Number */}
                                                    <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center flex-shrink-0 mt-1">
                                                      <span className="text-red-500 font-bold text-sm">{pdfIndex + 1}</span>
                                                    </div>

                                                    {/* Item Details */}
                                                    <div className="flex-1 space-y-2">
                                                      {/* Checkbox for Static Content */}
                                                      <div className="flex items-center gap-2 mb-2">
                                                        <input
                                                          type="checkbox"
                                                          id={`static-${pdf.id}`}
                                                          checked={pdf.isStaticContent || false}
                                                          onChange={(e) => {
                                                            const isChecked = e.target.checked;
                                                            // Update all related fields in a single state update
                                                            setInvestorCategories(prevCategories => 
                                                              prevCategories.map(cat => {
                                                                if (cat.id === selectedCategory.id) {
                                                                  return {
                                                                    ...cat,
                                                                    sections: cat.sections.map(sec => {
                                                                      if (sec.id === section.id) {
                                                                        return {
                                                                          ...sec,
                                                                          pdfs: sec.pdfs.map(p => {
                                                                            if (p.id === currentPdfId) {
                                                                              return {
                                                                                ...p,
                                                                                isStaticContent: isChecked,
                                                                                staticContent: isChecked ? (p.staticContent || '') : '',
                                                                                url: isChecked ? '' : (p.url || ''),
                                                                              };
                                                                            }
                                                                            return p;
                                                                          })
                                                                        };
                                                                      }
                                                                      return sec;
                                                                    })
                                                                  };
                                                                }
                                                                return cat;
                                                              })
                                                            );
                                                          }}
                                                          className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                                        />
                                                        <label htmlFor={`static-${pdf.id}`} className="text-sm font-medium text-gray-700 cursor-pointer">
                                                          Static Content (instead of PDF)
                                                        </label>
                                                      </div>

                                                      {/* Only show title field if NOT static content */}
                                                      {!pdf.isStaticContent && (
                                                        <input
                                                          type="text"
                                                          value={pdf.name}
                                                          onChange={(e) => handleUpdatePDF(selectedCategory.id, section.id, pdf.id, 'name', e.target.value)}
                                                          placeholder="Item Name/Title"
                                                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm font-medium"
                                                        />
                                                      )}

                                                      {/* Conditional Fields */}
                                                      {pdf.isStaticContent ? (
                                                        <div>
                                                          <label className="block text-xs font-medium text-gray-600 mb-1">
                                                            Static Content (HTML supported: &lt;strong&gt;, &lt;em&gt;, &lt;a&gt;, &lt;p&gt;, &lt;br&gt;, &lt;span style="color:..."&gt;)
                                                          </label>
                                                          <textarea
                                                            value={pdf.staticContent || ''}
                                                            onChange={(e) => handleUpdatePDF(selectedCategory.id, section.id, pdf.id, 'staticContent', e.target.value)}
                                                            placeholder="Enter static content with HTML formatting. Example: &lt;p&gt;Investor get two options...&lt;/p&gt;&lt;ol&gt;&lt;li&gt;Providing nomination...&lt;/li&gt;&lt;/ol&gt;"
                                                            rows={8}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm font-mono"
                                                          />
                                                          <p className="text-xs text-gray-500 mt-1">
                                                            You can use HTML tags: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ol&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;a href="..."&gt;, &lt;span style="color: red"&gt;
                                                          </p>
                                                        </div>
                                                      ) : (
                                                        <div className="flex gap-2">
                                                          <input
                                                            type="text"
                                                            value={pdf.url}
                                                            onChange={(e) => handleUpdatePDF(selectedCategory.id, section.id, pdf.id, 'url', e.target.value)}
                                                            placeholder="PDF URL (e.g., /pdf/filename.pdf or https://example.com/file.pdf)"
                                                            className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                                          />
                                                          <input
                                                            type="file"
                                                            id={`pdf-upload-${pdf.id}`}
                                                            accept=".pdf,application/pdf"
                                                            style={{ display: 'none' }}
                                                            onChange={async (e) => {
                                                              const file = e.target.files?.[0];
                                                              if (!file) return;

                                                              try {
                                                                const token = localStorage.getItem('token');
                                                                if (!token) {
                                                                  alert('You must be logged in to upload PDFs.');
                                                                  return;
                                                                }

                                                                const formData = new FormData();
                                                                formData.append('pdf', file);

                                                                const response = await fetch(`${API_URL}/api/investor-content/upload-pdf`, {
                                                                  method: 'POST',
                                                                  headers: {
                                                                    'Authorization': `Bearer ${token}`,
                                                                  },
                                                                  body: formData,
                                                                });

                                                                if (!response.ok) {
                                                                  throw new Error('Failed to upload PDF');
                                                                }

                                                                const data = await response.json();
                                                                handleUpdatePDF(selectedCategory.id, section.id, pdf.id, 'url', data.fileUrl);
                                                                alert('PDF uploaded successfully! Click "Save Changes" to confirm.');
                                                              } catch (error: any) {
                                                                console.error('Error uploading PDF:', error);
                                                                alert(`Failed to upload PDF: ${error.message || 'Please try again.'}`);
                                                              } finally {
                                                                e.target.value = '';
                                                              }
                                                            }}
                                                          />
                                                          <label
                                                            htmlFor={`pdf-upload-${pdf.id}`}
                                                            className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-300 text-xs whitespace-nowrap cursor-pointer flex items-center gap-1"
                                                          >
                                                            <i className="ri-upload-2-line"></i>
                                                            Upload PDF
                                                          </label>
                                                        </div>
                                                      )}
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="flex flex-col gap-1">
                                                      <button
                                                        onClick={() => handleMovePDFUp(selectedCategory.id, section.id, pdf.id)}
                                                        disabled={pdfIndex === 0}
                                                        className={`w-7 h-7 rounded transition-colors duration-300 flex items-center justify-center ${
                                                          pdfIndex === 0
                                                            ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer'
                                                        }`}
                                                        title="Move Up"
                                                      >
                                                        <i className="ri-arrow-up-line text-sm"></i>
                                                      </button>

                                                      <button
                                                        onClick={() => handleMovePDFDown(selectedCategory.id, section.id, pdf.id)}
                                                        disabled={pdfIndex === section.pdfs.length - 1}
                                                        className={`w-7 h-7 rounded transition-colors duration-300 flex items-center justify-center ${
                                                          pdfIndex === section.pdfs.length - 1
                                                            ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer'
                                                        }`}
                                                        title="Move Down"
                                                      >
                                                        <i className="ri-arrow-down-line text-sm"></i>
                                                      </button>

                                                      <button
                                                        onClick={() => handleRemovePDF(selectedCategory.id, section.id, pdf.id)}
                                                        className="w-7 h-7 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-500 rounded transition-colors duration-300 cursor-pointer flex items-center justify-center"
                                                        title="Delete PDF"
                                                      >
                                                        <i className="ri-delete-bin-line text-sm"></i>
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                                );
                                              })}
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })()
                    )}
                  </div>
                </div>

                {/* Help Text */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                  <i className="ri-information-line text-blue-500 text-xl flex-shrink-0 mt-0.5"></i>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">How to organize your investor documents:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• <strong>Select a category</strong> from the left sidebar to view and edit its contents</li>
                      <li>• <strong>Sections</strong> - Time periods or sub-categories (e.g., 2024-2025, Q1 2024)</li>
                      <li>• <strong>PDFs</strong> - Individual documents with names and URLs</li>
                      <li>• Use the <strong>arrow buttons</strong> to reorder categories, sections, and PDFs</li>
                      <li>• Click the <strong>arrow icon</strong> next to sections to expand or collapse them</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : selectedPage === 'Home' && sections[activeSection] === 'Clients' ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">Manage client logos</p>
                  <button
                    onClick={handleAddClientLogo}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-add-line"></i>
                    Add Client Logo
                  </button>
                </div>

                {!content.clientLogos || content.clientLogos.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <i className="ri-image-add-line text-4xl text-gray-400 mb-3"></i>
                    <p className="text-gray-500 mb-2">No client logos added yet</p>
                    <p className="text-sm text-gray-400">Add Your First Client Logo</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.clientLogos.map((client, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">Client Logo #{index + 1}</h4>
                          <button
                            onClick={() => handleRemoveClientLogo(index)}
                            className="text-red-500 hover:text-red-700 transition-colors duration-300 cursor-pointer"
                          >
                            <i className="ri-delete-bin-line text-xl"></i>
                          </button>
                        </div>

                        <div className="space-y-3">
                          {/* Client Name */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                            <input
                              type="text"
                              value={client.name || ''}
                              onChange={(e) => handleUpdateClientLogo(index, 'name', e.target.value)}
                              placeholder="Enter client name"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                          </div>

                          {/* Logo Image URL */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Logo Image URL</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={client.logo || ''}
                                onChange={(e) => handleUpdateClientLogo(index, 'logo', e.target.value)}
                                placeholder="Enter logo image URL"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              />
                              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm whitespace-nowrap cursor-pointer">
                                <i className="ri-upload-2-line mr-2"></i>
                                Upload
                              </button>
                            </div>
                            {client.logo && (
                              <div className="mt-3">
                                <img 
                                  src={client.logo} 
                                  alt={client.name || `Client ${index + 1}`} 
                                  className="max-h-20 w-auto object-contain"
                                  onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/200x100?text=Logo';
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Recommended: Transparent PNG logos with consistent height for best display
                </p>
              </div>
            ) : selectedPage === 'Home' && sections[activeSection] === 'Testimonials' ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">Manage customer testimonials</p>
                  <button
                    onClick={handleAddTestimonial}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-add-line"></i>
                    Add Testimonial
                  </button>
                </div>

                {!content.testimonials || content.testimonials.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <i className="ri-chat-quote-line text-4xl text-gray-400 mb-3"></i>
                    <p className="text-gray-600 font-medium">No testimonials added yet</p>
                    <p className="text-sm text-gray-500 mt-1">Click "Add Testimonial" to create your first testimonial</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {content.testimonials.map((testimonial, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-gray-900">Testimonial #{index + 1}</h4>
                          <button
                            onClick={() => handleRemoveTestimonial(index)}
                            className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                          >
                            <i className="ri-delete-bin-line text-xl"></i>
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Testimonial Text
                            </label>
                            <textarea
                              value={testimonial.text || ''}
                              onChange={(e) => {
                                if (e.target.value.length <= 500) {
                                  handleUpdateTestimonial(index, 'text', e.target.value);
                                }
                              }}
                              placeholder="Enter customer testimonial..."
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                              rows={4}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              {(testimonial.text || '').length}/500 characters
                            </p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Author / Said By
                            </label>
                            <input
                              type="text"
                              value={testimonial.author || ''}
                              onChange={(e) => handleUpdateTestimonial(index, 'author', e.target.value)}
                              placeholder="Enter author name..."
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : selectedPage === 'Home' && sections[activeSection] === 'Services' ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">Manage services</p>
                  <button
                    onClick={handleAddService}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-add-line"></i>
                    Add Service
                  </button>
                </div>

                {!content.services || content.services.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <i className="ri-service-line text-4xl text-gray-400 mb-3"></i>
                    <p className="text-gray-600 font-medium">No services added yet</p>
                    <p className="text-sm text-gray-500 mt-1">Click "Add Service" to create your first service</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {content.services.map((service, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-gray-900">Service #{index + 1}</h4>
                          <button
                            onClick={() => handleRemoveService(index)}
                            className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                          >
                            <i className="ri-delete-bin-line text-xl"></i>
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Service Image URL
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={service.image || ''}
                                onChange={(e) => handleUpdateService(index, 'image', e.target.value)}
                                placeholder="Enter image URL..."
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              />
                              <button className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap cursor-pointer">
                                <i className="ri-upload-2-line"></i>
                              </button>
                            </div>
                            {service.image && (
                              <div className="mt-3">
                                <img 
                                  src={service.image} 
                                  alt={service.title || 'Service preview'}
                                  className="w-full h-48 object-cover rounded-lg"
                                  onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                                  }}
                                />
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Service Title
                            </label>
                            <input
                              type="text"
                              value={service.title || ''}
                              onChange={(e) => handleUpdateService(index, 'title', e.target.value)}
                              placeholder="Enter service title..."
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <textarea
                              value={service.description || ''}
                              onChange={(e) => {
                                if (e.target.value.length <= 500) {
                                  handleUpdateService(index, 'description', e.target.value);
                                }
                              }}
                              placeholder="Enter service description..."
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                              rows={4}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              {(service.description || '').length}/500 characters
                            </p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Learn More Link
                            </label>
                            <input
                              type="text"
                              value={service.link || ''}
                              onChange={(e) => handleUpdateService(index, 'link', e.target.value)}
                              placeholder="Enter link URL (e.g., /service-details or https://example.com)"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Background Image Upload for Hero Section */}
                {sections[activeSection] === 'Hero' && (
                  <>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          <i className="ri-image-line mr-2"></i>
                          {selectedPage === 'Home' ? 'Hero Slider Images' : 'Background Image'}
                        </label>
                        {selectedPage === 'Home' && (
                          <button
                            onClick={handleAddSlideImage}
                            className="flex items-center gap-2 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap text-xs font-medium"
                          >
                            <i className="ri-add-line"></i>
                            Add Slide
                          </button>
                        )}
                      </div>

                      {selectedPage === 'Home' ? (
                        // Multiple images for Home page slider
                        <div className="space-y-4">
                          {content.heroSlides && content.heroSlides.length > 0 ? (
                            content.heroSlides.map((slide, index) => (
                              <div key={index} className="p-4 bg-white rounded-lg border-2 border-orange-200 space-y-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-bold text-gray-900">Slide {index + 1}</span>
                                  {content.heroSlides!.length > 1 && (
                                    <button
                                      onClick={() => handleRemoveSlideImage(index)}
                                      className="text-red-500 hover:text-red-700 cursor-pointer"
                                    >
                                      <i className="ri-delete-bin-line"></i>
                                    </button>
                                  )}
                                </div>
                                
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Image URL
                                  </label>
                                  <input
                                    type="url"
                                    value={slide.image}
                                    onChange={(e) => handleUpdateSlideImage(index, e.target.value)}
                                    placeholder="Enter image URL"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                  />
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer"
                                  >
                                    <i className="ri-upload-2-line mr-2"></i>
                                    Upload Image
                                  </button>
                                  <span className="text-xs text-gray-500">or enter URL above</span>
                                </div>

                                {/* Image Preview */}
                                {slide.image && (
                                  <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                                    <p className="text-xs font-medium text-gray-700 mb-2">Preview:</p>
                                    <img 
                                      src={slide.image} 
                                      alt={`Slide ${index + 1}`}
                                      className="w-full h-32 object-cover rounded"
                                      onError={(e) => {
                                        e.currentTarget.src = 'https://via.placeholder.com/1920x1080?text=Image+Not+Found';
                                      }}
                                    />
                                  </div>
                                )}

                                {/* Title Items for this slide */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="block text-sm font-medium text-gray-700">
                                      <i className="ri-list-ordered mr-2"></i>
                                      Title Items (Ordered)
                                    </label>
                                    <button
                                      onClick={() => handleAddSlideTitleItem(index)}
                                      className="flex items-center gap-2 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap text-xs font-medium"
                                    >
                                      <i className="ri-add-line"></i>
                                      Add Title Item
                                    </button>
                                  </div>

                                  {!slide.titleItems || slide.titleItems.length === 0 ? (
                                    <div className="text-center py-6 bg-white rounded-lg border-2 border-dashed border-gray-300">
                                      <i className="ri-text text-2xl text-gray-400 mb-2"></i>
                                      <p className="text-xs text-gray-500">No title items added yet</p>
                                    </div>
                                  ) : (
                                    <div className="space-y-3">
                                      {slide.titleItems.map((item, itemIndex) => (
                                        <div key={item.id} className="bg-white rounded-lg p-3 border border-gray-200">
                                          <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                              <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                                {itemIndex + 1}
                                              </span>
                                              <span className="text-xs font-medium text-gray-700">Title Item</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <button
                                                onClick={() => handleMoveSlideTitleItem(index, item.id, 'up')}
                                                disabled={itemIndex === 0}
                                                className={`${itemIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-orange-500 cursor-pointer'} transition-colors`}
                                              >
                                                <i className="ri-arrow-up-line text-lg"></i>
                                              </button>
                                              <button
                                                onClick={() => handleMoveSlideTitleItem(index, item.id, 'down')}
                                                disabled={itemIndex === slide.titleItems.length - 1}
                                                className={`${itemIndex === slide.titleItems.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-orange-500 cursor-pointer'} transition-colors`}
                                              >
                                                <i className="ri-arrow-down-line text-lg"></i>
                                              </button>
                                              <button
                                                onClick={() => handleRemoveSlideTitleItem(index, item.id)}
                                                className="text-red-500 hover:text-red-700 transition-colors cursor-pointer ml-2"
                                              >
                                                <i className="ri-delete-bin-line text-lg"></i>
                                              </button>
                                            </div>
                                          </div>

                                          <div className="space-y-2">
                                            <div>
                                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                                Title Text
                                              </label>
                                              <input
                                                type="text"
                                                value={item.title}
                                                onChange={(e) => handleUpdateSlideTitleItem(index, item.id, 'title', e.target.value)}
                                                placeholder="Enter title text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                              />
                                            </div>

                                            <div className="flex items-center gap-2">
                                              <input
                                                type="checkbox"
                                                id={`isSmall-${index}-${item.id}`}
                                                checked={item.isSmall}
                                                onChange={(e) => handleUpdateSlideTitleItem(index, item.id, 'isSmall', e.target.checked)}
                                                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                              />
                                              <label htmlFor={`isSmall-${index}-${item.id}`} className="text-xs text-gray-700 cursor-pointer">
                                                Is Small (smaller font size)
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  <p className="text-xs text-gray-500 mt-2">
                                    <i className="ri-information-line mr-1"></i>
                                    Use the arrows to reorder items. Items marked as "Is Small" will display with a smaller font size.
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-4 text-gray-500">
                              <p>No slides added yet. Click "Add Slide" to get started.</p>
                            </div>
                          )}
                          <p className="text-xs text-gray-500 mt-2">
                            Recommended size: 1920x1080px for best quality
                          </p>
                        </div>
                      ) : (
                        // Single image for other pages
                        <div className="space-y-3">
                          <input
                            type="url"
                            value={content.heroImages[0] || ''}
                            onChange={(e) => handleUpdateSlideImage(0, e.target.value)}
                            placeholder="Enter image URL"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer"
                            >
                              <i className="ri-upload-2-line mr-2"></i>
                              Upload Image
                            </button>
                            <span className="text-xs text-gray-500">or enter URL above</span>
                          </div>

                          {/* Image Preview */}
                          {content.heroImages[0] && (
                            <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-xs font-medium text-gray-700 mb-2">Preview:</p>
                              <img 
                                src={content.heroImages[0]} 
                                alt="Background"
                                className="w-full h-32 object-cover rounded"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://via.placeholder.com/1920x1080?text=Image+Not+Found';
                                }}
                              />
                            </div>
                          )}
                          
                          <p className="text-xs text-gray-500">
                            Recommended size: 1920x1080px for best quality
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Hero Title Items - Only for non-Home pages */}
                    {selectedPage !== 'Home' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <label className="block text-sm font-medium text-gray-700">
                            <i className="ri-list-ordered mr-2"></i>
                            Title Items (Ordered)
                          </label>
                          <button
                            onClick={handleAddHeroTitleItem}
                            className="flex items-center gap-2 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap text-xs font-medium"
                          >
                            <i className="ri-add-line"></i>
                            Add Title Item
                          </button>
                        </div>

                        {!content.heroTitleItems || content.heroTitleItems.length === 0 ? (
                          <div className="text-center py-8 bg-white rounded-lg border-2 border-dashed border-gray-300">
                            <i className="ri-text text-3xl text-gray-400 mb-2"></i>
                            <p className="text-sm text-gray-500">No title items added yet</p>
                            <p className="text-xs text-gray-400 mt-1">Add your first title item</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {content.heroTitleItems.map((item, index) => (
                              <div key={item.id} className="bg-white rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                      {index + 1}
                                    </span>
                                    <span className="text-sm font-medium text-gray-700">Title Item</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => handleMoveHeroTitleItem(item.id, 'up')}
                                      disabled={index === 0}
                                      className={`${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-orange-500 cursor-pointer'} transition-colors`}
                                    >
                                      <i className="ri-arrow-up-line text-lg"></i>
                                    </button>
                                    <button
                                      onClick={() => handleMoveHeroTitleItem(item.id, 'down')}
                                      disabled={index === content.heroTitleItems!.length - 1}
                                      className={`${index === content.heroTitleItems!.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-orange-500 cursor-pointer'} transition-colors`}
                                    >
                                      <i className="ri-arrow-down-line text-lg"></i>
                                    </button>
                                    <button
                                      onClick={() => handleRemoveHeroTitleItem(item.id)}
                                      className="text-red-500 hover:text-red-700 transition-colors cursor-pointer ml-2"
                                    >
                                      <i className="ri-delete-bin-line text-lg"></i>
                                    </button>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                      Title Text
                                    </label>
                                    <input
                                      type="text"
                                      value={item.title}
                                      onChange={(e) => handleUpdateHeroTitleItem(item.id, 'title', e.target.value)}
                                      placeholder="Enter title text"
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                    />
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      id={`isSmall-${item.id}`}
                                      checked={item.isSmall}
                                      onChange={(e) => handleUpdateHeroTitleItem(item.id, 'isSmall', e.target.checked)}
                                      className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                    />
                                    <label htmlFor={`isSmall-${item.id}`} className="text-sm text-gray-700 cursor-pointer">
                                      Is Small (smaller font size)
                                    </label>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <p className="text-xs text-gray-500 mt-3">
                          <i className="ri-information-line mr-1"></i>
                          Use the arrows to reorder items. Items marked as "Is Small" will display with a smaller font size.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Supabase Connection Notice */}
        {/* <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="ri-database-2-line text-white"></i>
            </div>
            <div>
              <h4 className="font-bold text-orange-900 mb-2">Connect Supabase for Database Storage</h4>
              <p className="text-sm text-orange-800 mb-3">
                Currently, content is stored in browser localStorage (temporary). Connect Supabase to:
              </p>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Store content permanently in a database</li>
                <li>• Edit all page sections (hero,about, services, team members, etc.)</li>
                <li>• Manage images, videos, and media files</li>
                <li>• Real-time content updates across all pages</li>
                <li>• Content versioning and backup</li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
