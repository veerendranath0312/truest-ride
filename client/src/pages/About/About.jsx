import { useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import "./about.css";

const stakeholders = [
  {
    name: "Rakesh Kumar Vasa",
    title: "Student at Rowan University",
    description: ` Truest Ride empowers students with safe, low-cost weekend travel. Built on trust and community, it connects riders within their campus network for a secure experience.`,
    img: ".././../src/assets/images/rakesh.png",
    linkedin: "#",
  },
];

const professors = [
  {
    name: "Gregory S. DeLozier",
    email: "gdelozie@kent.edu",
    img: ".././../src/assets/images/proff1.png",
  },
  {
    name: "Boggia, Branson",
    email: "bboggia@kent.edu",
    linkedin: "#",
    img: ".././../src/assets/images/branson.png",
  },
];

const students = [
  {
    name: "Veerendranath",
    role: "Frontend Developer",
    email: "vpottipa@kent.edu",
    linkedin: "#",
    img: "../../assets/images/veerendra.HEIC",
  },
  {
    name: "Arunkumar Turaka",
    role: "UI/UX Designer",
    email: "aturaka@kent.edu",
    linkedin: "#",
    img: ".././../src/assets/images/arun.jpeg",
  },
  {
    name: "Jagadeesh",
    role: "Backend Developer",
    email: "Jaladasu@kent.edu",
    linkedin: "#",
    img: " ",
  },
  {
    name: "SwethaNagaSai chirumamilla ",
    role: "Frontend Developer",
    email: "schirum4@kent.edu ",
    linkedin: "#",
    img: " ",
  },
  {
    name: "Hrushikesh Tadepally",
    role: "Backend Developer",
    email: "htadepal@kent.edu ",
    linkedin: "#",
    img: " ",
  },
  {
    name: "Shivasaketh Simaladari ",
    role: "Frontend Developer",
    email: "ssimalad@kent.edu",
    linkedin: "#",
    img: " ",
  },
  {
    name: "Srilakshmi Dasari",
    role: "Backend Developer",
    email: "dsrilaks@kent.edu ",
    linkedin: "#",
    img: " ",
  },
];

const About = () => {
  const [activeSection, setActiveSection] = useState("about");

  // Create refs for each section
  const aboutRef = useRef(null);
  const teamRef = useRef(null);
  const missionRef = useRef(null);

  const scrollToSection = (sectionRef, sectionName) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveSection(sectionName);
    }
  };

  return (
    <div className="about-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Connecting Students, One Ride at a Time</h1>
          <p className="hero-subtitle">
            We connect students over their shared destinations.
          </p>
          <div className="about-navigation">
            <div className="nav-links">
              <button
                className={`nav-link ${activeSection === "about" ? "active" : ""}`}
                onClick={() => scrollToSection(aboutRef, "about")}
              >
                About
              </button>
              <button
                className={`nav-link ${activeSection === "advisors" ? "active" : ""}`}
                onClick={() => scrollToSection(missionRef, "advisors")}
              >
                Mission
              </button>
              <button
                className={`nav-link ${activeSection === "team" ? "active" : ""}`}
                onClick={() => scrollToSection(teamRef, "team")}
              >
                Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section" ref={aboutRef}>
        <div className="container">
          <div className="story-content">
            <h2>Our Story</h2>
            <p className="story-text">
              Truest Ride began as a simple idea: what if students could travel home for
              the weekend without breaking the bank or compromising on safety? As graduate
              students at Kent State University, we experienced firsthand the challenges
              of expensive flights and unreliable transportation options.
            </p>
            <p className="story-text">
              We envisioned a platform where trust isn&apos; t just a feature—it&apos;s
              the foundation. By connecting students within their campus network,
              we&apos;ve created a community where every ride feels like traveling with a
              friend.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="values-section" ref={missionRef}>
        <div className="container">
          <h2>What Drives Us</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🛡️</div>
              <h3>Safety First</h3>
              <p>
                Campus-verified students only. Every rider and driver is part of our
                trusted university network.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">💰</div>
              <h3>Affordable Travel</h3>
              <p>
                Share costs, not compromises. Making weekend trips home financially
                accessible for every student.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community-Driven</h3>
              <p>
                Built by students who understand student needs. Every feature is designed
                with your experience in mind.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Simple & Fast</h3>
              <p>
                Book rides in seconds, not minutes. Our intuitive platform gets you moving
                quickly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Leadership */}
      <section className="advisors-section">
        <div className="container">
          <h2>Academic Leadership</h2>
          <p className="section-subtitle">
            Guided by experienced faculty who believe in student innovation
          </p>
          <div className="advisors-grid">
            {professors.map((prof, i) => (
              <div key={i} className="advisor-card">
                <div className="advisor-image">
                  <img src={prof.img} alt={prof.name} />
                </div>
                <div className="advisor-info">
                  <h3>{prof.name}</h3>
                  <p>Faculty Advisor</p>
                  <a href={`mailto:${prof.email}`} className="contact-link">
                    {prof.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section" ref={teamRef}>
        <div className="container">
          <h2>Meet the Team</h2>
          <p className="section-subtitle">
            Graduate students passionate about solving real problems
          </p>
          <div className="team-grid">
            {students.map((member, i) => (
              <div key={i} className="team-card">
                <div className="team-image">
                  <img src={member.img || "/api/placeholder/150/150"} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <div className="team-links">
                    <a href={`mailto:${member.email}`} className="team-email">
                      Email
                    </a>
                    {member.linkedin !== "#" && (
                      <a href={member.linkedin} className="team-linkedin">
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stakeholder Spotlight */}
      <section className="stakeholder-section">
        <div className="container">
          <h2>Student Voice</h2>
          <div className="stakeholder-spotlight">
            <div className="stakeholder-image">
              <img src={stakeholders[0].img} alt={stakeholders[0].name} />
            </div>
            <div className="stakeholder-content">
              <blockquote>&ldquo;{stakeholders[0].description}&rdquo;</blockquote>
              <div className="stakeholder-info">
                <h4>{stakeholders[0].name}</h4>
                <p>{stakeholders[0].title}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Travel Experience?</h2>
            <p>
              Join thousands of students who&apos;ve discovered a better way to travel
              home.
            </p>
            <div className="cta-buttons">
              <a href="/signup" className="cta-primary">
                Start Riding
              </a>
              <a href="/contact" className="cta-secondary">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <h3>Questions? We&apos;re Here to Help</h3>
            <p>
              Whether you&apos;re a curious student, university administrator, or just
              want to learn more about our mission.
            </p>
            <a href="mailto:truestride.team@gmail.com" className="footer-contact">
              truestride.team@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
