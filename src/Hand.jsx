import * as React from "react";
import Card from "./Card";

export default ({
  cardBeingSelectedId,
  isThisPlayersTurn,
  cards,
  handleCardClick
}) => {
  return (
    <div style={{ margin: 45 }}>
      {isThisPlayersTurn === true && "GO"}
      {cards.map(c => (
        <div
          onClick={
            isThisPlayersTurn === true ? () => handleCardClick(c.id) : undefined
          }
          style={{
            marginLeft: 5,
            marginRight: 5,
            borderRadius: 3,
            cursor: isThisPlayersTurn === true ? "crosshair" : "not-allowed",
            userSelect: "none",
            display: "inline-block",
            border: cardBeingSelectedId === c.id ? "solid 10px" : "solid 1px"
          }}
          key={c.id}
        >
          <Card {...c} />
        </div>
      ))}
    </div>
  );
};
