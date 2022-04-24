import React from "react";
import "./FilmView.css";
import { Box, Flex } from "@chakra-ui/react";
import EmbedVideo from "../../components/EmbedVideo";
import { DragHandleIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import FilmInfo from "./FilmInfo";

const FilmView = () => {
  const [dragging, setDragging] = React.useState(false);
  const [rightPanelWidth, setRightPanelWidth] = React.useState(400);
  const [delta, setDelta] = React.useState(0);
  const [initialPos, setInitialPos] = React.useState(null);
  const { filmId } = useParams();
  const [movieData, setMovieData] = React.useState(null);

  const fetchMovieData = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${filmId}/videos?api_key=93e78909d263b5016e3e8576ec69af0c&language=en-US`
    ).then((res) => {
      return res.json();
    });
  };

  React.useEffect(() => {
    fetchMovieData().then((movieData) => {
      setMovieData(movieData.results[0]);
    });
  }, [fetchMovieData]);

  const startResize = (event) => {
    setDragging(true);
    setInitialPos(event.clientX);
  };

  const stopResize = () => {
    if (dragging) {
      setDragging(false);
      setRightPanelWidth(rightPanelWidth - delta);
      setDelta(0);
    }
  };

  const resizePanel = (event) => {
    if (dragging) {
      const delta = event.clientX - initialPos;
      setDelta(delta);
    }
  };

  return (
    <Box
      onMouseMove={resizePanel}
      onMouseUp={stopResize}
      h="100%"
      className="panel-container"
    >
      <Flex
        className="panel"
        style={{
          width: `calc(100% - ${rightPanelWidth}px)`,
        }}
        alignItems="center"
        bg="#333949"
      >
        <EmbedVideo rightPanelWidth={rightPanelWidth} movieData={movieData} />
      </Flex>
      <Box
        onMouseDown={startResize}
        key={"resizer"}
        style={{ left: delta }}
        className="resizer"
      >
        <DragHandleIcon />
      </Box>
      <Box
        key={"panel_2"}
        className="rightPanel"
        style={{ width: rightPanelWidth }}
      >
        <FilmInfo filmId={filmId} />
      </Box>
    </Box>
  );
};

export default FilmView;
