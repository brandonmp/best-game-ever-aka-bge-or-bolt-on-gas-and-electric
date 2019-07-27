import * as React from "react";
import Hand from "./Hand";
import Board from "./Board";
import _ from "lodash";

const makeCards = (idMultiplier = 1) =>
  _.range(0, 5).map((i, index) => ({
    id: index * idMultiplier,
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

export default class PlaySpace extends React.Component {
  state = {
    hands: [makeCards(), makeCards(2)],
    spaces: _.range(16),
    cardBeingPlaced: null,
    isPlayerOneTurn: true
  };
  selectCardForPlacement = cardId => {
    return this.setState({
      cardBeingPlaced: _.flatten(this.state.hands).find(
        ({ id }) => id === cardId
      )
    });
  };
  render() {
    return (
      <div>
        Player {this.state.isPlayerOneTurn === true ? 1 : 2}'s turn
        <Hand
          cardBeingSelectedId={
            this.state.cardBeingPlaced === null
              ? undefined
              : this.state.cardBeingPlaced.id
          }
          handleCardClick={this.selectCardForPlacement}
          isThisPlayersTurn={this.state.isPlayerOneTurn}
          cards={this.state.hands[0]}
        />
        <Board cards={this.state.spaces} />
        <Hand
          cardBeingSelectedId={
            this.state.cardBeingPlaced === null
              ? undefined
              : this.state.cardBeingPlaced.id
          }
          handleCardClick={this.selectCardForPlacement}
          isThisPlayersTurn={!this.state.isPlayerOneTurn}
          cards={this.state.hands[1]}
        />
      </div>
    );
  }
}
