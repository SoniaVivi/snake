import board from "./board";
import scoreController from "./scoreController";
import countDownTimer from "./countDownTimer";

const game = (() => {
  let _initialRender = true;
  let _firstGame = true;
  let _direction = "up";
  let _size = 1;
  let _snake = [{ x: 7, y: 7 }];
  let _ongoing = false;
  let _scoreElem;
  let _startButton;
  const _updateScore = () =>
    (_scoreElem.textContent = `${
      _scoreElem.textContent.split(" ")[0]
    } ${_size}`);
  const _setHighScore = () => scoreController.setPersonalBest(_size);
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
      _endGame();
      return false;
    }
    let newSegment = { x, y };
    _snake.push(newSegment);
    return newSegment;
  };
  const _removeSegment = () => _snake.shift();
  const _isInverseDirection = (input) => {
    const inverses = {
      up: { down: true },
      down: { up: true },
      left: { right: true },
      right: { left: true },
    };
    return _direction in inverses[input] && _snake.length != 1 ? true : false;
  };
  const _changeDirection = (key) => {
    const keys = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
    };
    if (key.key in keys) {
      key.preventDefault();
    }
    if (!key.repeat && !_isInverseDirection(keys[key.key])) {
      _direction = keys[key.key];
    }
  };
  const _endGame = () => {
    _ongoing = !_ongoing;
    scoreController.newScore(_size);
    _startButton.classList.remove("hidden");
  };
  const _gameLoop = () => {
    if (_snake.length == _size) {
      const newSegment = _addSegment();
      if (newSegment) {
        const result = board.addSnake(newSegment);
        if (result == true) {
          _size += 1;
          _updateScore();
        } else if (result == "collision") {
          _endGame();
        }
        board.removeSnake(_removeSegment());
      }
    } else if (_snake.length < _size) {
      board.addSnake(_addSegment());
    }
    _setHighScore();
    window.setTimeout(() => _ongoing && _gameLoop(), 100);
  };
  const _restartGame = () => {
    _size = 1;
    _snake = [{ x: 7, y: 7 }];
    _direction = "up";
    _updateScore();
    board.clear();
    board.addFood();
    board.addSnake(_addSegment());
  };
  const _getStartButton = (elem) => {
    elem.addEventListener("mousedown", () => {
      if (!_firstGame) {
        _restartGame();
      }
      _startButton.classList.add("hidden");
      countDownTimer.countDown();
      window.setTimeout(() => start(), 2000);
    });
  };

  const render = () => {
    if (_initialRender) {
      _setHighScore();
      _startButton = board.newGrid();
      _getStartButton(_startButton);
      _initialRender = false;
    }
    board.addFood();
    board.addSnake(_addSegment());
  };

  const start = () => {
    document.addEventListener("keydown", (e) => _changeDirection(e));
    _ongoing = true;
    _removeSegment();
    _gameLoop();
    _scoreElem = document.querySelector(".score-display");
    _firstGame = false;
  };
  return { start, render };
})();

window.onload = () => {
  game.render();
};
