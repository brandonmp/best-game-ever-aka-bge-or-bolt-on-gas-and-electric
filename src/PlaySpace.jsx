import * as React from "react";
import Hand from "./Hand";
import Board from "./Board";
import _ from "lodash";

const makeCards = (idMultiplier = 1) =>
  _.range(0, 5).map((i, index) => ({
    id: index * 2 + idMultiplier,
    position: _.random(1, 5),
    maxHP: _.random(1, 5),
    currentHP: _.random(1, 5),
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
  }));

const offsetsToDirections = {
	"1,0": 0,
	"1,-1": 1,
	"0,-1": 2,
	"-1,-1": 3,
	"-1,0": 4,
	"-1,1": 5,
	"0,1": 6,
	"1,1": 7,
};

function battleCards(card1, pos1, card2, pos2) {
	const xOffset = (pos2 % 4) - (pos1 % 4);
	const yOffset = Math.floor(pos2 / 4) - Math.floor(pos1 / 4);
	const directionBetweenCards = offsetsToDirections[[xOffset, yOffset]];
	// Make sure the cards are adjacent.
	if (typeof directionBetweenCards === 'undefined')
		return;
	// Make sure the cards want to battle.
	// Because directionBetweenCards is from card1 to card2, check that card1 has this direction, and card2 has 4 + this direction.
	if (!card1.arrows[directionBetweenCards])
		return;
	if (!card2.arrows[(4 + directionBetweenCards) % 8])
		return;
	return [dealDamage(card1, card2.attack), dealDamage(card2, card1.attack)];
}

function dealDamage(card, attack) {
	const newCard = {...card};
	newCard.currentHP -= attack;
	return newCard;
}

function haveCardBeBellicose(cardList, bellicoseIndex) {
	let bellicoseCard = cardList[bellicoseIndex];
	for (let i = 0; i < cardList.length; i++) {
		if (i == bellicoseIndex)
			continue;
		const [bellicoseCard, cardList[i]] = battleCards(bellicoseCard, cardList[i]);
	}
	for (let i = 0; i < cardList.length; i++) {
		if (cardList[i].currentHP <= 0) {
			cardList[i].currentHP = cardList[i].maxHP;
			cardList[i].isFriendly = !cardList[i].isFriendly;
		}
	}
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

    this.setState({
      hands: this.state.hands.map(hand =>
        hand.filter(({ id }) => id !== this.state.cardBeingPlaced.id)
      ),
      isPlayerOneTurn: !this.state.isPlayerOneTurn,
      cardBeingPlaced: null,
      spaces: newArray
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
