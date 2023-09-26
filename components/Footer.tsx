// components/Footer.js

import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div>
        <p>
          &copy; {new Date().getFullYear()} Duckling. All rights reserved.
          <Link target="_blank" href="https://getduckling.com/">
            How Duckling Protects Your Information.
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
