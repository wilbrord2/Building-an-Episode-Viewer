import "./App.css";
import Navbar from "./component/navbar";
import HeroSection from "./component/hero";
import MovieList from "./component/movies/movieList";
import Footer from "./component/footer";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection/>
      <MovieList/>
      <Footer/>
    </>
  );
}

export default App;
