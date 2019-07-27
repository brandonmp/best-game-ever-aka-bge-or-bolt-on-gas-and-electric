import * as React from "react";
import Square, { SIZE } from "./Square";
import Card from "./Card";

export default class Board extends React.Component {
  render() {
    return (
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          width: (SIZE + 4) * 4,
          height: SIZE * 4
        }}
      >
        {this.props.cards.map((cardData, idx) => (
          <Square
            isDead={typeof cardData === "number" && cardData === 0}
            onClick={
              typeof this.props.handleSquareSelect === "undefined"
                ? undefined
                : () => this.props.handleSquareSelect(idx)
            }
          >
            {typeof cardData === "number" ? null : <Card {...cardData} />}
          </Square>
        ))}
      </div>
    );
  }
}
