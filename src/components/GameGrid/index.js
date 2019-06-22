import React, { useEffect } from "react";
import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Animated, StyleSheet, Dimensions } from "react-native";

import colors from "../../utils/colors";

const GameGrid = ({
  currentPlayer,
  setCurrentPlayer,
  gameGridPlays,
  setGameGridPlays,
  winnerPlayer,
  setWinnerPlayer,
  hasSomeoneWon,
  hasGameStarted,
  checkIfGameEnded,
  setHasGameEnded,
}) => {
  const styles = StyleSheet.create({
    rowLine: {
      height: 7,
      backgroundColor: colors.primaryDarker,
      marginTop: 100,
    },
    column: {
      width: 7,
      backgroundColor: colors.primaryDarker,
      marginLeft: "32%",
    },
  });

  const animatedRow = new Animated.Value(0);
  const animatedColumn = new Animated.Value(0);

  const handleColumnAnimation = () =>
    Animated.timing(animatedColumn, {
      toValue: 312,
      duration: 1000,
    }).start();

  const handleRowAnimation = () => {
    const widthFromDimensions = Dimensions.get("window").width * 0.85;

    Animated.timing(animatedRow, {
      toValue: widthFromDimensions,
      duration: 1000,
    }).start();
  };

  const handleGamePlay = (row, playIndex) => {
    const oldGameGridPlaysRowToChange = gameGridPlays[row];
    const newGameGridPlaysOnRow = oldGameGridPlaysRowToChange.map(
      (play, index) => (index === playIndex ? currentPlayer : play)
    );

    const newGameGridPlays = gameGridPlays.map((rowPlays, index) =>
      index === row ? newGameGridPlaysOnRow : rowPlays
    );

    const newCurrentPlayer = currentPlayer === "X" ? "O" : "X";

    setGameGridPlays(newGameGridPlays);
    setCurrentPlayer(newCurrentPlayer);

    if (checkIfGameEnded(newGameGridPlays)) setHasGameEnded(true);
    if (hasSomeoneWon(newGameGridPlays)) {
      setWinnerPlayer(currentPlayer);
      setHasGameEnded(true);
    }
  };

  useEffect(() => {
    handleColumnAnimation();
    handleRowAnimation();
  }, []);

  return (
    <Container>
      <TilesWrapper>
        <Row>
          {gameGridPlays[0].map((play, index) => (
            <Tile
              key={index}
              disabled={!!play || !!winnerPlayer || !hasGameStarted}
              onPress={() => handleGamePlay(0, index)}
            >
              {play === "X" && (
                <Icon name="close" size={70} color={colors.darkGrey} />
              )}
              {play === "O" && (
                <Icon
                  name="circle-outline"
                  size={60}
                  color={colors.lightYellow}
                />
              )}
            </Tile>
          ))}
        </Row>
        <Row>
          {gameGridPlays[1].map((play, index) => (
            <Tile
              key={index}
              disabled={!!play || !!winnerPlayer || !hasGameStarted}
              onPress={() => handleGamePlay(1, index)}
            >
              {play === "X" && (
                <Icon name="close" size={70} color={colors.darkGrey} />
              )}
              {play === "O" && (
                <Icon
                  name="circle-outline"
                  size={60}
                  color={colors.lightYellow}
                />
              )}
            </Tile>
          ))}
        </Row>
        <Row>
          {gameGridPlays[2].map((play, index) => (
            <Tile
              key={index}
              disabled={!!play || !!winnerPlayer || !hasGameStarted}
              onPress={() => handleGamePlay(2, index)}
            >
              {play === "X" && (
                <Icon name="close" size={70} color={colors.darkGrey} />
              )}
              {play === "O" && (
                <Icon
                  name="circle-outline"
                  size={60}
                  color={colors.lightYellow}
                />
              )}
            </Tile>
          ))}
        </Row>
      </TilesWrapper>

      <RowLineWrapper>
        <Animated.View style={{ ...styles.rowLine, width: animatedRow }} />
        <Animated.View style={{ ...styles.rowLine, width: animatedRow }} />
      </RowLineWrapper>

      <ColumnWrapper>
        <Animated.View style={{ ...styles.column, height: animatedColumn }} />
        <Animated.View style={{ ...styles.column, height: animatedColumn }} />
      </ColumnWrapper>
    </Container>
  );
};

const Container = styled.View`
  height: 313;
  position: relative;
`;

const Row = styled.View`
  flex-direction: row;
  flex: 1;
  width: 100%;
  height: 100;
`;

const TilesWrapper = styled.View`
  width: 85%;
  height: 313;
`;

const Tile = styled.TouchableOpacity`
  flex-basis: 33.33%;
  height: 100;
  align-items: center;
  justify-content: center;
`;

const ColumnWrapper = styled.View`
  top: 0;
  left: 0;
  flex-direction: row;
  flex: 1;
  width: 85%;
  height: 313;
  position: absolute;
`;

const RowLineWrapper = styled.View`
  top: 0;
  left: 0;
  flex: 1;
  width: 85%;
  height: 313;
  position: absolute;
`;

export default GameGrid;
