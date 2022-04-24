import React from "react";
import { FilmViewReducer, initialState } from "./FilmViewReducer";
import { TableColumns } from "./TableColumns";

const VisibilityMap = TableColumns.reduce(
  (acc, column) => {
    acc[column.id] = true;
    return acc;
  },
  { all: true }
);

const FilmViewContext = React.createContext({});

const FilmViewContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(FilmViewReducer, initialState);
  const [searchedText, setSearchedText] = React.useState("");
  const [columnVisibilityMap, setColumnVisibilityMap] =
    React.useState(VisibilityMap);

  const FetchMoviesData = React.useCallback(() => {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=93e78909d263b5016e3e8576ec69af0c&language=en-US&page=${state.paginationInfo.currentPage}`
    ).then((res) => {
      return res.json();
    });
  }, []);

  React.useEffect(() => {
    dispatch({
      type: "FILTER_DATA",
      searchedText,
    });
  }, [searchedText]);

  React.useEffect(() => {
    dispatch({
      type: "FETCH_DATA_START",
    });
    FetchMoviesData().then((data) => {
      let paginationInfo = {
        total: data.total_results,
        currentPage: data.page,
        total_pages: data.total_pages,
      };
      dispatch({
        type: "FETCH_DATA_SUCCESS",
        data: data.results,
        paginationInfo,
      });
    });
  }, [state.paginationInfo.currentPage, FetchMoviesData]);

  const onSortOrderChange = (order) => {
    dispatch({
      type: "UPDATE_SORT_ORDER",
      order,
    });
  };

  const onSortFieldChange = (field) => {
    dispatch({
      type: "UPDATE_SORT_FIELD",
      field,
    });
  };

  const onPageChange = (page) => {
    dispatch({
      type: "PAGE_CHANGE",
      page,
    });
  };

  const onSearchTextChange = (searchedText) => {
    setSearchedText(searchedText);
  };

  const value = {
    data: state.data,
    filteredData: state.filteredData,
    visibleColumns: state.visibleColumns,
    paginationInfo: state.paginationInfo,
    searchedText: state.searchedText,
    sortingData: state.sortingData,
    onSortFieldChange,
    onSortOrderChange,
    columnVisibilityMap,
    setColumnVisibilityMap,
    onSearchTextChange,
    onPageChange,
    dispatch,
  };

  return (
    <FilmViewContext.Provider value={value}>
      {children}
    </FilmViewContext.Provider>
  );
};

export const useFilmViewContext = () => React.useContext(FilmViewContext);
export default FilmViewContextProvider;
