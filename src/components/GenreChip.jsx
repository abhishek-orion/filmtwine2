import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Generes } from "../constants/generes";

const GenreChip = ({ genreId }) => {
  const genre = Generes.find((genre) => genreId === genre.id);

  return (
    <Flex
      alignItems="center"
      h="40px"
      borderRadius="8px"
      backgroundColor={genre.color}
      p={2}
      margin={1}
    >
      <Text w="100%" color="white">
        {genre.name}
      </Text>
    </Flex>
  );
};

export default GenreChip;
