import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";

import Auth from "../utils/auth";

const Highscore = () => {
  const { error, data } = useQuery(QUERY_USERS);

  return (
    <>
      {error ? (
        <p>Something went wrong when connecting to the database!</p>
      ) : (
        <div className="wrapper">
          <table>
            <caption>Leaderboard (total 20)</caption>
            <tr>
              <th>Username</th>
              <th>Time</th>
            </tr>

            {data &&
              data.users.map((user) =>
                Auth.loggedIn() ? (
                  <tr
                    key={user._id}
                    className={
                      Auth.getProfile().data.username === user.username
                        ? "player"
                        : ""
                    }
                  >
                    <td>{user.username}</td>
                    <td>{user.timePetted}</td>
                  </tr>
                ) : (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.timePetted}</td>
                  </tr>
                )
              )}
          </table>
        </div>
      )}
    </>
  );
};

export default Highscore;
