"use client";

import Header from "./Header";

export const Container = (props: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <Header />
      <div>{props.children}</div>
    </div>
  );
};
