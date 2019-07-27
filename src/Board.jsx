import * as React from "react";
import Square, { SIZE } from "./Square";
import _ from "lodash";

export default class Board extends React.Component {
  render() {
    return (
      <div style={{ width: (SIZE + 4) * 4, height: SIZE * 4 }}>
        {_.range(16).map(i => (
          <Square />
        ))}
      </div>
    );
  }
}
