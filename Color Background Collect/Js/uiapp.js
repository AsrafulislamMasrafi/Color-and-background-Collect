const clickbtn = document.getElementById("clickbtn");
const input = document.getElementById("HexInput");
const copyBtn = document.getElementById("copy");
const rgbInput = document.getElementById("rgbInput");
const rgbCopy = document.getElementById("rgbCopy");
const colorPed = document.getElementById("colorPed");
const Hex = document.getElementById("hex");
const RGB = document.getElementById("rgb");
const redRange = document.getElementById("red");
const greenRange = document.getElementById("green");
const blueRange = document.getElementById("blue");
const redLabel = document.getElementById("redLabel");
const greenLabel = document.getElementById("greenLabel");
const blueLabel = document.getElementById("blueLabel");
const CopyRadios = document.getElementsByName("colorType");
const presetColorDiv = document.getElementById("presetColorDiv");
const saveBtn = document.getElementById("save");
const saveColorDiv = document.getElementById("saveColorDiv");
const selectBackgroundStyle = document.getElementById("selectBackgroundStyle");
const ImagePreview = document.getElementById("imgField");
const fileChoose = document.getElementById("fileChoose");
const imgInputDiv = document.getElementById("imgInput");
const delateButton = document.createElement("button");

let div = null;

const defaultColor = [
  "#DFDEEF",
  "#53BF6C",
  "#539BE4",
  "#ffe16a",
  "#A5A967",
  "#BB1C3B",
  "#D39325",
  "#7947D9",
  "#B67F90",
  "#9FDB25",
  "#124E6F",
  "#E17340",
  "#28F482",
  "#B72D63",
  "#F9F6A4",
  "#4EF076",
  "#2280F1",
  "#CAED3A",
  "#000000",
  "#00000e",
];

let saveColorArr = new Array(24);

window.onload = () => {
  main();
  displayColorBox(presetColorDiv, defaultColor);

  const SaveColors = localStorage.getItem("save-color");
  if (SaveColors) {
    saveColorArr = JSON.parse(SaveColors);
    displayColorBox(saveColorDiv, saveColorArr);
  }
};

function main() {
  // Change Background color Function
  clickbtn.addEventListener("click", function () {
    let color = ColorGenerator();
    updateColor(color);
  });

  // range input handle
  redRange.addEventListener(
    "change",
    RangeColorInputHandle(redRange, greenRange, blueRange)
  );
  greenRange.addEventListener(
    "change",
    RangeColorInputHandle(redRange, greenRange, blueRange)
  );
  blueRange.addEventListener(
    "change",
    RangeColorInputHandle(redRange, greenRange, blueRange)
  );

  // input Handler
  input.addEventListener("keyup", function (e) {
    InputHandle(e);
  });

  // Hex copy
  copyBtn.addEventListener("click", function () {
    copyBtnHandler();
  });

  // PreSet Color Handle
  presetColorDiv.addEventListener("click", function (e) {
    presetColor(e);
  });

  // Display Background Style Add

  document
    .getElementById("backgroundRepeat")
    .addEventListener("change", ChangeStyle);
  document
    .getElementById("backgroundSize")
    .addEventListener("change", ChangeStyle);
  document
    .getElementById("backgroundPosition")
    .addEventListener("change", ChangeStyle);

  // Background Set
  fileChoose.addEventListener("change", function (e) {
    ImageFileChoose(e);
  });

  // Delete Background image
  delateButton.addEventListener("click", backgroundDelete);

  // Save Color

  saveBtn.addEventListener("click", saveBtnHandler);

  // Save Color Color Copy
  saveColorDiv.addEventListener("click", function (e) {
    CopySaveColors(e);
  });
}

// Color Generator
function ColorGenerator() {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);

  return {
    red,
    green,
    blue,
  };
}
// Update color
function updateColor(color) {
  let HexColor = generateHexColor(color).toUpperCase();
  colorPed.style.background = HexColor;
  rgbInput.value = generatorRgbColor(color);
  input.value = HexColor.substring(1);
  redRange.value = color.red;
  greenRange.value = color.green;
  blueRange.value = color.blue;
  redLabel.innerText = color.red;
  greenLabel.innerText = color.green;
  blueLabel.innerText = color.blue;
}

// rgb Color Generator
function generatorRgbColor({ red, green, blue }) {
  return `rgb(${red},${green},${blue})`;
}

// Hex Color Generator
function generateHexColor({ red, green, blue }) {
  return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}

// hexValidator function
function hexValidator(color) {
  if (color.length !== 6) return false;
  return /^[0-9A-Fa-f]{6}$/i.test(color);
}

// Hex to rgb convert
function covertHexToRgb(Hex) {
  let red = parseInt(Hex.slice(0, 2), 16);
  let green = parseInt(Hex.slice(2, 4), 16);
  let blue = parseInt(Hex.slice(4), 16);

  return {
    red,
    green,
    blue,
  };
}

