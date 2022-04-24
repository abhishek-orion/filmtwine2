import React from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
} from "@chakra-ui/react";
import GenreChip from "../../components/GenreChip";
import { FilmReviewData } from "../../constants/reviewMockData";

const FilmInfo = ({ filmId }) => {
  const [moreFilmData, setMoreFilmData] = React.useState(null);
  const FetchMoreFilmInfo = React.useCallback(() => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${filmId}?api_key=93e78909d263b5016e3e8576ec69af0c&language=en-US`
    ).then((res) => res.json());
  }, [filmId]);

  React.useEffect(() => {
    FetchMoreFilmInfo().then((data) => setMoreFilmData(data));
  }, [FetchMoreFilmInfo]);

  if (!moreFilmData) {
    return null;
  }
  return (
    <Box bg="#ffffff">
      <VStack spacing={8}>
        <VStack spacing={2} alignItems="start">
          <Text fontWeight={600} fontSize={"20px"} p={2}>
            {moreFilmData.original_title}
          </Text>
          <Flex>
            {moreFilmData.genres.map((genre) => {
              return <GenreChip key={genre.id} genreId={genre.id} />;
            })}
          </Flex>
          <Text>{moreFilmData.overview}</Text>
        </VStack>
        <Box>
          <Tabs>
            <TabList justifyContent="space-around">
              <Tab>Film Reviews</Tab>
              <Tab>Filmmker Info</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <VStack spacing="8px" w="100%">
                  {FilmReviewData.map((review, index) => {
                    return (
                      <Box bg="#FF6C61" borderRadius="8px" p={4} w="100%">
                        <HStack spacing={4}>
                          <Image
                            boxSize="50px"
                            objectFit="cover"
                            src={`https://picsum.photos/300/300?random=${
                              index + 1
                            }`}
                            borderRadius="50px"
                          />
                          <Text fontWeight={600} fontSize="16px" color="white">
                            {review.user}
                          </Text>
                        </HStack>

                        <Text color="white"> {review.comment}</Text>
                      </Box>
                    );
                  })}
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack spacing={4}>
                  <VStack>
                    <iframe
                      title="Filmmaker Info"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin"
                      frameborder="0"
                      style={{ border: 0 }}
                      allowfullscreen=""
                      aria-hidden="false"
                      tabIndex="0"
                    ></iframe>
                    <Box
                      w="100%"
                      display="grid"
                      gridTemplateColumns="1fr 1fr"
                      rowGap={4}
                    >
                      <Box>
                        <Text fontWeight={600} color="#9BA4B0">
                          User
                        </Text>
                        <Text>M S N Kartik</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={600} color="#9BA4B0">
                          Timestamp
                        </Text>{" "}
                        <Text>24 June, 32:12:00</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={600} color="#9BA4B0">
                          Location
                        </Text>
                        <Text>Hyderabad, India</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={600} color="#9BA4B0">
                          Role
                        </Text>
                        <Text>Writer, Director</Text>
                      </Box>
                    </Box>
                  </VStack>
                  <VStack spacing="2" w="100%" alignItems="left">
                    <Text color="grey" fontSize="16px" fontWeight={600}>
                      Filmmaker Biography
                    </Text>
                    <Text>
                      For many films are a hobby. For some they are a passion.
                      But Karthik is sort of a person, who has always lived his
                      life in 24 frames. Films were what shaped him since
                      childhood. He says that he saw Rob Williams in awe, as he
                      stood up on his desk to inspire his students to seize the
                      day, in Dead Poets Society.
                    </Text>
                  </VStack>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </Box>
  );
};

export default FilmInfo;
