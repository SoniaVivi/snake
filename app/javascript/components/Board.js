import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Square from "./Square";

const Board = (props) => {
  const [grid, setGrid] = useState(Array(17).fill(Array(17).fill(0)));
  const Row = styled.div`
    display: flex;
    justify-content: center;
    max-width: 960px;
    width: 100%;
    margin: 0 auto;
  `;

  return (
    <React.Fragment>
      {grid.map((row) => (
        <Row>
          {row.map((data) => (
            <Square data={data}></Square>
          ))}
        </Row>
      ))}
    </React.Fragment>
  );
};
export default Board;
