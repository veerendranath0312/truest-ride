import Navbar from "../../components/Navbar";
import "./About.css";

const stakeholders = [
  {
    name: "Rakesh Kumar Vasa",
    title: "Student at Rowan University",
    description: ` Truest Ride empowers students with safe, low-cost weekend travel. Built on trust and community, it connects riders within their campus network for a secure experience.

`,
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
  return (
    <div className="about-page light-theme">
    <div className="about-page light-theme">
      <Navbar />

      <section className="hero full-border-hero">
        <div className="hero-content full-border">
          <h1>Built by Students. Trusted by Students.</h1>
          <p className="subtitle">
            Truest Ride is a seamless, community-driven ride-sharing experience crafted
            with care and mentorship.
          </p>
        </div>
      </section>

      <section className="mission-vision-split container">
        <div className="mv-split">
          <div className="mv-image">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
              alt="Mission"
            />
          </div>
          <div className="mv-text">
            <h2>🎯 Our Mission</h2>
            <p>
              Our mission is to foster a trustworthy, affordable transportation culture
              for students.
            </p>
            <p>
              By enabling students to share rides with peers, we ensure community and
              comfort every trip.
            </p>
          </div>
        </div>
        <div className="mv-split reverse">
          <div className="mv-image">
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
              alt="Vision"
            />
          </div>
          <div className="mv-text">
            <h2>🌍 Our Vision</h2>
            <p>
              We envision a student travel ecosystem where spontaneity meets safety and
              connection.
            </p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Guided by Our Professors</h2>
        <div className="team-grid professor-grid">
          {professors.map((prof, i) => (
            <div key={i} className="team-member">
              <div className="profile-frame small">
                <img src={prof.img} alt={prof.name} className="profile-img" />
              </div>
              <h3>{prof.name}</h3>
              <p>{prof.title}</p>
              <a href={`mailto:${prof.email}`} className="contact-btn">
                Contact
              </a>
              <a href={prof.linkedin} className="linkedin-icon small">
                in
              </a>
            </div>
          ))}
        </div>

        <h2 className="student-team">Our Student Team</h2>
        <div className="team-grid student-grid">
          {students.slice(0, 3).map((member, i) => (
            <div key={i} className="team-member">
              <div className="profile-frame">
                <img src={member.img} alt={member.name} className="profile-img" />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <a href={`mailto:${member.email}`} className="contact-btn">
                Contact
              </a>
              <a href={member.linkedin} className="linkedin-icon small">
                in
              </a>
            </div>
          ))}
        </div>
        <div className="team-grid student-grid">
          {students.slice(3).map((member, i) => (
            <div key={i} className="team-member">
              <div className="profile-frame">
                <img src={member.img} alt={member.name} className="profile-img" />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <a href={`mailto:${member.email}`} className="contact-btn">
                Contact
              </a>
              <a href={member.linkedin} className="linkedin-icon small">
                in
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="stakeholder-section">
        <h2 className="stakeholder-heading">stakeholder</h2>
        <div className="stakeholder-card">
          <div className="stakeholder-img">
            <img src={stakeholders[0].img} alt={stakeholders[0].name} />
            <a href={stakeholders[0].linkedin} className="linkedin-icon">
              in
            </a>
          </div>
          <div className="stakeholder-info">
            <h3>{stakeholders[0].name}</h3>
            <p className="stakeholder-title">{stakeholders[0].title}</p>
            <p className="stakeholder-desc">{stakeholders[0].description}</p>
          </div>
        </div>
      </section>

      <footer className="footer dark">
        <div className="footer-content">
          <h2>Let's Connect</h2>
          <p>
            We'd love to hear from you. Questions, feedback, or just a friendly hello!
          </p>
          <a href="mailto:truestride.team@gmail.com" className="footer-contact-btn white">
            👋 Say hi to our team
          </a>
        </div>
      </footer>
    </div>
  );
};
};

export default About;
