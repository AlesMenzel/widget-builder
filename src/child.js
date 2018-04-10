import React, { Component } from "react";

import Parent from "./parent";

class Child extends Component {
  render() {
    const { node, ...rest } = this.props;

    const style = {
      flex: node.size
    };

    return (
      <div className="child" style={style}>
        <Parent {...rest} />
      </div>
    );
  }
}

export default Child;
