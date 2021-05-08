import sendAjaxRequest from "./sendAjaxRequest";

const scoreController = (() => {
  const newScore = (points) => {
    const notificationsElem = document.querySelector(".notifications-text");
    const name = document.querySelector(".name").value;
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
      .finally(() =>
        window.setTimeout(() => (notificationsElem.textContent = ""), 5000)
      );
  };
  return { newScore };
})();

export default scoreController;
