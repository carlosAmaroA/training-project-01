import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";

class App extends Component {
  state = {
    count: 0,
    posts: [
      { id: 1, title: "Titulo 1", body: "body 1" },
      { id: 2, title: "Titulo 2", body: "body 2" },
      { id: 3, title: "Titulo 3", body: "body 3" },
    ],
  };
  timeOutUpdate = null;
  handleTimeout = () => {
    const { count } = this.state;
    this.timeOutUpdate = setTimeout(() => {
      this.setState({ count: count + 1 });
    }, 1000);
  };

  componentDidMount() {
    this.handleTimeout();
  }

  componentDidUpdate() {
    this.handleTimeout();
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutUpdate);
  }

  render() {
    const { posts, count } = this.state;
    return (
      <div className="App">
        <h1>{count}</h1>
        {posts.map((post) => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }
}

/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */

export default App;
