import React from "react";
import { useTable, useBlockLayout, useResizeColumns } from "react-table";
import { useFilmViewContext } from "../../context/FilmViewContext";
import styled from "styled-components";
import { TableColumns } from "../../context/TableColumns";
const Styles = styled.div`
  padding: 1rem;

  .table {
    display: inline-block;
    border-spacing: 0;
    width: 100%;
    max-width: 100%;
    height: 600px;
    overflow: scroll;
    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th {
      background-color: #f7f7f7;
      font-size: 14px;
      color: #9ba4b0;
    }

    .th,
    .td {
      border: none;
      margin: 0;
      padding: 0.5rem;
      overflow: hidden;

      ${
        "" /* In this example we use an absolutely position resizer,
       so this is required. */
      }
      position: relative;

      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        background: #9ba4b0;
        width: 2px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${"" /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;

        &.isResizing {
          background: red;
        }
      }
    }
  }
`;

const FilmListTable = () => {
  const { filteredData, columnVisibilityMap, sortingData } =
    useFilmViewContext();

  const UpdatedColumns = React.useMemo(
    () =>
      TableColumns.filter((column) => columnVisibilityMap[column.id] === true),
    [columnVisibilityMap]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: UpdatedColumns,
        data: filteredData || [],
      },
      useBlockLayout,
      useResizeColumns
    );

  return (
    <Styles>
      <div>
        <div {...getTableProps()} className="table">
          <div>
            {headerGroups.map((headerGroup) => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map((column) => (
                  <div {...column.getHeaderProps()} className="th">
                    {column.render("Header", { sortingData })}
                    {/* Use column.getResizerProps to hook up the events correctly */}
                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? "isResizing" : ""
                      }`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <div {...row.getRowProps()} className="tr">
                  {row.cells.map((cell) => {
                    return (
                      <div {...cell.getCellProps()} className="td">
                        {cell.render("Cell")}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default FilmListTable;
