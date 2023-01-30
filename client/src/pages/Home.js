import React, { Component } from "react";
import Ably from "../components/Ably";
import CommentForm from "../components/CommentForm";
import Comments from "../components/Comments";
import cheems10 from "../images/pet-animation-10.gif";
import cheemsStatic from "../images/pet-animation-static.png";

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleAddComment = this.handleAddComment.bind(this);
    this.state = {
      comments: [],
      playGif: false
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
        <section id="meat-area-section">
          <div>
            <img
              alt="cheems pic"
              src={this.state.playGif ? cheems10 : cheemsStatic}
              onClick={() =>
                this.setState((prevState) => {
                  return { playGif: !prevState.playGif };
                })
              }
            />
          </div>
        </section>
      </>
    );
  }
}

export default Home;
