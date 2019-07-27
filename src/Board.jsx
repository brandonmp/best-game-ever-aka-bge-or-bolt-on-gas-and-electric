import * as React from "react";
import Square, { SIZE } from "./Square";
import Card from "./Card";

export default class Board extends React.Component {
  render() {
    return (
      <div style={{ width: (SIZE + 4) * 4, height: SIZE * 4 }}>
        {this.props.cards.map(cardData => (
          <Square>
            {typeof cardData === "undefined" ? <Card {...cardData} /> : null}
          </Square>
        ))}
      </div>
    );
  }
}
