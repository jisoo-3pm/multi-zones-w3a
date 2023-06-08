import dynamic from "next/dynamic";
import type { NextPage } from "next";

const App = dynamic(
  () => {
    return import("../components/App");
  },
  { ssr: false }
);

const Home: NextPage = () => {
  return <App />;
};

export default Home;
