import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";

const Highscore = () => {
  const { error, data } = useQuery(QUERY_USERS);
  console.log(data);
  return (
    <div className="wrapper">
      <table>
        <caption>Leaderboard (total 20)</caption>
        <tr>
          <th>Pos</th>
          <th>Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Step</th>
        </tr>

        {/* <tr>
          <td>1</td>
          <td>Bill</td>
          <td>05.11.2020</td>
          <td>23:56</td>
          <td>123</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Garry</td>
          <td>05.11.2020</td>
          <td>10:30</td>
          <td>34</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Steave</td>
          <td>05.11.2020</td>
          <td>10:30</td>
          <td>34</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Bob</td>
          <td>05.11.2020</td>
          <td>10:30</td>
          <td>34</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Andy</td>
          <td>05.11.2020</td>
          <td>10:30</td>
          <td>34</td>
        </tr>
        <tr class="player">
          <td>6</td>
          <td>Tom</td>
          <td>05.11.2020</td>
          <td>10:30</td>
          <td>34</td>
        </tr>
        <tr>
          <td>7</td>
          <td>John</td>
          <td>05.11.2020</td>
          <td>10:30</td>
          <td>34</td>
        </tr>
        <tr>
          <td>8</td>

          <td>Michael</td>
          <td>05.11.2020</td>
          <td>10:30</td>
          <td>34</td>
        </tr>
        <tr>
          <td>9</td>

          <td>Jack</td>
          <td>05.11.2020</td>
          <td>10:30</td>
          <td>34</td>
        </tr>
        <tr>
          <td>10</td>

          <td>Jonnyyyyyyyyyyyy</td>
          <td>05.11.2020</td>
          <td>10:30</td>
          <td>34</td>
        </tr> */}
      </table>
    </div>
  );
};

export default Highscore;
