import React, { Component } from "react";
import Ably from "../components/Ably";
import CommentForm from "../components/CommentForm";
import Comments from "../components/Comments";

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleAddComment = this.handleAddComment.bind(this);
    this.state = {
      comments: [],
    };
  }
  componentDidMount() {
    const channel = Ably.channels.get("comments");
    channel.attach();
    channel.once("attached", () => {
      channel.history((err, page) => {
        // create a new array with comments in reverse order (old to new)
        const comments = Array.from(page.items, (item) => item.data);
        this.setState({ comments });
        channel.subscribe((msg) => {
          this.handleAddComment(msg.data);
        });
      });
    });
  }
  handleAddComment(comment) {
    this.setState((prevState) => {
      return {
        comments: [comment].concat(prevState.comments),
      };
    });
  }
  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              <CommentForm />
              <Comments comments={this.state.comments} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
