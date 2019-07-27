import * as React from "react";

export const SIZE = 100;
export default props => (
  <div
    onClick={props.onClick}
    style={{
      marginLeft: 1,
      marginRight: 1,
      display: "inline-block",
      border: "1px solid",
      borderRadius: "4px",
      width: SIZE,
      height: SIZE,
      overflow: "hidden"
    }}
  >
    {props.children}
  </div>
);
