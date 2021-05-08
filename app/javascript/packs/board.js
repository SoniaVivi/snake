const board = (() => {
  const _createElem = (
    elemType,
    className = "",
    parent = null,
    dataType = null
  ) => {
    const elem = document.createElement(elemType);
    elem.classList.add(...className.split(" "));
    if (dataType) {
      for (const [name, value] of Object.entries(dataType)) {
        elem.setAttribute(`data-${name}`, value);
      }
    }
    if (typeof parent == "string") {
      return document.querySelector(`.${parent}`).appendChild(elem);
    } else if (typeof parent == "object") {
      return parent.appendChild(elem);
    } else {
      return elem;
    }
  };

  const _selectSquare = (x, y) =>
    document.querySelector(`[data-x='${x}'][data-y='${y}']`);
  const newGrid = () => {
    for (let y = 0; y < 17; y += 1) {
      let rowElem = _createElem("div", `row ${y}`, "grid");
      for (let x = 0; x < 17; x += 1) {
        _createElem("div", `square`, rowElem, { x, y });
      }
    }
  };

  const addSnake = (segment) => {
    _selectSquare(segment.x, segment.y).classList.add("snake");
  };

  const removeSnake = (segment) => {
    _selectSquare(segment.x, segment.y).classList.remove("snake");
  };

  return { newGrid, addSnake, removeSnake };
})();

export default board;
