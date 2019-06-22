import React, { useState, useEffect } from "react";
import styled from "styled-components";

import colors from "../../utils/colors";
import { getGamesPlayed } from "../../utils/AsyncStorage";

const GamesPlayed = ({ hasGameEnded }) => {
  const [numberOfGamesPlayed, setNumberOfGamesPlayed] = useState(0);

  useEffect(() => {
    getGamesPlayed().then(gamesPlayed => setNumberOfGamesPlayed(gamesPlayed));
  }, [hasGameEnded]);

  return (
    <GamesPlayedWrapper>
      <GamesPlayedText>
        GAMES PLAYED: {Number(numberOfGamesPlayed)}
      </GamesPlayedText>
    </GamesPlayedWrapper>
  );
};

const GamesPlayedWrapper = styled.View`
  width: 100%;
  align-items: flex-end;
  padding: 0 30px;
`;

const GamesPlayedText = styled.Text`
  font-size: 14;
  color: ${colors.primaryDarker};
  font-weight: bold;
`;

export default GamesPlayed;
