import React from "react";
import styled from "styled-components";
import { View, Animated, StyleSheet } from "react-native";

import colors from "../../utils/colors";

const styles = StyleSheet.create({
  rowWrapper: {
    width: "85%"
  },
  rowLineWrapper: {
    width: "85%",
    height: 7,
    backgroundColor: colors.primaryDarker
  },
  column: {
    width: 7,
    height: "100%",
    backgroundColor: colors.primaryDarker,
    marginLeft: "32.5%"
  }
});

// It will receive some props for the tiles
const GameGrid = () => {
  return (
    <Container>
      <ColumnWrapper>
        <Animated.View style={styles.column} />
        <Animated.View style={styles.column} />
      </ColumnWrapper>
      <View style={styles.rowWrapper}>
        <Row>
          <Tile />
          <Tile />
          <Tile />
        </Row>
      </View>
      <Animated.View style={styles.rowLineWrapper}>
        <Row>
          <Tile />
          <Tile />
          <Tile />
        </Row>
      </Animated.View>
      <Animated.View style={styles.rowLineWrapper}>
        <Row>
          <Tile />
          <Tile />
          <Tile />
        </Row>
      </Animated.View>
    </Container>
  );
};

const Container = styled.View`
  flex: 0.43;
  justify-content: space-around;
`;

const Row = styled.View`
  flex-direction: row;
  flex: 1;
  width: 100%;
`;

const Tile = styled.View`
  flex-basis: 33.33%;
  height: 120;
`;

const ColumnWrapper = styled.View`
  top: 55;
  left: 0;
  flex-direction: row;
  flex: 1;
  width: 85%;
  height: 100%;
  position: absolute;
`;

export default GameGrid;
