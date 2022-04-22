import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import GenreChip from "../components/GenreChip";
import SortingIcon from "../components/SortingIcon";

export const TableColumns = [
  {
    Header: (props) => {
      const { sortingData } = props;
      const isActive = sortingData.field?.value === "title";
      return (
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="12px">FILM NAME</Text>
          <SortingIcon isActive={isActive} order={sortingData.order} />
        </Flex>
      );
    },
    accessor: "title",
    width: 300,
    id: "filmName",
    Cell: ({ row }) => {
      const { id, title } = row.original;
      return (
        <Link key={id} to={`/film/${id}`}>
          <Text isTruncated color="#FF6C61">
            {title}
          </Text>
        </Link>
      );
    },
  },
  {
    Header: (props) => {
      const { sortingData } = props;
      const isActive = sortingData.field?.value === "popularity";

      return (
        <Flex alignItems="center" justifyContent="space-between">
          <Text isTruncated fontSize="12px">
            POPULARITY
          </Text>
          <SortingIcon isActive={isActive} order={sortingData.order} />
        </Flex>
      );
    },
    accessor: "vote_average",
    width: 300,
    id: "popularity",
  },
  {
    Header: () => {
      return (
        <Flex alignItems="center" justifyContent="space-between">
          <Text isTruncated fontSize="12px">
            GENRE
          </Text>
        </Flex>
      );
    },
    accessor: "genre_ids",
    id: "genre",
    width: 300,
    Cell: ({ row }) => {
      return (
        <Flex justifyContent="left" w="max-content">
          {row
            ? row.original.genre_ids.map((genre) => (
                <GenreChip key={genre} genreId={genre} />
              ))
            : null}
        </Flex>
      );
    },
  },
  {
    Header: (props) => {
      const { sortingData } = props;
      const isActive = sortingData.field?.value === "title";

      return (
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="12px">RELEASE DATE</Text>
          <SortingIcon isActive={isActive} order={sortingData.order} />
        </Flex>
      );
    },
    accessor: "release_date",
    id: "releaseDate",
    width: 300,
  },
];
