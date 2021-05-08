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
  const random_integer = () => Math.floor(Math.random() * 17);

  const newGrid = () => {
    for (let y = 0; y < 17; y += 1) {
      let rowElem = _createElem("div", `row ${y}`, "grid");
      for (let x = 0; x < 17; x += 1) {
        _createElem("div", `square`, rowElem, { x, y });
      }
    }
    const startButton = _createElem(
      "button",
      "start-button",
      "buttons-container"
    );
    startButton.textContent = "Start!";
    return startButton;
  };

  const addSnake = (segment) => {
    const square = _selectSquare(segment.x, segment.y);
    if (square.classList.contains("snake")) {
      return "collision";
    }
    square.classList.add("snake");
    if (square.textContent == "●") {
      square.textContent = "";
      square.classList.remove("food");
      addFood();
      return true;
    }
    return false;
  };

  const removeSnake = (segment) => {
    _selectSquare(segment.x, segment.y).classList.remove("snake");
  };

  const addFood = () => {
    let x = random_integer();
    let y = random_integer();
    if (_selectSquare(x, y).classList.contains("snake")) {
      return addFood();
    } else {
      const food = _selectSquare(x, y);
      food.textContent = "●";
      food.classList.add("food");
    }
  };

  const clear = () => {
    document
      .querySelectorAll(".snake")
      .forEach((elem) => elem.classList.remove("snake"));
    document.querySelectorAll(".food").forEach((elem) => {
      elem.classList.remove("food");
      elem.textContent = "";
    });
  };

  return { newGrid, addSnake, removeSnake, addFood, clear };
})();

export default board;
