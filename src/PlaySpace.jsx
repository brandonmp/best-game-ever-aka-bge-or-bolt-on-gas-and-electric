import * as React from "react";
import Hand from "./Hand";
import Board from "./Board";
import _ from "lodash";

const makeCards = (idMultiplier = 1) => {
  return _.range(0, 5).map((i, index) => {
    const maxHP = _.random(1, 5);
    return {
      id: index * 2 + idMultiplier,
      position: _.random(1, 5),
      maxHP,
      currentHP: maxHP,
      attack: _.random(1, 5),
      isFriendly: idMultiplier === 1,
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
    };
  });
};

const offsetsToDirections = {
  "1,0": 0,
  "1,-1": 1,
  "0,-1": 2,
  "-1,-1": 3,
  "-1,0": 4,
  "-1,1": 5,
  "0,1": 6,
  "1,1": 7
};

function battleCards(card1, pos1, card2, pos2) {
  const defaultReturn = [card1, card2];
  if (typeof card1 === "number" || typeof card2 === "number") {
    return defaultReturn;
  }
  if (card1.isFriendly === card2.isFriendly)
    return defaultReturn;
  const xOffset = (pos2 % 4) - (pos1 % 4);
  const yOffset = Math.floor(pos2 / 4) - Math.floor(pos1 / 4);
  const directionBetweenCards = offsetsToDirections[[xOffset, yOffset]];
  // Make sure the cards are adjacent.
  if (typeof directionBetweenCards === "undefined") return defaultReturn;

  // Make sure the cards want to battle.
  // Because directionBetweenCards is from card1 to card2, check that card1 has this direction, and card2 has 4 + this direction.
  if (!card1.arrows[directionBetweenCards]) return defaultReturn;
  if (!card2.arrows[(4 + directionBetweenCards) % 8]) return defaultReturn;
  console.log("BATTLE", card1, card2);
  return [dealDamage(card1, card2.attack), dealDamage(card2, card1.attack)];
}

function dealDamage(card, attack) {
  return { ...card, currentHP: card.currentHP - attack };
}

function haveCardBeBellicose(cardList, bellicoseIndex) {
  const newArray = _.cloneDeep(cardList);
  let bellicoseCard = newArray[bellicoseIndex];
  for (let i = 0; i < newArray.length; i++) {
    const [newBellicoseCard, combatantCard] = battleCards(
      bellicoseCard,
      bellicoseIndex,
      newArray[i],
      i
    );
    bellicoseCard = newBellicoseCard;
    newArray[i] = combatantCard;
  }
  newArray[bellicoseIndex] = bellicoseCard;
  for (let i = 0; i < newArray.length; i++) {
    if (newArray[i].currentHP <= 0) {
      newArray[i].currentHP = newArray[i].maxHP;
      newArray[i].isFriendly = !newArray[i].isFriendly;
    }
  }
  return newArray;
}

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
  placeCardInSquare = squareIndex => {
    console.log("HANDLE SQUARE", squareIndex);
    const newArray = [...this.state.spaces];
    newArray.splice(squareIndex, 1, this.state.cardBeingPlaced);

    const newBoardState = haveCardBeBellicose(newArray, squareIndex);
    this.setState({
      hands: this.state.hands.map(hand =>
        hand.filter(({ id }) => id !== this.state.cardBeingPlaced.id)
      ),
      isPlayerOneTurn: !this.state.isPlayerOneTurn,
      cardBeingPlaced: null,
      spaces: newBoardState
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
        <Board
          handleSquareSelect={
            this.state.cardBeingPlaced === null
              ? undefined
              : this.placeCardInSquare
          }
          cards={this.state.spaces}
        />
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
