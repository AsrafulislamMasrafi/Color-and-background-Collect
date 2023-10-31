const colorChangeBtn = document.querySelector(".ChangeBtn");
const colorShowBox = document.querySelector(".box");
const copyBtn = document.querySelector(".copyBtn");
const saveBtn = document.querySelector(".saveBtn");
const radioCopyMode = document.getElementsByName("radio");
const hexInput = document.querySelector(".hexColor");
const rgbInput = document.querySelector(".rgbColor");
const redRange = document.querySelector(".red");
const greenRange = document.querySelector(".green");
const blueRange = document.querySelector(".blue");
const rangeTextRed = document.querySelector(".rangeTextRed");
const rangeTextGreen = document.querySelector(".rangeTextGreen");
const rangeTextBlue = document.querySelector(".rangeTextBlue");
const presetColorContainer = document.querySelector(".presetBox");
const saveContainer = document.querySelector(".saveBox");
let toastDiv = null;
let presetArray = [
  "#E18816",
  "#DDDEEE",
  "#7A0AF0",
  "#BD1E97",
  "#E10000",
  "#000016",
  "#303330",
  "#Eddd16",
];
let saveColorArray = new Array(24);

window.onload = () => {
  main();
  displayPreset(presetColorContainer, presetArray);
  colors = localStorage.getItem("data-color");
  if (colors) {
    saveColorArray = JSON.parse(colors);
    displayPreset(saveContainer, saveColorArray);
  }
};

function main() {
  colorChangeBtn.addEventListener("click", colorChangeBtnHandler);
  hexInput.addEventListener("keyup", hexInputHandler);
  rgbInput.addEventListener("keyup", rgbInputHandler);
  copyBtn.addEventListener("click", copyBtnHandler);
  redRange.addEventListener("change", rangeInputHandler);
  greenRange.addEventListener("change", rangeInputHandler);
  blueRange.addEventListener("change", rangeInputHandler);
  presetColorContainer.addEventListener("click", CopyColorContainer);
  saveContainer.addEventListener("click", CopyColorContainer);
  saveBtn.addEventListener("click", colorSaveBtnHandler);
}

// this function handle click event for color change button
function colorChangeBtnHandler() {
  let color = rgbCode();
  updateDom(color);
}

// this function update hex input updates
function hexInputHandler(e) {
  if (hexValidation(e.target.value)) {
    let color = hexToRgb(e.target.value);
    updateDom(color);
  }
}
// this function update rgb input updates
function rgbInputHandler(e) {
  if (rgbValidation(e.target.value)) {
    let color = rgbColorToRgbCode(e.target.value);
    updateDom(color);
  }
}
// range input Handler
function rangeInputHandler() {
  let red = parseInt(redRange.value);
  let green = parseInt(greenRange.value);
  let blue = parseInt(blueRange.value);
  let color = {
    red,
    green,
    blue,
  };
  updateDom(color);
}
// this function find preset box and copy color
function CopyColorContainer(e) {
  if (toastDiv !== null) {
    toastDiv.remove();
    toastDiv = null;
  }
  if (e.target.className === "preset") {
    let color = e.target.getAttribute("data-color");
    navigator.clipboard.writeText(color);
    toastMsg(`Copped ${color}`);
  }
}
// this function save color in array and save it in local storage
function colorSaveBtnHandler() {
  if (toastDiv !== null) {
    toastDiv.remove();
    toastDiv = null;
  }
  let color = hexInput.value;
  if (saveColorArray.includes(color)) {
    toastMsg(`color already saved`);
    return;
  }
  saveColorArray.unshift(color);
  if (saveColorArray.length > 24) {
    saveColorArray = saveColorArray.slice(0, 24);
  }
  localStorage.setItem("data-color", JSON.stringify(saveColorArray));
  removeChild(saveContainer);
  displayPreset(saveContainer, saveColorArray);
}
/**
 * this function update all dom html test
 * @param {object} color
 */
function updateDom(color) {
  let { red, green, blue } = color;
  let hexColorValue = hexGenerator({ red, green, blue });
  let rgbColorValue = rgbGenerator({ red, green, blue });
  document.body.style.background = hexColorValue;
  colorShowBox.style.background = hexColorValue;
  hexInput.value = hexColorValue;
  rgbInput.value = rgbColorValue;
  redRange.value = red;
  greenRange.value = green;
  blueRange.value = blue;
  rangeTextRed.innerHTML = red;
  rangeTextGreen.innerHTML = green;
  rangeTextBlue.innerHTML = blue;
}

