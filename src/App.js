import Header from "./components/Header/Header";
import Quote from "./components/Header/Quote";
import Weather from "./components/Weather/Weather";
import Notes from "./components/Notes/Notes";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Quote />
      <Weather />
      <Notes />
    </div>
  );
}

export default App;
