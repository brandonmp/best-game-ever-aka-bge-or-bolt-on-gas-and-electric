import * as React from "react";
import { SIZE } from "./Square";

export default props => (
  <div
    style={{
      display: "inline-block",
      border: "solid 1px",
      width: SIZE,
      height: SIZE
    }}
  >
    Card #{props.id}: {props.currentHP}/{props.maxHP}
  </div>
);
