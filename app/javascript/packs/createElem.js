const createElem = (
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

export default createElem;