/**
 * This function generate rgb code
 * @returns {object}
 */
function rgbCode() {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let rgb = { red, green, blue };
  return rgb;
}
/**
 * this function convert rgb to hex code
 * @param {object} rgb
 * @returns {string}
 */
function hexGenerator(rgb) {
  let { red, green, blue } = rgb;
  let getCode = (value) => {
    let code = value.toString(16);
    return code.length === 1 ? `0${code}` : code;
  };
  return `#${getCode(red)}${getCode(green)}${getCode(blue)}`.toUpperCase();
}

/**
 * this function convert rgb to rgb color
 * @param {object} rgb
 * @returns {string}
 */
function rgbGenerator(rgb) {
  let { red, green, blue } = rgb;
  return `rgb(${red},${green},${blue})`;
}
/**
 * this function check hex code valid to not
 * @param {string} color
 * @returns {boolean}
 */
function hexValidation(color) {
  const regex = /#?([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/g;
  return regex.test(color);
}
/**
 * This function can check rgb color valid or not
 * @param {string} color
 * @returns {boolean}
 */
function rgbValidation(color) {
  const code =
    /^rgb\(\s*(1?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*\,\s*(1?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*\,\s*(1?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*\)/;

  return code.test(color);
}

/**
 * this function convert hex code to rgb number
 * @param {string} color
 * @returns {object}
 */

function hexToRgb(color) {
  let hex = color;
  if (color[0] === "#") {
    hex = hex.replace("#", "");
  }
  let red = parseInt(hex.slice(0, 2), 16);
  let green = parseInt(hex.slice(2, 4), 16);
  let blue = parseInt(hex.slice(4, 6), 16);
  return (rgb = {
    red,
    green,
    blue,
  });
}

/**
 * this function convert rgb string to number
 * @param {string} color
 */
function rgbColorToRgbCode(color) {
  let code = color.match(/\(([^)]+)\)/)[1];
  let rgbCode = code.split(",");
  let red = parseInt(rgbCode[0]);
  let green = parseInt(rgbCode[1]);
  let blue = parseInt(rgbCode[2]);
  let rgb = { red, green, blue };
  return rgb;
}

/**
 * this function create toast mag
 * @param {string} msg
 */
function toastMsg(msg) {
  toastDiv = document.createElement("toastDiv");
  toastDiv.innerText = msg;
  toastDiv.addEventListener("click", removeToastDiv);
  toastDiv.classList.add("toast", "toastAnimationStart");
  document.body.appendChild(toastDiv);
}

// this function remove toastDiv
function removeToastDiv() {
  toastDiv.classList.remove("toastAnimationStart");
  toastDiv.classList.add("toastAnimationEnd");
  toastDiv.addEventListener("animationend", function () {
    toastDiv.remove();
    toastDiv = null;
  });
}
function copyMode(mode) {
  let checkedValue = null;
  for (let i = 0; i < mode.length; i++) {
    if (mode[i].checked) {
      checkedValue = mode[i].value;
      break;
    }
  }
  return checkedValue;
}

// copyBtn handler
function copyBtnHandler() {
  if (toastDiv !== null) {
    toastDiv.remove();
    toastDiv = null;
  }
  if (copyMode(radioCopyMode) === "hex") {
    let hexValue = hexInput.value;
    if (hexValidation(hexValue)) {
      navigator.clipboard.writeText(hexValue);
      toastMsg(`Copped ${hexValue}`);
    } else {
      toastMsg("Invalid Color Code");
    }
  } else {
    let color = rgbInput.value;
    if (rgbValidation(color)) {
      navigator.clipboard.writeText(color);
      toastMsg(`Copped ${color}`);
    } else {
      toastMsg("Invalid Color Code");
    }
  }
}
/**
 * create Preset div and add background color
 * @param {string} color
 * @returns {object}
 */
function createDiv(color) {
  let div = document.createElement("div");
  div.classList.add("preset");
  div.style.background = color;
  div.setAttribute("data-color", color);
  return div;
}
/**
 * create new div and append to parent
 * @param {object} parent
 * @param {Array} colors
 */
function displayPreset(parent, colors) {
  colors.forEach((color) => {
    if (color) {
      let presetBox = createDiv(color);
      parent.appendChild(presetBox);
    }
  });
}
/**
 * remove dom all element child
 * @param {object} parentNode
 */
function removeChild(parentNode) {
  let child = parentNode.lastElementChild;
  while (child) {
    parentNode.removeChild(child);
    child = parentNode.lastElementChild;
  }
}
