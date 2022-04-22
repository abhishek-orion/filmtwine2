import React from "react";
import { Box, VStack } from "@chakra-ui/react";

import Pagination from "../../components/Pagination";
import { useFilmViewContext } from "../../context/FilmViewContext";

import TableActions from "./TableActions";

const FilmListView = () => {
  const { paginationInfo, onPageChange } = useFilmViewContext();
  const onPaginationChange = (page) => {
    onPageChange(page);
  };
  return (
    <Box w="100%" bg="#F7F7F7" h="100%" marginTop="none">
      <VStack h="100%">
        <TableActions />
        <Pagination
          paginationInfo={paginationInfo}
          setSelectedPage={onPaginationChange}
        />
      </VStack>
    </Box>
  );
};

export default FilmListView;
