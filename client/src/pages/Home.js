import React, { Component } from "react";
import CommentForm from "../components/CommentForm";
import Comments from "../components/Comments";
import CheemsRender from "../components/CheemsRender";

class Home extends Component {
  constructor(props) {
    super(props);
    this.updatePredicate = this.updatePredicate.bind(this);
    this.state = {
      isMobile: false,
    };
  }
  
  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
    this.setState({ isMobile: window.innerWidth < 768 });
  }

  render() {
    return (
      <>
        <section id="comment-area-section" className={this.state.isMobile ? "hidden" : "" }>
          <div className="container" id="comment-area-container">
            <div className="columns">
              <div className="column">
                <Comments comments={this.props.comments} />
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
