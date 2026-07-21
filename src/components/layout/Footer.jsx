import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-logo">

          <h2>Aaoo</h2>

          <p>
            Find official links, government services,
            university updates and important resources
            in one place.
          </p>

        </div>

        <div className="footer-links">

          <h3>Quick Links</h3>

          <ul>

            <li>Home</li>

            <li>Categories</li>

            <li>Latest</li>

            <li>About</li>

            <li>Contact</li>

          </ul>

        </div>

      </div>

      <div className="footer-bottom">

        © {currentYear} Aaoo • All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;