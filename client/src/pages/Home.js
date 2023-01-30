import React, { Component } from "react";
import Ably from "../components/Ably";
import CommentForm from "../components/CommentForm";
import Comments from "../components/Comments";
import CheemsRender from "../components/CheemsRender";

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
        const comments = Array.from(page.items, (item) => item.data).reverse();
        this.setState({ comments });
        channel.subscribe((msg) => {
          this.handleAddComment(msg.data);
        });
      });
    });
  }
  handleAddComment(comment) {
    this.setState((prevState) => {
      let newState = prevState;
      // Remove the oldest comment if there are 5 comments being rendered on screen already
      if (prevState.comments.length > 5) {
        newState = prevState.comments.shift();
        newState = prevState.comments.concat([comment]);
      } else {
        newState = prevState.comments.concat([comment]);
      }
      return {
        comments: newState,
      };
    });
  }
  render() {
    return (
      <>
        <section id="comment-area-section">
          <div className="container" id="comment-area-container">
            <div className="columns">
              <div className="column">
                <Comments comments={this.state.comments} />
                <CommentForm />
              </div>
            </div>
          </div>
        </section>
        <section id="cheems-area-section">
          <CheemsRender />
        </section>
      </>
    );
  }
}

export default Home;
