import React, { Component } from "react";
import _ from "lodash";

import Parent from "./parent";
import logo from "./logo.svg";
import "./App.css";

// const settings = {
//   direction: "column",
//   x: {
//     size: 20,
//     children: null
//   },
//   y: {
//     size: 80,
//     children: {
//       direction: "row",
//       x: {
//         size: 50,
//         children: null
//       },
//       y: {
//         size: 50,
//         children: null
//       }
//     }
//   }
// };

const settings2 = {
  byId: {},
  allIds: [],
  resizing: false
};

class App extends Component {
  state = settings2;

  componentDidMount() {
    window.addEventListener("mousedown", this.mouseDown.bind(this));
    window.addEventListener("mouseup", this.mouseUp.bind(this));
    window.addEventListener("mousemove", _.throttle(this.mouseMove, 17));
  }

  mouseDown(e) {
    if (e.target.classList.contains("handle")) {
      this.box = e.target.parentElement;
      this.setState({ resizing: true });
    }
  }

  mouseUp() {
    this.setState({ resizing: false });
    this.box = null;
  }

  mouseMove = e => {
    if (!this.state.resizing) {
      return;
    }

    console.log("pageX", e.pageX);
    console.log("pageY", e.pageY);

    const { x, y, width, height } = this.box.getBoundingClientRect();
    const mouseX = e.pageX;
    const mouseY = e.pageY;

    let size;
    if (this.box.dataset.direction === "row") {
      size = (mouseX - x) / width * 100;
    } else {
      size = (mouseY - y) / height * 100;
    }

    size = Math.min(Math.max(0, size), 100);
    console.log("Output:", this.box.dataset.id, size, 100 - size);

    this.setSize(this.box.dataset.id, size, 100 - size);
  };

  onSplit = (parentId, direction, x, y) => {
    this.setState(state => {
      const newId = state.allIds.length;

      const newState = {
        ...state,
        byId: {
          ...state.byId,
          ...(parentId !== null && {
            [parentId]: {
              ...state.byId[parentId],
              x: {
                ...state.byId[parentId].x,
                children: x ? newId : state.byId[parentId].x.children
              },
              y: {
                ...state.byId[parentId].y,
                children: y ? newId : state.byId[parentId].y.children
              }
            }
          }),
          [newId]: {
            direction,
            x: {
              size: 50,
              children: null
            },
            y: {
              size: 50,
              children: null
            }
          }
        },
        allIds: [...state.allIds, newId]
      };

      console.log(newState);
      return newState;
    });
  };

  setSize = (id, xSize, ySize) => {
    this.setState(state => {
      const newState = {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            x: {
              ...state.byId[id].x,
              size: xSize
            },
            y: {
              ...state.byId[id].y,
              size: ySize
            }
          }
        }
      };

      console.log(newState);
      return newState;
    });
  };

  render() {
    return (
      <Parent
        parentId={null}
        id={0}
        settings={this.state}
        onSplit={this.onSplit}
        setSize={this.setSize}
      />
    );
  }
}

export default App;
