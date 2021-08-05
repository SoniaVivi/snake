import sendAjaxRequest from "./sendAjaxRequest";
import createElem from "./createElem";

const scoreController = (() => {
  let _name = "";

  const newScore = (points) => {
    createElem("div", "submit popup-container", "container");
    createElem("div", "submit popup", "submit.popup-container");
    createElem("div", "submit header", "submit.popup");
    const title = createElem("h1", "submit title", "submit.header");
    title.textContent = "Submit your Score!";

    const closeButton = createElem(
      "button",
      "submit close-button",
      "submit.header"
    );
    closeButton.textContent = "X";
    closeButton.addEventListener("click", _removePopup);

    createElem("div", "submit body", "submit.popup");
    const nameForm = createElem("input", "submit", "submit.body");
    nameForm.defaultValue = _name;

    const submitButton = createElem("button", "submit", "submit.popup");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", () =>
      _submitScore(document.querySelector("input.submit").value, points)
    );
  };

  const _submitScore = (name, points) => {
    let notificationsElem = document.querySelector(".notifications");
    sendAjaxRequest("POST", "/", {
      name,
      points,
    })
      .then((response) => {
        if (response.success) {
          notificationsElem.textContent = "Saved score!";
        } else if (name == "") {
          notificationsElem.textContent = "Please input a name to save score";
        } else {
          notificationsElem.textContent = "Failed to save score";
        }
      })
      .catch((e) => {
        console.log(e);
        notificationsElem.textContent = "Failed to save score";
      })
      .finally(() => {
        _name = name;
        _removePopup();
        window.setTimeout(() => (notificationsElem.textContent = ""), 5000);
      });
  };

  const _removePopup = () =>
    document.querySelectorAll(".submit").forEach((e) => e.remove());

  const setPersonalBest = (score) => {
    const highScoreElem = document.querySelector(".high-score-display");
    const prevHighScore = localStorage.getItem("high-score");
    if (prevHighScore && prevHighScore > score) {
      highScoreElem.textContent = `Personal Best: ${prevHighScore}`;
    } else {
      highScoreElem.textContent = `Personal Best: ${score}`;
      localStorage.setItem("high-score", score);
    }
  };

  return { newScore, setPersonalBest };
})();

export default scoreController;
