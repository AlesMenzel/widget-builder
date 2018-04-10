import React, { Component } from "react";

import Child from "./child";

class Box extends Component {
  render() {
    const { id, settings, onSplit, setSize } = this.props;

    const node = settings.byId[id];

    const style = {
      flexDirection: node.direction
    };

    return (
      <div
        className="parent"
        style={style}
        data-id={id}
        data-direction={node.direction}
      >
        <Child
          parentId={id}
          x={true}
          id={node.x.children}
          settings={settings}
          node={node.x}
          onSplit={onSplit}
          setSize={setSize}
        />
        <div className={`handle handle-${node.direction}`} />
        <Child
          parentId={id}
          y={true}
          id={node.y.children}
          settings={settings}
          node={node.y}
          onSplit={onSplit}
          setSize={setSize}
        />
      </div>
    );
  }
}

export default Box;
