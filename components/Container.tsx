import Link from "next/link";
import Footer from "./Footer";

export const Container = (props: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div>
      <header
        className="
          flex
          flex-row
          justify-between
          items-center
          py-4
          px-8
          bg-white
          border-b border-gray-200
          shadow-sm
          sticky
          top-0
          z-50
        "
      >
        <Link className="text-2xl" href="/">
          Duckling
        </Link>
      </header>
      <div className="flex min-h-screen flex-col sm:p-12 p-4">
        {props.children}
      </div>
      <Footer />
    </div>
  );
};
