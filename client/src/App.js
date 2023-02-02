import React, { useEffect } from "react";
import useState from "react-usestateref";
import Ably from "./components/Ably";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Footer from "./components/Footer";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  // For comment section
  const [comments, setComments, commentsRef] = useState([]);

  useEffect(() => {
    const channel = Ably.channels.get("comments");
    channel.attach();
    channel.once("attached", () => {
      channel.history((err, page) => {
        // create a new array with comments in reverse order (old to new)
        const comments = Array.from(page.items, (item) => item.data).reverse();
        setComments(comments);
        channel.subscribe((msg) => {
          handleAddComment(msg.data);
        });
      });
    });
  });

  const handleAddComment = (comment) => {
    setComments(
      // Remove the oldest comment if there are 5 comments being rendered on screen already
      commentsRef.current.length > 5
        ? (commentsRef.current.shift(), commentsRef.current.concat([comment]))
        : commentsRef.current.concat([comment])
    );
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <Nav comments={comments} />
        <div id="table-div">
          <div id="main-div">
            <Routes>
              <Route path="/" element={<Home comments={comments} />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
