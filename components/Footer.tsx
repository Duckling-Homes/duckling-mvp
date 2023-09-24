// components/Footer.js

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-200 py-2 text-sm">
      <div className="container mx-auto text-center">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Duckling. All rights reserved.
          <Link
            target="_blank"
            href="https://getduckling.com/"
            className="
            pl-2
            hover:underline
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-gray-500
          "
          >
            How Duckling Protects Your Information.
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
