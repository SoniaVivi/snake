import createElem from "./createElem";

const countDownTimer = (() => {
  let timer;
  const newTimer = () => {
    timer = createElem(
      "span",
      "timer",
      createElem("div", "countdown-timer timer", "container")
    );
    timer.textContent = 3;
  };
  const countDown = () => {
    if (!timer) {
      newTimer();
    }
    if (timer.textContent > 1) {
      timer.textContent = timer.textContent - 1;
      window.setTimeout(countDown, 1000);
    } else {
      document.querySelectorAll(".timer").forEach((elem) => elem.remove());
      timer = null;
    }
  };

  return { countDown };
})();

export default countDownTimer;
