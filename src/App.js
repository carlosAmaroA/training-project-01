import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    //adiciona o this da classe no metodo handlePClick
    this.handlePclick = this.handlePClick.bind(this);
    this.state = {
      name: "Otavio Miranda",
      counter: 0,
    };
  }

  handlePClick() {
    this.setState({ name: "Júnior" });
  }

  handleAClick = (e) => {
    e.preventDefault();
    const { counter } = this.state;
    this.setState({ counter: counter + 1 });
  };

  render() {
    const { name, counter } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={this.handlePclick}>{name}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            onClick={this.handleAClick}
          >
            {counter}
          </a>
        </header>
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
