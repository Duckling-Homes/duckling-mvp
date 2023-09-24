export const Heading = (props: { children: React.ReactNode }): JSX.Element => {
  return <div className="text-2xl font-bold pb-4">{props.children}</div>;
};
