import "./App.css";
import Game from "./Components/Game.js";
import Footer from "./Components/Footer.js";
import Title from "./Components/Title.js";

function App() {
  return (
    <div className="wrapper">
      <Title />
      <Game />
      <Footer />
    </div>
  );
}

export default App;
