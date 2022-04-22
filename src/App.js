import "./App.css";
import React from "react";
import { ChakraProvider, VStack } from "@chakra-ui/react";
import { Flex, useDisclosure } from "@chakra-ui/react";

import { Routes, Navigate, Route, BrowserRouter } from "react-router-dom";
import { motion } from "framer-motion";

import LeftMenu from "./components/LeftMenu";
import FilmListView from "./screens/FilmListView/FilmListView";
import FilmView from "./screens/FilmView/FilmView";
import FilmViewContextProvider from "./context/FilmViewContext";
import FilmListHeader from "./components/AppHeader/FilmListHeader";

import { extendTheme } from "@chakra-ui/react";

import { ScreenBreakpoints } from "./constants/styleConstants";

const theme = extendTheme({ ScreenBreakpoints });

function App() {
  const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure();
  const [hidden, setHidden] = React.useState(!isOpen);

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <FilmViewContextProvider>
          <Flex h="100vh" flexDirection="row">
            <motion.div
              {...getDisclosureProps()}
              hidden={hidden}
              initial={false}
              onAnimationStart={() => setHidden(false)}
              onAnimationComplete={() => setHidden(!isOpen)}
              animate={{ width: isOpen ? 250 : 0 }}
              style={{
                whiteSpace: "nowrap",
                left: "0",
                height: "100%",
                top: "0",
              }}
            >
              <LeftMenu getButtonProps={getButtonProps} />
            </motion.div>

            <VStack w="100%">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate replace to="/movieList" />}
                />
                <Route
                  path="movieList"
                  element={
                    <>
                      <FilmListHeader
                        menuHidden={hidden}
                        getButtonProps={getButtonProps}
                      />
                      <FilmListView />
                    </>
                  }
                />
                <Route
                  path="film/:filmId"
                  element={
                    <>
                      <FilmListHeader
                        getButtonProps={getButtonProps}
                        addBackButton
                        menuHidden={hidden}
                      />
                      <FilmView />
                    </>
                  }
                />
                <Route path="*" element={<Navigate to="/movieList" />} />
              </Routes>
            </VStack>
          </Flex>
        </FilmViewContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
