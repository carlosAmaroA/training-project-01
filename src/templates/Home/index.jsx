import "./styles.css";
import { Component } from "react";
import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    perPage: 3,
    loaded: 3,
    searchValue: "",
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

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    const { allPosts, loaded, searchValue } = this.state;
    const posts = allPosts.slice(0, loaded);
    const filteredPosts = !!searchValue
      ? allPosts.filter(
          (e) =>
            e.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            e.body.toLowerCase().includes(searchValue.toLowerCase())
        )
      : posts;
    return (
      <section className="container">
        <div class="search-container">
          {!!searchValue && (
            <>
              <h1>Search Value>{searchValue}</h1>
            </>
          )}
          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          ></TextInput>
        </div>
        {filteredPosts.length ? (
          <Posts posts={filteredPosts} />
        ) : (
          <p>Posts dont found</p>
        )}
        {!searchValue && (
          <Button
            disabled={loaded >= allPosts.length}
            text="Load more posts"
            onClick={this.loadMorePosts}
          />
        )}
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
