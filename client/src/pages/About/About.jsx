import { useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import JoinUs from "../../components/JoinUs";
import Footer from "../../components/Footer";

import bransonImg from "/branson.png";
import gregImg from "/greg.png";
import veerendraImg from "/veerendra.JPG";
import arunImg from "/arun.jpg";
import jagadeeshImg from "/jagadeesh.jpg";
import nagasaiImg from "/nagasai.jpg";
import sakethImg from "/saketh.jpg";
import rakeshImg from "/rakesh.png";
import sriImg from "/sri.JPG";
import notionImg from "/my-notion-face-portrait.PNG";

import "./about.css";

const stakeholders = [
  {
    name: "Rakesh Kumar Vasa",
    title: "Student at Rowan University",
    description: ` Truest Ride empowers students with safe, low-cost weekend travel. Built on trust and community, it connects riders within their campus network for a secure experience.`,
    img: rakeshImg,
    linkedin: "#",
  },
];

const professors = [
  {
    name: "Gregory S. DeLozier",
    email: "gdelozie@kent.edu",
    img: gregImg,
    professor: "Adjunct Professor",
    linkedin: "https://www.linkedin.com/in/greg-delozier-58a2a09/",
  },
  {
    name: "Branson Boggia",
    email: "bboggia@kent.edu",
    img: bransonImg,
    professor: "Adjunct Instructor",
    linkedin: "https://www.linkedin.com/in/branson-boggia-9b7441122/",
  },
];

const students = [
  {
    name: "Veerendranath",
    role: "Full-stack Developer",
    email: "vpottipa@kent.edu",
    linkedin: "https://www.linkedin.com/in/veerendranathp/",
    img: veerendraImg,
  },
  {
    name: "Arunkumar",
    role: "UI/UX Designer",
    email: "aturaka@kent.edu",
    linkedin: "https://www.linkedin.com/in/arunkumarturaka/",
    img: arunImg,
  },
  {
    name: "Jagadeesh",
    role: "Backend Developer",
    email: "Jaladasu@kent.edu",
    linkedin: "https://www.linkedin.com/in/jagadeesh-chandra-prasad-aladasu-239105158/",
    img: jagadeeshImg,
  },
  {
    name: "Naga Sai",
    role: "Frontend Developer",
    email: "schirum4@kent.edu ",
    linkedin: "https://www.linkedin.com/in/nagasai-chirumamilla/",
    img: nagasaiImg,
  },
  {
    name: "Hrushikesh",
    role: "Backend Developer",
    email: "htadepal@kent.edu ",
    linkedin: "https://www.linkedin.com/in/hrushikesh-tadepally/",
    img: notionImg,
  },
  {
    name: "Shivasaketh",
    role: "Frontend Developer",
    email: "ssimalad@kent.edu",
    linkedin: "https://www.linkedin.com/in/shivasaketh-simaladari/",
    img: sakethImg,
  },
  {
    name: "Srilakshmi",
    role: "Backend Developer",
    email: "dsrilaks@kent.edu ",
    linkedin: "https://www.linkedin.com/in/srilakshmi-dasari-9b2812221/",
    img: sriImg,
  },
];

const About = () => {
  const [activeSection, setActiveSection] = useState("about");

  // Create refs for each section
  const aboutRef = useRef(null);
  const teamRef = useRef(null);

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
          <div className="story-layout">
            <div className="story-heading">
              <h2>
                One ride. <br /> Shared stories. <br /> Trusted travel.
              </h2>
            </div>
            <div className="story-content">
              <p className="story-text">
                Truest Ride is built by a team of students and young professionals who
                personally experienced the challenges of traveling without reliable
                transportation — whether for campus commutes or weekend getaways to places
                just beyond the reach of public transport.
              </p>
              <p className="story-text">
                The idea began after one too many trips had to be delayed, rearranged, or
                canceled because buses were limited, taxis were too expensive, and friends
                weren’t always free. What we needed was a simple way to connect with
                someone already heading in the same direction.
              </p>
              <h3>So we built it.</h3>
              <p className="story-text">
                Truest Ride is a place where students can offer and join rides in a
                trusted, verified community. It’s a space designed to make mobility
                easier, more affordable, and more social — starting with students, but
                built for anyone who believes in shared travel.
              </p>
              <p className="story-text">
                We believe technology can do more than move people from one place to
                another. It can bring people together. Truest Ride helps students make the
                most of every journey — not just by saving money or avoiding travel
                stress, but by creating small communities along the way. A quiet ride to
                class. A spontaneous road trip. A ride home with someone you’ve never met
                — until now.
              </p>
              <p className="story-text">
                We&apos;re committed to working alongside the people who use Truest Ride —
                listening to their stories, ideas, and feedback — to shape a platform that
                feels just as personal as it is practical.
              </p>
              <p className="story-text">
                Truest Ride is built on the belief that{" "}
                <span>
                  someone in your own campus community might be the perfect travel
                  companion
                </span>
                , and that finding them shouldn&apos;t be hard. We&apos;re here to make it
                easier, safer, and more connected.
              </p>
              <p className="story-text">
                As we grow, we&apos;re exploring new technologies, real-time features, and
                integrations with universities to make Truest Ride the smartest, most
                student-focused ride-sharing experience possible.
              </p>
              <h3>
                We&apos;re excited by what&apos;s ahead. <br /> And even more excited to
                share the ride with you.
              </h3>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider">
        <hr />
      </div>

      {/* Academic Leadership */}
      <section className="advisors-section">
        <div className="container">
          <h2>Academic Leadership</h2>
          <div className="advisors-flex">
            {professors.map((prof, i) => (
              <div key={i} className="advisor-card">
                <div className="advisor-image">
                  <img src={prof.img} alt={prof.name} />
                </div>
                <div className="advisor-info">
                  <h3>{prof.name}</h3>
                  <p>{prof.professor}</p>
                  <a href={prof.linkedin} className="contact-link">
                    LinkedIn
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
          <h2>Team</h2>
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
                    <a href={`mailto:${member.email}`} className="team-link">
                      Email
                    </a>
                    <a href={member.linkedin} className="team-link">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider">
        <hr />
      </div>

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

      <div className="section-divider">
        <hr />
      </div>

      <section>
        <div className="container">
          <JoinUs />
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default About;
