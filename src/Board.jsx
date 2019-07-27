import * as React from "react";
import Square, { SIZE } from "./Square";
import Card from "./Card";
import _ from "lodash";

const makeCards = () =>
  _.range(0, 16).map(i => ({
    position: _.random(1, 5),
    maxHP: _.random(1, 5),
    currentHP: _.random(1, 5),
    attack: _.random(1, 5),
    arrows: {
      0: _.random(0, 1) === 1,
      1: _.random(0, 1) === 1,
      2: _.random(0, 1) === 1,
      3: _.random(0, 1) === 1,
      4: _.random(0, 1) === 1,
      5: _.random(0, 1) === 1,
      6: _.random(0, 1) === 1,
      7: _.random(0, 1) === 1
    }
  }));

export default class Board extends React.Component {
  state = {
    spaces: makeCards()
  };
  render() {
    return (
      <div style={{ width: (SIZE + 4) * 4, height: SIZE * 4 }}>
        {_.range(16).map(i => (
          <Square>
            <Card />
          </Square>
        ))}
      </div>
    );
  }
}
