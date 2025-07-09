import { useRouteLoaderData } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { homePage } = useRouteLoaderData("root");
  console.log(homePage);
  return <div></div>;
}
