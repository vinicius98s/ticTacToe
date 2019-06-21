import React, { useState } from "react";
import styled from "styled-components";
import { StatusBar } from "react-native";

import colors from "./utils/colors";

import GameGrid from "./components/GameGrid";
import Score from "./components/Score";

const App = () => {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [firsPlayerScore, setFirstPlayerScore] = useState(null);
  const [secondPlayerScore, setSecondPlayerScore] = useState(null);

  return (
    <Container>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <GameGrid currentPlayer={currentPlayer} />
      <CurrentPlayerInfo>Current player: {currentPlayer}</CurrentPlayerInfo>
      <Score
        firstPlayerScore={firsPlayerScore}
        secondPlayerScore={secondPlayerScore}
      />
    </Container>
  );
};

const CurrentPlayerInfo = styled.Text`
  color: ${colors.white};
  font-size: 28;
  font-weight: bold;
`;

const Container = styled.View`
  flex: 1;
  background: ${colors.primary};
  justify-content: space-around;
  align-items: center;
`;

export default App;
