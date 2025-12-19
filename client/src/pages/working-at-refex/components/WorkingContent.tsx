import { useState } from 'react';

export default function WorkingContent() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const programs = [
    {
      image: 'https://refexrenewables.com/img/residential/blood-donation.png',
      title: 'Life Insurance',
      description: 'Refex places utmost importance on the security and well-being of its employees. A comprehensive life insurance scheme has been introduced for all employees regardless of position, background, pay status, or age. The coverage offers a high sum assured up to ₹5 Crore with minimal employee contribution and substantial support from the organization. The Company is also exploring ways to extend this benefit beyond an employee\'s tenure with RRIL.'
    },
    {
      image: 'https://refexrenewables.com/img/residential/health-insurance.png',
      title: 'Health Insurance',
      description: 'To strengthen RRIL\'s commitment to employee well-being, the Company has doubled the health insurance coverage limit for all employees. Additionally, Company-wide physical health check-ups have been organized to promote proactive health management.'
    },
    {
      image: 'https://refexrenewables.com/img/residential/anshuman-college-of-engg.png',
      title: 'Personal Accident Insurance',
      description: 'All Refex employees are covered under Personal Accident Insurance. This policy ensures financial security in case of accidents resulting in partial, total, or permanent disabilities, or unfortunate loss of life.'
    },
    {
      image: 'https://refexrenewables.com/img/residential/Hospital-at-bikaner.png',
      title: 'Workmen\'s Compensation',
      description: 'Under this policy, the Company has covered 99 workers (inclusive of on-roll and contractual workers) of RRIL for unforeseen events, however utmost safety measures are already accommodated within the usage of PPEs to ensure a safe work environment (accident/incident free).'
    },
    {
      image: 'https://refexrenewables.com/img/residential/IVLdhunseri-chemicalfactory.png',
      title: 'Health Camp',
      description: 'For the holistic well-being of employees, company-wide health screenings, including extensive blood tests and calcium monitoring were conducted. Webinars by medical experts further educated employees on maintaining good health.'
    },
    {
      image: 'https://refexrenewables.com/img/residential/IVLdhunseri-chemicalfactory.png',
      title: 'International Men\'s Day Celebration',
      description: 'A physical wellness session was conducted for all the male employees of Refexians to encourage and educate healthy lifestyle choices and regular physical activity by one of the members from the leadership team. The session motivated the employees to engage in group fitness activities to build camaraderie.'
    },
    {
      image: 'https://refexrenewables.com/img/residential/csk-football.png',
      title: 'Partnering with Chennaiyin Football Club',
      description: 'In a significant step toward strengthening the Company\'s brand visibility and community engagement, Refex proudly partnered with Chennaiyin FC for the 2024 Indian Super League (ISL) season. This collaboration allowed the organization to align with one of the nation\'s most passionate sporting platforms, tapping into the vibrant energy of football fans across the Country. Through this partnership, the brand was featured across stadium activations, digital campaigns, and team merchandise, amplifying the Company\'s presence and connecting with a diverse, youthful audience. The association also provided opportunities for customer engagement, employee involvement, and brand storytelling in innovative ways.'
    },
    {
      image: 'https://refexrenewables.com/img/residential/refex-img.png',
      title: 'Partnering with Chennai Super Kings',
      description: 'Refex became an official partner of Chennai Super Kings (CSK) during the Indian Premier League 2025. This association underscored the Company\'s dedication to supporting sporting excellence and connecting with millions of passionate cricket fans across the Country, while also gathering maximum visibility for the brand. Refex is honored to have been part of such a prestigious tournament and is proud to stand alongside a team that exemplifies talent, teamwork, and determination that resonates with the Company\'s ethos. A meet & greet event was held to felicitate the star players of the team and for the Refex team to meet the players.'
    },
    {
      image: 'https://refexrenewables.com/img/residential/training-champian.png',
      title: 'Training and Awareness Campaigns',
      description: 'Refex adopts a comprehensive approach to training and awareness, focusing on key areas such as climate change, biodiversity conservation, and health and safety. The company\'s efforts are guided by its core vision and are designed to create long-term awareness among employees, workers, customers, and external stakeholders. Refex actively initiates, collaborates on, and participates in various safety awareness programs aimed at educating not only its workforce but also the wider community about the importance of health and safety.'
    },
    {
      image: 'https://refexrenewables.com/img/residential/road-safty.png',
      title: 'Road Safety Week',
      description: 'In January 2025, Refex Renewables & Infrastructure Limited launched a Road Safety campaign as part of National Road Safety Month. Held in collaboration with the Chennai Traffic Police and supported by the general public, the initiative aimed to raise awareness about road safety and encourage responsible driving behaviour.'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % programs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + programs.length) % programs.length);
  };

  const accordionItems = [
    {
      title: 'The EI Hulk – An immersive workshop on Emotional Intelligence',
      content: 'The EI Hulk program is designed to enhance Emotional Intelligence (EI), a vital skill for fostering stronger, more empathetic relationships both within and outside the workplace. Through this initiative, participants learn to manage their own emotions, understand the emotions of others, and apply this awareness to improve communication, collaboration, and leadership effectiveness. By cultivating emotional intelligence, the program empowers Refex employees to become more adaptable, resilient, and deeply connected in their professional environments.'
    },
    {
      title: 'Mail Matters – Mastering Email Etiquette',
      content: 'Mail Matters is a focused workshop that equips Refex employees with the essential skills to communicate professionally and effectively via email. It covers key aspects such as maintaining a professional tone, structuring clear and concise messages, and avoiding common communication pitfalls. This program ensures that participants can navigate email communication with clarity, confidence, and impact.'
    },
    {
      title: 'Message Mastery – Purposeful Communication',
      content: 'Effective communication is the cornerstone of a productive workplace. Message Mastery helps participants hone their verbal and written communication skills, focusing on delivering clear, concise, and purposeful messages that drive results. This workshop empowers employees to communicate with confidence and influence, ensuring their messages align with organizational goals and resonate with their audience.'
    },
    {
      title: 'Refex Signature – Executive Presence Training',
      content: 'Refex Signature is all about helping individuals project the level of professionalism and authority needed to inspire confidence in others. In this workshop, participants will explore the elements of Executive Presence - including posture, tone, and how to command attention in meetings or presentations. The program focuses on developing personal gravitas, boosting leadership confidence, and ensuring that employees are ready to step into positions of influence within the organization.'
    },
    {
      title: 'A+ Advantage – Building High-Performance Teams',
      content: 'A+ Advantage is dedicated to cultivating the skills needed to build and sustain high-performance teams. This workshop takes a deep dive into team dynamics, exploring how to foster collaboration, manage conflict, and leverage individual strengths to drive collective success. Participants will leave with actionable strategies to create cohesive, results-oriented teams that can overcome challenges and achieve outstanding outcomes.'
    },
    {
      title: 'RILEy – Immersive Workshop on Impactful Thinking and Decision Making',
      content: 'RILEy is an immersive, hands-on workshop designed to strengthen critical thinking and decision-making skills. Through real-world scenarios, collaborative discussions, and practical problem-solving exercises, participants are challenged to think strategically and make sound decisions under pressure. This program enhances decision-making clarity, encourages creative solutions, and builds confidence in employees\' ability to navigate complex challenges effectively.'
    },
    {
      title: 'The Refex PRO Competency Model',
      content: 'The Company\'s PRO Competency Model serves as the foundation of all people practices at Refex. PRO stands for People, Results, and Organization, and includes 12 core competencies that guide its approach to talent. This model is being gradually integrated across various critical talent processes including recruitment, performance management, engagement, development, and succession planning.'
    },
    {
      title: 'Refex PACE',
      content: 'Launching soon, Refex PACE is a thoughtfully crafted initiative that redefines Refex\'s organizational values, offering a fresh perspective centered around adopting meta-values that resonate across every touchpoint in RRIL\'s value chain. Designed with a deliberate and mindful approach, Refex PACE seeks to seamlessly integrate these values into every aspect of its operations. This initiative aims to establish a unified framework for how the Company engage with its employees, customers, partners, and stakeholders, ensuring that each interaction is aligned with its core principles and drives meaningful connections across all levels of the organization.'
    },
    {
      title: 'PACE stands for...',
      content: '<strong>Principled Excellence</strong><br/>A commitment to high performance that is always grounded in strong, non-negotiable values.<br/><br/><strong>Authenticity</strong><br/>Emphasizes being genuine and true - fosters trust and transparency.<br/><br/><strong>Customer Value</strong><br/>A commitment to deliver exceptional value to our customers by understanding their needs, providing innovative solutions, and consistently offering high-quality products and services. A focus on creating lasting relationships built on trust, satisfaction, and mutual success.<br/><br/><strong>Esteem Culture</strong><br/>A core belief that every individual deserves respect, recognition, and the opportunity to grow. A commitment to foster a culture where people feel valued, heard, and empowered to do their best work.'
    },
    {
      title: 'Refex BEAT',
      content: 'Refex BEAT is the in-house employee engagement survey created to amplify employee voices. It enables the Company to co-create a fulfilling and inclusive workplace experience.<br/><br/><strong>The acronym \'BEAT\' reflects key engagement drivers:</strong><br/>• <strong>B</strong>elonging<br/>• <strong>E</strong>mpowerment<br/>• <strong>A</strong>spiration<br/>• <strong>T</strong>eam<br/><br/>The survey provides insights into the heartbeat of the organization culture, helping to elevate it together.'
    },
    {
      title: 'AI Unlocked',
      content: 'An upcoming program focused on demystifying artificial intelligence for everyday business use. It aims to build foundational understanding and drive AI fluency across the organization.'
    },
    {
      title: 'The KMP (Key Managerial Personnel) Workshop',
      content: 'The KMP Workshop is a high-impact orientation designed exclusively for Refex\'s leadership team. Structured as a masterclass, this program equips the key managerial personnel with a comprehensive understanding of the strategic, cultural, legal, and ethical dimensions of leadership at Refex. This immersive experience serves as a foundational platform to ensure that Refex leaders are well-versed in governance, risk, culture, and performance. It empowers them to lead with purpose, align with regulatory expectations, and contribute to sustainable, responsible growth.<br/><br/>• Refex\'s Strategic Direction and Cultural Ethos<br/>• Duties, Roles, and Responsibilities of the Board<br/>• Director Liabilities<br/>• Roles of Mandatory Board Committees<br/>• Key Enforcement Areas on SEBI\'s Radar<br/>• Human Rights Issues in Corporate Governance<br/>• Anti-Bribery and Corruption (ABAC) Policies'
    },
    {
      title: 'PoSH Training',
      content: 'Creating a safe, respectful, and inclusive workplace is a top priority. Refex conducts regular training sessions on the Code of Conduct and PoSH (Prevention of Sexual Harassment) to ensure that every employee understands their rights and responsibilities in fostering a harassment-free environment.'
    }
  ];

  return (
    <div id="content" className="bg-white">
      {/* People Engagement Programs */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-black text-center mb-12">
            People Engagement Programs
          </h1>
          
          <div className="mb-16">
            <h3 className="text-2xl lg:text-3xl font-bold text-black mb-6">
              Employee Stock Option Plan (ESOP)
            </h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                In a landmark move towards inclusive growth and recognition, Refex offered participation in its Employee Stock Option Plan (ESOP) to all eligible employees ranging from drivers to general managers. This initiative was executed with fairness, transparency, and a commitment to rewarding performance while boosting employee retention. It is designed to recognize the dedication and hard work of every employee, regardless of their title or position.
              </p>
              <p>
                Unlike many organizations that restrict ESOPs to senior levels, this approach includes all employees, underscoring the company's commitment to inclusive growth. At RRIL, the ESOP goes beyond being a financial perk – it helps employees achieve life-changing milestones, such as funding children's education or investing in retirement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Programs Slider */}
      <section className="py-20 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-black mb-12">Our Programs</h1>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Slider */}
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img 
                  src={programs[currentSlide].image} 
                  alt={programs[currentSlide].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <button 
                  onClick={prevSlide}
                  className="w-12 h-12 flex items-center justify-center bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors cursor-pointer"
                >
                  <i className="ri-arrow-left-line text-xl"></i>
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-12 h-12 flex items-center justify-center bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors cursor-pointer"
                >
                  <i className="ri-arrow-right-line text-xl"></i>
                </button>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">
                {programs[currentSlide].title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {programs[currentSlide].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning & Development */}
      <section className="py-20 px-6 lg:px-12 bg-orange-500">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">Learning & Development</h2>
          <p className="text-white leading-relaxed text-lg">
            At Refex, learning is not viewed as a destination but as a continuous way of life. The organization believes that true excellence arises from a growth mindset and a relentless commitment to daily improvement. This philosophy is deeply woven into the social fabric of Refex and is embodied through a dynamic, holistic, and constantly evolving learning and talent management ecosystem. The following is a snapshot of the core elements that shape this landscape. As a function, Refex embraces incremental progress to drive exponential results. Many of its programs are regularly refined to meet the changing needs of its diverse and growing talent pool.
          </p>
        </div>
      </section>

      {/* Learning Programs */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="mb-6">
                <img 
                  src="https://refexrenewables.com/img/residential/dialogs-logo.png" 
                  alt="Refex Dialogue"
                  className="mx-auto h-24 object-contain"
                />
              </div>
              <p className="text-gray-700 leading-relaxed">
                To foster a culture of continuous learning, Refex has developed its proprietary learning platform – Refex Dialogue. This platform showcases thought leadership and insights from senior business leaders, providing employees with a unique perspective into various functions across the organization. Through these dialogues, employees gain cross-functional knowledge and can explore internal career opportunities via the integrated job portal.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <img 
                  src="https://refexrenewables.com/img/residential/purple-flow.png" 
                  alt="Purple Flow"
                  className="mx-auto h-24 object-contain"
                />
              </div>
              <p className="text-gray-700 leading-relaxed">
                Purple Flow is Refex's monthly microlearning initiative, designed to deliver curated, high-impact learning resources in bite-sized formats. It enables on-the-go development and supports continuous skilling across the organization.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <img 
                  src="https://refexrenewables.com/img/residential/refex-essential.png" 
                  alt="Refexentials"
                  className="mx-auto h-24 object-contain"
                />
              </div>
              <p className="text-gray-700 leading-relaxed">
                Refexentials – Our Refex, Our Essentials – is a comprehensive and evolving learning journey designed by Refex to provide monthly learning opportunities through both in-person sessions and virtual instructor-led training (VILT). These dynamic sessions are tailored to deepen employees' understanding of the organizational culture while accelerating their individual professional growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vamika Section */}
      <section className="py-20 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://refexrenewables.com/img/residential/vamika-women.JPG" 
                alt="Vamika Women Forum"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-orange-500 mb-6">
                Vamika: Exclusive Forum for Women
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Fostering a diverse and inclusive culture is a core belief at Refex. Currently, approximately 11% of the workforce constitutes women. Recognising the importance of women in building a stronger organisation, significant emphasis is placed on empowering them at all levels and providing a comprehensive support to enable their growth and well-being. Vamika, a special internal networking forum, has been specifically established as a women-centric platform to offer holistic support to women employees. The forum convenes monthly meetings, where diverse topics related to self-help, career advancement, and holistic wellness are discussed. Such gatherings provide a safe and supportive space for women to exchange ideas, seek advice, and foster personal and professional growth. Comprehensive support for physical and mental well-being is also provided under Vamika on a continual basis. This includes special focus on breaking the stigma attached to mental health issues through monthly mental wellness webinars and awareness sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* International Women's Day */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-orange-500 mb-6">
                International Women's Day Celebration
              </h2>
              <p className="text-gray-700 leading-relaxed">
                International Women's Day at Refex was celebrated with energy, enthusiasm, and appreciation for the incredible women of the Company. The day began with a series of fun games like bingo that brought laughter and friendly competition and followed by a refreshing yoga session to promote well-being. One of the highlights of the celebration was an interactive workshop titled 'Reflections: Mirrors for Growth' - An immersive workshop to awaken self-awareness, build resilience, and celebrate self-worth. As part of the celebration, Refex hosted an interactive, art-based theatre workshop conducted by Training Sideways, open to all employees. The session highlighted the importance of workplace diversity and the value of fostering an inclusive culture.
              </p>
            </div>
            <div>
              <img 
                src="https://refexrenewables.com/img/residential/international-womennday.JPG" 
                alt="International Women's Day"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section - No Accordion */}
      <section className="py-20 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {accordionItems.map((item, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-2xl font-bold text-orange-500 uppercase">
                  {item.title}
                </h3>
                <div 
                  className="text-gray-700 leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
