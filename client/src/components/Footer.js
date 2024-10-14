import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <p>
          Created by Jaymin Rabari -{" "}
          <a
            href="https://www.linkedin.com/in/jayminrabari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            LinkedIn
          </a>
        </p>
        <p>&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
