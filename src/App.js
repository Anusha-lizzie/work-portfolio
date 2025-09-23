import React, { useState, useEffect, useRef } from 'react';

// To ensure your project runs without any file import errors, all styles for this component
// are included directly here. This makes the component self-contained and robust.
const PortfolioStyles = () => (
  <style>{`
    /* --- THEME & GLOBAL VARIABLES --- */
    :root {
      --background-color: #f8f9fa;
      --text-color: #343a40;
      --primary-color: #007bff;
      --card-bg: #ffffff;
      --shadow-color: rgba(0, 0, 0, 0.1);
      --timeline-line: #dee2e6;
      --icon-bg: #e9ecef;
      --icon-bg-hover: #ced4da;
      --header-text: #212529;
      --tag-bg: #e9ecef;
      --tag-text: #495057;
      --button-bg: #007bff;
      --button-text: #ffffff;
      --button-bg-hover: #0056b3;
    }

    html.dark {
      --background-color: #121212;
      --text-color: #e9ecef;
      --primary-color: #3a9cff;
      --card-bg: #1e1e1e;
      --shadow-color: rgba(0, 0, 0, 0.4);
      --timeline-line: #495057;
      --icon-bg: #343a40;
      --icon-bg-hover: #495057;
      --header-text: #ffffff;
      --tag-bg: #343a40;
      --tag-text: #ced4da;
      --button-bg: #3a9cff;
      --button-bg-hover: #007bff;
    }

    body {
      margin: 0;
      background-color: var(--background-color);
      color: var(--text-color);
      transition: background-color 0.5s ease, color 0.5s ease;
      scroll-behavior: smooth;
    }
    
    /* --- LAYOUT & COMPONENT STYLES --- */
    .portfolioContainer { max-width: 900px; margin: 0 auto; padding: 1rem 2rem; }
    .header { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 0; }
    .header h1 { font-size: 1.25rem; font-weight: bold; color: var(--header-text); }
    .themeToggleButton { background: none; border: none; padding: 0.5rem; cursor: pointer; border-radius: 9999px; color: var(--text-color); transition: background-color 0.3s ease; }
    .themeToggleButton:hover { background-color: var(--icon-bg); }
    .hero { text-align: center; padding: 5rem 0; }
    .hero h2 { font-size: 3rem; font-weight: 800; color: var(--header-text); margin-bottom: 1rem; line-height: 1.2; }
    .hero p { max-width: 600px; margin: 0 auto 2rem auto; font-size: 1.25rem; opacity: 0.8; }
    .socialLinks { display: flex; justify-content: center; align-items: center; gap: 1rem; }
    .socialLinks a { display: inline-block; padding: 0.75rem; border-radius: 9999px; background-color: var(--icon-bg); color: var(--text-color); transition: all 0.3s ease; }
    .socialLinks a:hover { background-color: var(--icon-bg-hover); transform: translateY(-3px); }
    .section { padding: 4rem 0; }
    .sectionTitle { font-size: 2.5rem; font-weight: bold; text-align: center; color: var(--header-text); margin-bottom: 3rem; }
    
    /* Scroll Animation Logic */
    .fadeIn { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
    .visible { opacity: 1; transform: translateY(0); }
    
    .skillsContainer { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; }
    .skillTag { background-color: var(--card-bg); box-shadow: 0 4px 6px var(--shadow-color); padding: 0.75rem 1.5rem; border-radius: 8px; font-size: 1.1rem; font-weight: 500; transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .skillTag:hover { transform: translateY(-3px); box-shadow: 0 7px 10px var(--shadow-color); }
    .timeline { position: relative; border-left: 2px solid var(--timeline-line); margin-left: 1rem; padding: 1rem 0;}
    .timelineItem { margin-bottom: 2.5rem; margin-left: 2rem; position: relative; }
    .timelineDot { position: absolute; left: -2.75rem; top: 0.25rem; width: 1.5rem; height: 1.5rem; background-color: var(--background-color); border: 4px solid var(--primary-color); border-radius: 50%; }
    .timelineItem h4 { font-size: 1.25rem; font-weight: 600; color: var(--header-text); margin-bottom: 0.25rem; }
    .timelineItem time { display: block; font-size: 0.9rem; opacity: 0.7; margin-bottom: 0.5rem; }
    .timelineItem ul { list-style-type: disc; padding-left: 1.25rem; margin-top: 0.5rem; opacity: 0.9; }
    .projectGrid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
    @media (min-width: 768px) { .projectGrid { grid-template-columns: repeat(2, 1fr); } }
    .projectCard { background-color: var(--card-bg); padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px var(--shadow-color); transition: transform 0.3s ease, box-shadow 0.3s ease; text-decoration: none; color: inherit; display: flex; flex-direction: column; }
    .projectCard:hover { transform: translateY(-5px); box-shadow: 0 10px 15px var(--shadow-color); }
    .projectCardHeader { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; }
    .projectCardHeader h4 { font-size: 1.25rem; font-weight: bold; color: var(--header-text); }
    .projectCardHeader svg { color: var(--text-color); opacity: 0.6; transition: color 0.3s ease; }
    .projectCard:hover .projectCardHeader svg { color: var(--primary-color); }
    .projectCard p { margin-bottom: 1rem; flex-grow: 1; opacity: 0.9; }
    .projectTags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: auto; }
    .projectTags span { background-color: var(--tag-bg); color: var(--tag-text); font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.75rem; border-radius: 9999px; }
    .contact { text-align: center; }
    .contact p { max-width: 500px; margin: 0 auto 2rem auto; }
    .contactButton { display: inline-block; background-color: var(--button-bg); color: var(--button-text); font-weight: bold; padding: 0.75rem 2rem; border-radius: 8px; text-decoration: none; transition: all 0.3s ease; }
    .contactButton:hover { background-color: var(--button-bg-hover); transform: scale(1.05); }
    .footer { text-align: center; padding: 2rem 0; margin-top: 2rem; border-top: 1px solid var(--timeline-line); opacity: 0.7; }
    @media (max-width: 640px) { .hero h2 { font-size: 2.5rem; } }
  `}</style>
);

