import * as React from "react";

export const SIZE = 100;
export default (props) => (
  <div
    style={{
      marginLeft: 1,
      marginRight: 1,
      display: "inline-block",
      border: "1px solid",
      width: SIZE,
      height: SIZE
    }}
  >
  	{props.children}
  </div>
);
