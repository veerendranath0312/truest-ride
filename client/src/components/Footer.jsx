import { Link } from "react-router";

function Footer() {
  const year = new Date().getFullYear();

  // TODO: Update the footer links and develop the respective pages
  return (
    <div className="footer">
      <div className="footer-flex">
        <div className="footer-flex-item">
          <p className="footer-flex-item__label">Company</p>
          <div className="footer-flex-item__links">
            <p className="footer-flex-item__link">
              &copy; {year === 2025 ? `2025` : `2025 - Present`} Truest Ride.
            </p>
            <p className="footer-flex-item__link">All Rights Reserved.</p>
            <Link to="/about" className="footer-flex-item__link" href="#">
              About us
            </Link>
            <a className="footer-flex-item__link" href="#">
              Terms of use
            </a>
            <a className="footer-flex-item__link" href="#">
              Privacy
            </a>
          </div>
        </div>
        <div className="footer-flex-item">
          <p className="footer-flex-item__label">Social</p>
          <div className="footer-flex-item__links">
            <a className="footer-flex-item__link" href="https://x.com/" target="_blank">
              <ion-icon name="logo-twitter"></ion-icon> Twitter
            </a>
            <a
              className="footer-flex-item__link"
              href="https://www.instagram.com/"
              target="_blank"
            >
              <ion-icon name="logo-instagram"></ion-icon> Instagram
            </a>
          </div>
        </div>
        <div className="footer-flex-item">
          <p className="footer-flex-item__label">Support</p>
          <div className="footer-flex-item__links">
            <a className="footer-flex-item__link" href="#">
              FAQ
            </a>
            <a className="footer-flex-item__link" href="#">
              Contact
            </a>
          </div>
        </div>
        <div className="footer-flex-item">
          <p className="footer-flex-item__label">App</p>
          <div className="footer-flex-item__links">
            <a className="footer-flex-item__link" href="#">
              iOS
            </a>
            <a className="footer-flex-item__link" href="#">
              Android
            </a>
          </div>
        </div>
        <div className="footer-flex-item">
          <p className="footer-flex-item__label">Stay up to date</p>
          <div className="footer-flex-item__subscribe">
            <input
              type="email"
              placeholder="education@email.edu"
              className="footer-flex-item__subscribe__input"
            />

            <button className="btn footer-flex-item__subscribe__button">
              <ion-icon name="send-outline"></ion-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
