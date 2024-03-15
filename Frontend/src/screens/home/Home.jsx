import style from "./Home.module.css";
import NavBar from "../../common/Navbar";

const Home = () => {
  return (
    <>
      <NavBar />
      <div className={style.HomeContainer}>
        <h1>Welcome to Charity Website</h1>
        {/* Display charity images here */}
      </div>
    </>
  );
};

export default Home;
