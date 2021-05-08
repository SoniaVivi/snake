import board from "./board";

const game = (() => {
  let _initialRender = true;
  let _direction = "up";
  let _size = 1;
  let _snake = [{ x: 7, y: 7 }];
  const _inBounds = (position) => position <= 16 && position >= 0;
  const _addSegment = () => {
    const moves = {
      up: [0, -1],
      down: [0, 1],
      right: [1, 0],
      left: [-1, 0],
    };
    const lastSegment = _snake[_snake.length - 1];
    let x = lastSegment.x + moves[_direction][0];
    let y = lastSegment.y + moves[_direction][1];
    if (!(_inBounds(x) && _inBounds(y))) {
      return false;
    }
    let newSegment = { x, y };
    _snake.push(newSegment);
    return newSegment;
  };
  const _removeSegment = () => _snake.shift();
  const _changeDirection = (key) => {
    console.log(key);
    const keys = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
    };
    if (!key.repeat) {
      _direction = keys[key.key];
    }
  };
  const gameLoop = () => {
    if (_snake.length == _size) {
      const newSegment = _addSegment();
      if (newSegment) {
        board.addSnake(newSegment);
        board.removeSnake(_removeSegment());
      }
    } else if (_snake.length < _size) {
      board.addSnake(_addSegment());
    }
    window.setTimeout(() => gameLoop(), 250);
  };

  const render = () => {
    if (_initialRender) {
      board.newGrid();
      _initialRender = false;
    }
    document.addEventListener("keydown", (e) => _changeDirection(e));
    gameLoop();
  };

  // const _incrementTimer = () => {
  // };

  return { render };
})();

window.onload = () => {
  game.render();
};