// toastMassage function
function toastMassage(text) {
  div = document.createElement("div");
  div.innerText = text;
  div.className = "toastMsg toastAnimationIn";

  div.addEventListener("click", function () {
    div.classList.remove("toastAnimationIn");
    div.classList.add("toastAnimationOut");
    div.addEventListener("animationend", function () {
      div.remove();
      div = null;
    });
  });

  document.body.appendChild(div);
}

//
function RangeColorInputHandle(redRange, greenRange, blueRange) {
  return function () {
    color = {
      red: parseInt(redRange.value),
      green: parseInt(greenRange.value),
      blue: parseInt(blueRange.value),
    };
    updateColor(color);
  };
}

// radio button handler
function RadioChecked(nodes) {
  let checkedValue = null;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      checkedValue = nodes[i].value;
      break;
    }
  }
  return checkedValue;
}
// Preset Function
function generateColorBox(color) {
  let presetColor = document.createElement("div");
  presetColor.className = "presetColor";
  presetColor.style.background = color;
  presetColor.setAttribute("data-color", color);

  return presetColor;
}

// Create Div for display preset function
function displayColorBox(parent, colors) {
  colors.forEach((colors) => {
    if (colors) {
      const colorBox = generateColorBox(colors);
      parent.appendChild(colorBox);
    }
  });
}

function CopySaveColors(e) {
  if (div !== null) {
    div.remove();
    div = null;
  }
  if (e.target.className === "presetColor") {
    let color = e.target.getAttribute("data-color");
    navigator.clipboard.writeText(color);
    toastMassage(`Copped ${color}`);
  }
}
// remove Child from Array

function removeChildren(parent) {
  let Child = parent.lastElementChild;
  while (Child) {
    parent.removeChild(Child);
    Child = parent.lastElementChild;
  }
}

function StyleAdd(className, styleName) {
  className.style.backgroundRepeat = styleName;
  className.style.backgroundSize = styleName;
  className.style.backgroundPosition = styleName;
}
function ChangeStyle() {
  document.body.style.backgroundRepeat =
    document.getElementById("backgroundRepeat").value;
  document.body.style.backgroundSize =
    document.getElementById("backgroundSize").value;
  document.body.style.backgroundPosition =
    document.getElementById("backgroundPosition").value;
}

function saveBtnHandler() {
  if (div !== null) {
    div.remove();
    div = null;
  }
  let Color = `#${input.value}`;

  if (saveColorArr.includes(Color)) {
    toastMassage("Color Already Saved");
    return;
  }
  saveColorArr.unshift(Color);
  if (saveColorArr.length > 24) {
    saveColorArr = saveColorArr.slice(0, 24);
  }
  localStorage.setItem("save-color", JSON.stringify(saveColorArr));

  removeChildren(saveColorDiv);
  displayColorBox(saveColorDiv, saveColorArr);
}

function ImageFileChoose(e) {
  const img = e.target.files[0];
  const imgUrl = URL.createObjectURL(img);
  document.body.style.background = `url(${imgUrl})`;
  ImagePreview.style.background = `url(${imgUrl})`;

  StyleAdd(ImagePreview);
  StyleAdd(document.body);
  delateButton.innerHTML = "Delete";
  delateButton.style.transform = "translateX(200px)";
  selectBackgroundStyle.style.display = "block";
  imgInputDiv.appendChild(delateButton);
}

function backgroundDelete() {
  document.body.style.background = `#dfdeef`;
  ImagePreview.style.background = `#ffe16a`;
  fileChoose.value = null;
  delateButton.style.display = "none";
  selectBackgroundStyle.style.display = "none";
}

function presetColor(e) {
  if (div !== null) {
    div.remove();
    div = null;
  }
  if (e.target.className === "presetColor") {
    let color = e.target.getAttribute("data-color");
    navigator.clipboard.writeText(color);
    toastMassage(`Copped ${color}`);
  }
}

function InputHandle(e) {
  const color = e.target.value;
  if (color && hexValidator(color)) {
    colorPed.style.background = `#${color}`;
    rgbInput.value = `rgb(${covertHexToRgb(color).red},${
      covertHexToRgb(color).green
    },${covertHexToRgb(color).blue})`;
    redLabel.innerText = covertHexToRgb(color).red;
    greenLabel.innerText = covertHexToRgb(color).green;
    blueLabel.innerText = covertHexToRgb(color).blue;
  }
}

function copyBtnHandler() {
  let result = RadioChecked(CopyRadios);
  if (div !== null) {
    div.remove();
    div = null;
  }
  if (result === "hex") {
    let color = input.value;
    if (hexValidator(color)) {
      navigator.clipboard.writeText(`#${input.value}`);
      toastMassage(`Copped #${input.value}`);
    } else {
      toastMassage(`${input.value} is not valid color code `);
    }
  } else if (result === "rgb") {
    navigator.clipboard.writeText(`${rgbInput.value}`);
    toastMassage(`Copped ${rgbInput.value}`);
  }
}
