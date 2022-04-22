import _ from "lodash";
export const initialState = {
  data: null,
  filteredData: null,
  error: null,
  loading: false,
  searchedText: "",
  sortingData: {
    field: null,
    order: null,
  },
  paginationInfo: { total: 0, currentPage: 1, total_pages: 0 },
};

function sortData(data, field, order) {
  return order === "ASC"
    ? _.orderBy(data, [field], ["asc"])
    : _.orderBy(data, [field], ["asc"]).reverse();
}

export function FilmViewReducer(state = { initialState }, action) {
  let updatedSortingData;
  let filteredData;
  let updatedData;
  switch (action.type) {
    case "FETCH_DATA_START":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.data,
        paginationInfo: action.paginationInfo,
        filteredData: action.data,
      };
    case "FETCH_DATA_FAILURE":
      return {
        ...state,
        data: null,
        loading: false,
        error: action.error,
      };
    case "FILTER_DATA":
      const { searchedText } = action;
      filteredData =
        searchedText !== ""
          ? state.data.filter((movie) =>
              movie.title.toLowerCase().includes(searchedText.toLowerCase())
            )
          : state.data;
      return {
        ...state,
        filteredData,
        searchedText,
      };
    case "PAGE_CHANGE":
      const { page } = action;
      const updatedPagination = {
        ...state.paginationInfo,
        currentPage: page,
      };
      return {
        ...state,
        paginationInfo: updatedPagination,
      };
    case "UPDATE_SORT_ORDER":
      const { order } = action;
      updatedData =
        state.sortingData.field && order
          ? sortData(state.filteredData, state.sortingData.field.value, order)
          : state.filteredData;

      updatedSortingData = {
        ...state.sortingData,
        order,
      };
      return {
        ...state,
        filteredData: updatedData,
        sortingData: updatedSortingData,
      };
    case "UPDATE_SORT_FIELD":
      const { field } = action;
      updatedData =
        field && state.sortingData.order
          ? sortData(state.filteredData, field.value, state.sortingData.order)
          : state.filteredData;

      updatedSortingData = {
        ...state.sortingData,
        field,
      };
      return {
        ...state,
        sortingData: updatedSortingData,
        filteredData: updatedData,
      };
    default:
      return state;
  }
}
