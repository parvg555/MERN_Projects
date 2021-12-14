import "./App.css";
import Video from "./components/Video";

function App() {
  const video = {
    channel: "parvg555",
    description: "this is a description",
    song: "this is a song",
    url: "https://www.w3schools.com/tags/movie.mp4",
    likes: 100,
    shares: 100,
    messages: 100,
  };

  return (
    <div className="app">
      <div className="app__videos">
        <Video {...video} />
        <Video {...video} />
      </div>
    </div>
  );
}

export default App;
