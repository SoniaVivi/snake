import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Square = (props) => {
  const GridSquare = styled.div`
    width: 40px;
    height: 40px;
    outline: 1px solid #000000;
  `;

  return (
    <React.Fragment>
      <GridSquare></GridSquare>
    </React.Fragment>
  );
};
export default Square;
// $red: #ff0040;
// $white: #c4ffff;
// $pink: #fe00fe;
// $blue: #00b3fe;
// $purple: #7401df;
