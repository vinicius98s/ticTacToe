import React from "react";
import styled from "styled-components";

import colors from "../../utils/colors";

const Score = ({ firstPlayerScore, secondPlayerScore }) => (
  <ScoreWrapper>
    <ScoreInfoWrapper>
      <ScoreText>X</ScoreText>
      <ScoreText>{firstPlayerScore || "-"}</ScoreText>
    </ScoreInfoWrapper>
    <ScoreInfoWrapper>
      <ScoreText>O</ScoreText>
      <ScoreText>{secondPlayerScore || "-"}</ScoreText>
    </ScoreInfoWrapper>
  </ScoreWrapper>
);

const ScoreText = styled.Text`
  font-size: 26;
  color: ${colors.darkGrey};
`;

const ScoreWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ScoreInfoWrapper = styled.View`
  flex-basis: 40%;
  border-radius: 6;
  background: ${colors.white};
  border-bottom-width: 4;
  border-bottom-color: ${colors.primaryDarker};
  margin: 0 10px;
  padding: 5px 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export default Score;
