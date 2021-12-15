import type { NextPage } from "next";
import Nav from "components/Nav";
import Welcome from "components/Welcome";

const Home: NextPage = () => {
  return (
    <div>
      <Nav />
      <Welcome />
    </div>
  );
};

export default Home;
