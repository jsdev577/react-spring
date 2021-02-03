import React, { useState } from "react";
import ReactDOM from "react-dom";

import { animated, useSpring, useSprings } from "react-spring";

import styled, { ThemeProvider } from "styled-components";

import {
  Box,
  Container,
  Heading,
  Typography,
  Flex,
  Grid,
  theme
} from "../../ui";

import "../../ui/molecules/global-styles/global.css";

import colorScheme from "../color-scheme";

const GridContainer = styled(Grid)``;
GridContainer.defaultProps = {
  gridTemplateColumns: "repeat(5, 1fr)",
  gridGap: 1
};

const AnimatedItem = styled(animated(Flex))`
  cursor: pointer;
`;
AnimatedItem.defaultProps = {
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  flexDirection: "column",
  width: "100%",
  height: 60,
  fontSize: 6
};

const AnimatedBox = styled(animated(Box))``;
AnimatedBox.defaultProps = {};

function App() {
  const [index, setIndex] = useState(null);

  const springs = useSprings(
    colorScheme.length,
    colorScheme.map((item, i) => ({
      background: item.hex,
      color: item.fontColor,
      // name: item.name,
      opacity: (index === null) | (i === index) ? 1 : 0.6,
      height: index === null ? 120 : 60,
      from: {
        opacity: 0,
        height: 120
      }
    }))
  );

  const [springProps, setSpringProps] = useSpring(() => ({
    from: { height: 0, opacity: 0 }
  }));

  const onItemClick = (i) => {
    const { name, hex, fontColor } = colorScheme[i];
    setSpringProps({
      name,
      background: hex,
      color: fontColor,
      height: 200,
      opacity: 1
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box bg="bg100" minHeight="100vh" py={1}>
        <Container>
          <Heading textAlign="center">
            React Spring Example - useSprings
          </Heading>
          <Typography textAlign="center" pb={2}>
            Click on colored box to trigger animation
          </Typography>
          <Box>
            <AnimatedItem style={springProps}>
              <AnimatedBox>{springProps.name}</AnimatedBox>
              <AnimatedBox style={{ textTransform: "uppercase" }}>
                {index !== null && colorScheme[index].hex}
              </AnimatedBox>
            </AnimatedItem>
            <GridContainer pt={1}>
              {springs.map((props, i) => (
                <AnimatedItem
                  key={i}
                  onClick={() => {
                    setIndex(i);
                    onItemClick(i);
                  }}
                  style={props}
                />
              ))}
            </GridContainer>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
