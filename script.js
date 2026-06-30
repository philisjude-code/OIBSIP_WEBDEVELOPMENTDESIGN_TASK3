// just grabbing the elements we need once so we don't keep re-querying
const degInput = document.getElementById("degInput");
const typeSelect = document.getElementById("typeSelect");
const toSelect = document.getElementById("toSelect");
const resultBox = document.getElementById("result");
const errorBox = document.getElementById("errorMsg");

function convertTemp() {
  errorBox.textContent = "";
  const raw = degInput.value.trim();

  // check its actually a number before doing math on it
  if (raw === "" || isNaN(raw)) {
    errorBox.textContent = "Please enter a valid number.";
    resultBox.textContent = "--";
    return;
  }

  const value = parseFloat(raw);
  const from = typeSelect.value;
  const to = toSelect.value;

  // step 1: convert whatever input we got into celsius as a common base
  let celsius;
  if (from === "C") {
    celsius = value;
  } else if (from === "F") {
    celsius = (value - 32) * 5 / 9;
  } else { // kelvin
    celsius = value - 273.15;
  }

  // step 2: from celsius go to whatever the user wants
  let output;
  let unitLabel;
  if (to === "C") {
    output = celsius;
    unitLabel = "°C";
  } else if (to === "F") {
    output = (celsius * 9 / 5) + 32;
    unitLabel = "°F";
  } else {
    output = celsius + 273.15;
    unitLabel = "K";
  }

  // small sanity check for kelvin (cant go below absolute zero)
  if (to === "K" && output < 0) {
    errorBox.textContent = "That temperature is below absolute zero!";
    resultBox.textContent = "--";
    return;
  }

  resultBox.textContent = output.toFixed(2) + " " + unitLabel;
}