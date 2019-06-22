import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StatusBar, Alert } from "react-native";

import colors from "./utils/colors";
import { addNewGamePlayed } from "./utils/AsyncStorage";

import GameGrid from "./components/GameGrid";
import Score from "./components/Score";
import GamesPlayed from "./components/GamesPlayed";

const initialGameState = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const App = () => {
  const [hasGameEnded, setHasGameEnded] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [winnerPlayer, setWinnerPlayer] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [firsPlayerScore, setFirstPlayerScore] = useState(null);
  const [secondPlayerScore, setSecondPlayerScore] = useState(null);
  const [gameGridPlays, setGameGridPlays] = useState(initialGameState);

  useEffect(() => {
    if (hasGameEnded) addNewGamePlayed();

    if (winnerPlayer && winnerPlayer === "X") {
      setFirstPlayerScore(firsPlayerScore + 1 || 1);
    } else if (winnerPlayer && winnerPlayer === "O") {
      setSecondPlayerScore(secondPlayerScore + 1 || 1);
    }
  }, [winnerPlayer]);

  const restartGame = () => {
    setHasGameStarted(true);
    setGameGridPlays(initialGameState);
    setWinnerPlayer(null);
    setCurrentPlayer("O");
    setHasGameEnded(false);
  };

  const handleNewGame = () => {
    if (hasGameStarted && !winnerPlayer && !hasGameEnded) {
      Alert.alert(
        "Are you sure?",
        "If you restart the game the current progress will be lost!",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Restart",
            onPress: () => restartGame(),
          },
        ],
        { cancelable: true }
      );
    } else {
      restartGame();
    }
  };

  const checkIfGameEnded = currentGameGridPlays => {
    const firstRow = currentGameGridPlays[0];
    const secondRow = currentGameGridPlays[1];
    const thirdRow = currentGameGridPlays[2];

    return (
      [...firstRow, ...secondRow, ...thirdRow].filter(play => !!play).length ===
      9
    );
  };

  const hasSomeoneWon = currentGameGridPlays => {
    const hasSomeoneWonByRow = row =>
      currentGameGridPlays[row].filter(play => play === currentPlayer)
        .length === 3;

    const hasSomeoneWonByColumn = column =>
      currentGameGridPlays
        .map(rowPlay => rowPlay[column] === currentPlayer)
        .filter(winCondition => winCondition === true).length === 3;

    const hasSomeoneWonOnDiagonal = () => {
      const checkIfPlaysAreTheSame = (accumulator, currentValue) =>
        accumulator === currentValue ? currentValue : false;

      const firstRow = currentGameGridPlays[0];
      const secondRow = currentGameGridPlays[1];
      const thirdRow = currentGameGridPlays[2];

      const fromLeftDiagonalPlay = [firstRow[0], secondRow[1], thirdRow[2]];
      const fromRightDiagonalPlay = [firstRow[2], secondRow[1], thirdRow[0]];

      if (
        fromLeftDiagonalPlay.reduce(checkIfPlaysAreTheSame) ||
        fromRightDiagonalPlay.reduce(checkIfPlaysAreTheSame)
      )
        return true;

      return false;
    };

    for (const currentRowOrColumn of [0, 1, 2]) {
      if (
        hasSomeoneWonByRow(currentRowOrColumn) ||
        hasSomeoneWonByColumn(currentRowOrColumn) ||
        hasSomeoneWonOnDiagonal()
      )
        return true;
    }

    return false;
  };

  const renderPlayerIcon = player =>
    player === "X" ? (
      <Icon name="close" size={40} color={colors.darkGrey} />
    ) : (
      <Icon name="circle-outline" size={40} color={colors.lightYellow} />
    );

  return (
    <Container>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <GamesPlayed hasGameEnded={hasGameEnded} />
      <GameGrid
        currentPlayer={currentPlayer}
        gameGridPlays={gameGridPlays}
        setGameGridPlays={setGameGridPlays}
        setCurrentPlayer={setCurrentPlayer}
        hasSomeoneWon={hasSomeoneWon}
        winnerPlayer={winnerPlayer}
        setWinnerPlayer={setWinnerPlayer}
        hasGameStarted={hasGameStarted}
        hasGameEnded={hasGameEnded}
        checkIfGameEnded={checkIfGameEnded}
        setHasGameEnded={setHasGameEnded}
      />
      <CurrentPlayerInfoWrapper>
        {!hasGameStarted ? (
          <CurrentPlayerInfoText>Start a new game!</CurrentPlayerInfoText>
        ) : winnerPlayer ? (
          <>
            <CurrentPlayerInfoText>{"Player "}</CurrentPlayerInfoText>
            {renderPlayerIcon(winnerPlayer)}
            <CurrentPlayerInfoText>{" won!"}</CurrentPlayerInfoText>
          </>
        ) : hasGameEnded ? (
          <CurrentPlayerInfoText>{"The game tied!"}</CurrentPlayerInfoText>
        ) : (
          <>
            <CurrentPlayerInfoText>{"Current player: "}</CurrentPlayerInfoText>
            {renderPlayerIcon(currentPlayer)}
          </>
        )}
      </CurrentPlayerInfoWrapper>
      <RestartGame onPress={handleNewGame}>
        <RestartGameText>
          {hasGameStarted ? "RESTART GAME" : "START GAME"}
        </RestartGameText>
      </RestartGame>
      <Score
        firstPlayerScore={firsPlayerScore}
        secondPlayerScore={secondPlayerScore}
      />
    </Container>
  );
};

const RestartGame = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background: ${colors.white};
  padding: 5px 10px;
  border-radius: 6px;
`;

const RestartGameText = styled.Text`
  color: ${colors.primaryDarker};
  font-size: 16;
`;

const CurrentPlayerInfoWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 80%;
  flex-wrap: wrap;
`;

const CurrentPlayerInfoText = styled.Text`
  color: ${colors.white};
  font-size: 26;
  font-weight: bold;
`;

const Container = styled.View`
  flex: 1;
  background: ${colors.primary};
  justify-content: space-around;
  align-items: center;
`;

export default App;
