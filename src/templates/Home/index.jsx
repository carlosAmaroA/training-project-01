import "./styles.css";
import { Component } from "react";
import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    perPage: 3,
    loaded: 3,
  };
  timeOutUpdate = null;
  handleTimeout = () => {
    const { count } = this.state;
    this.timeOutUpdate = setTimeout(() => {
      this.setState({ count: count + 1 });
    }, 1000);
  };

  async componentDidMount() {
    await this.loadPosts();
  }
  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { loaded, perPage } = this.state;
    this.setState({ loaded: loaded + perPage });
  };

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    const { allPosts, loaded } = this.state;
    return (
      <section className="container">
        <Posts posts={allPosts.slice(0, loaded)} />
        <Button
          disabled={loaded >= allPosts.length}
          text="Load more posts"
          onClick={this.loadMorePosts}
        />
      </section>
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