// --- SVG ICONS ---
// Self-contained SVG components for icons used in the portfolio.
const SunIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line> <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line> <line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line> <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line> </svg> );
const MoonIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path> </svg> );
const GithubIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.54 2.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> );
const LinkedinIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> );
const MailIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> );
const ExternalLinkIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg> );

// Custom Hook for observing elements and triggering animations on scroll
const useScrollFadeIn = (threshold = 0.1) => {
    const [visibleElements, setVisibleElements] = useState({});
    const elementsRef = useRef(new Map());
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.dataset.id;
              setVisibleElements((prev) => ({ ...prev, [id]: true }));
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold }
      );
  
      const currentElements = elementsRef.current;
      currentElements.forEach((el) => {
        if (el) observer.observe(el);
      });
  
      return () => currentElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    }, [threshold]);
  
    const assignRef = (id) => (el) => {
      if (el) {
        elementsRef.current.set(id, el);
        el.dataset.id = id; // Assign id to the element directly
      } else {
        elementsRef.current.delete(id);
      }
    };
  
    const getSectionClassName = (id) => `section fadeIn ${visibleElements[id] ? 'visible' : ''}`;
  
    return { assignRef, getSectionClassName };
};

// --- MAIN PORTFOLIO COMPONENT ---
export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { assignRef, getSectionClassName } = useScrollFadeIn();
  
    // Effect to toggle dark mode class on the html element
    useEffect(() => {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, [isDarkMode]);
  
    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  
    // Data extracted from your resume
    const skills = ["Java", "Python", "JavaScript", "HTML", "CSS", "ReactJS", "NodeJS", "SQL", "GitHub"];
    const projects = [
      {
        title: "Quote-Generator",
        description: "Built a responsive full-stack application with a Python/Flask REST API and a vanilla JavaScript front-end. Implemented seamless offline functionality by fetching from a live API online and using a local data fallback.",
        tags: ["Python", "Flask", "JavaScript", "REST API"],
        link: "https://github.com/Anusha-lizzie/Quote-A-Day"
      },
      {
        title: "Task Tracker",
        description: "Built a responsive to-do application with HTML, CSS, and JavaScript, focusing on dynamic DOM manipulation. Engineered a deadline-driven alert system using the Browser Push Notifications API.",
        tags: ["JavaScript", "HTML5", "CSS3", "Web APIs"]
      },
      {
        title: "Firstcry Full Stack Clone",
        description: "Developed a clone of the Firstcry website using HTML, CSS, and JavaScript. Implemented features such as product listing, shopping cart, and user authentication.",
        tags: ["HTML5", "CSS3", "JavaScript"]
      },
      {
        title: "Machine Learning for Predictive Modeling",
        description: "Completed an industry-focused project applying supervised and unsupervised ML models on IBM Cloud. Built and trained models for predictive analytics, evaluated model accuracy, and optimized performance.",
        tags: ["Machine Learning", "Python", "IBM Cloud"]
      }
    ];
    const experiences = [
        {
          role: "Intern",
          company: "CODEBEAT",
          date: "June 2024 - July 2024",
          points: [
            "Assisted in the development of full stack web applications, utilizing a range of technologies and frameworks.",
            "Participated in both frontend and backend development, ensuring seamless integration and functionality.",
            "Engaged in code reviews, debugging, and testing to maintain high code quality and performance."
          ]
        },
        {
          role: "Intern",
          company: "Ingenious-Tech",
          date: "May 2024 - September 2024",
          points: [
            "Executed Azure services for superior web development.",
            "Crafted responsive web interfaces with cutting-edge technologies.",
            "Collaborated on troubleshooting and optimizing web applications for seamless user experience."
          ]
        }
      ];
  
    return (
      <>
        <PortfolioStyles />
        <div className="portfolioContainer">
          <header className="header">
            <h1>Anusha Mohanty</h1>
            <button onClick={toggleDarkMode} className="themeToggleButton" aria-label="Toggle dark mode">
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </header>
    
          <main>
            <section className="hero">
              <h2>Cloud Application & Software Developer</h2>
              <p>
                Driven by a passion for excellence, I build innovative and efficient web applications, fostering positive change in technology.
              </p>
              <div className="socialLinks">
                <a href="https://github.com/Anusha-lizzie" target="_blank" rel="noopener noreferrer"><GithubIcon /></a>
                <a href="https://www.linkedin.com/in/anushamohanty/" target="_blank" rel="noopener noreferrer"><LinkedinIcon /></a>
                <a href="mailto:anushamohanty5@gmail.com"><MailIcon /></a>
              </div>
            </section>
    
            <section id="skills" ref={assignRef('skills')} className={getSectionClassName('skills')}>
              <h3 className="sectionTitle">Technical Skills</h3>
              <div className="skillsContainer">
                {skills.map(skill => <div key={skill} className="skillTag">{skill}</div>)}
              </div>
            </section>
  
            <section id="experience" ref={assignRef('experience')} className={getSectionClassName('experience')}>
              <h3 className="sectionTitle">Experience</h3>
              <div className="timeline">
                  {experiences.map((exp, index) => (
                      <div key={index} className="timelineItem">
                          <div className="timelineDot"></div>
                          <h4>{exp.role} @ {exp.company}</h4>
                          <time>{exp.date}</time>
                          <ul>
                             {exp.points.map((point, i) => <li key={i}>{point}</li>)}
                          </ul>
                      </div>
                  ))}
              </div>
            </section>
    
            <section id="projects" ref={assignRef('projects')} className={getSectionClassName('projects')}>
              <h3 className="sectionTitle">Projects</h3>
              <div className="projectGrid">
                {projects.map(project => (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" key={project.title} className="projectCard">
                    <div className="projectCardHeader">
                      <h4>{project.title}</h4>
                      {project.link && <ExternalLinkIcon />}
                    </div>
                    <p>{project.description}</p>
                    <div className="projectTags">
                      {project.tags.map(tag => <span key={tag}>{tag}</span>)}
                    </div>
                  </a>
                ))}
              </div>
            </section>
    
            <section id="contact" ref={assignRef('contact')} className={getSectionClassName('contact')}>
              <h3 className="sectionTitle">Get In Touch</h3>
              <p>I'm currently seeking new opportunities and would love to hear from you. Feel free to reach out via email or connect with me on social media.</p>
              <a href="mailto:anushamohanty5@gmail.com" className="contactButton">
                Say Hello
              </a>
            </section>
          </main>
    
          <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Anusha Mohanty. Coded with passion.</p>
          </footer>
        </div>
      </>
    );
}

