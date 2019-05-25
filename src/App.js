import React, { useEffect, useState } from "react";
import "./App.css";

import { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";

import { listPosts } from "./graphql/queries";

function App() {
  const [posts, updatePosts] = useState([]);
  useEffect(() => {
    getData();
  });
  async function getData() {
    try {
      const postsData = await API.graphql(graphqlOperation(listPosts));
      updatePosts(postsData.data.listPosts.items);
    } catch (error) {
      console.log("error fetching data...", error);
    }
  }

  return (
    <div className="App">
      <h1>Welcome</h1>
      {posts.map(p => (
        <h2>{p.title}</h2>
      ))}
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
