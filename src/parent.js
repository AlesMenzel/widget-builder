import React, { Component } from "react";

import Box from "./box";

class Parent extends Component {
  render() {
    const { id, parentId, settings, onSplit, x, y } = this.props;
    const node = settings.byId[id];

    if (!node) {
      return (
        <div className="parent">
          <button onClick={() => onSplit(parentId, "row", x, y)}>
            <i className="material-icons vertical">border_vertical</i>
          </button>
          <button onClick={() => onSplit(parentId, "column", x, y)}>
            <i className="material-icons horizontal">border_horizontal</i>
          </button>
        </div>
      );
    }

    return <Box {...this.props} />;
  }
}

export default Parent;
