import React from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Button,
  HStack,
  Divider,
  Image,
  Text,
} from "@chakra-ui/react";
import {
  SearchIcon,
  HamburgerIcon,
  ArrowBackIcon,
  BellIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useFilmViewContext } from "../../context/FilmViewContext";

const FilmListHeader = (props) => {
  const { searchedText, onSearchTextChange } = useFilmViewContext();
  const { getButtonProps } = props;
  const onSearchChange = (e) => {
    onSearchTextChange(e.target.value);
  };
  return (
    <Flex
      h="74px"
      w="100%"
      justifyContent={"space-between"}
      alignItems="center"
      p={2}
      sx={{ boxShadow: "0px 0px 20px 2px rgba(216,216,216,0.59)" }}
      bg="#FFFFFF"
    >
      <Flex alignItems="center">
        {props.menuHidden ? (
          <Button {...getButtonProps()}>
            <HamburgerIcon />
          </Button>
        ) : null}

        {props.addBackButton ? (
          <Box p={1}>
            <Button bg="#FF6C61" color="white" w="80px" p={1}>
              <Link to="/movieList">
                <Flex alignItems="center" justifyContent="space-around">
                  <ArrowBackIcon />{" "}
                  <Text p={1} isTruncated>
                    Back
                  </Text>
                </Flex>
              </Link>
            </Button>
          </Box>
        ) : null}
        {props.menuHidden ? (
          <Image margin="8px" src="/images/Logo_Website_Header_On_White.svg" />
        ) : null}
      </Flex>
      <HStack>
        <InputGroup
          h="24px"
          minWidth="100px"
          w={{ base: "30px", sm: "30px", md: "max-content", lg: "max-content" }}
          value={searchedText}
        >
          <InputLeftElement
            h="24px"
            pointerEvents="none"
            children={<SearchIcon h={4} w={4} color="gray.300" />}
          />
          <Input
            onChange={onSearchChange}
            h="24px"
            w="250px"
            type="text"
            placeholder="Search Film and Filmmakers"
            fontSize="14px"
            border="none"
            value={searchedText}
          />
        </InputGroup>
        <Box h="60px" p={2}>
          <Divider orientation="vertical" />
        </Box>

        <BellIcon w={8} h={8} color="#DDDDDD" />

        <Box h="60px" p={2}>
          <Divider orientation="vertical" />
        </Box>
        <Image
          boxSize="50px"
          objectFit="cover"
          src="https://picsum.photos/300/300?random=1"
          borderRadius="50px"
        />
      </HStack>
    </Flex>
  );
};

export default FilmListHeader;
