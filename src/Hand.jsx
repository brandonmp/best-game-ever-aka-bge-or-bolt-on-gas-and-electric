import * as React from "react";
import Card from "./Card";

export default ({
  cardBeingSelectedId,
  isThisPlayersTurn,
  cards,
  handleCardClick
}) => {
  return (
    <div>
      {isThisPlayersTurn === true && "GO"}
      {cards.map(c => (
        <div
          onClick={() => handleCardClick(c.id)}
          style={{
            display: "inline-block",
            background: cardBeingSelectedId === c.id ? "blue" : undefined
          }}
          key={c.id}
        >
          <Card {...c} />
        </div>
      ))}
    </div>
  );
};
