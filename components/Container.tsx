import Link from "next/link";
import Footer from "./Footer";

export const Container = (props: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <header>
        <Link href="/">Duckling</Link>
      </header>
      <div>{props.children}</div>
      <Footer />
    </div>
  );
};
