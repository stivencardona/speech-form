let inputGlobal = "box";
let recAvaible = false;
let codAvaible = false;
let csvFile = [];

// mapping and description of values of input fields and nextid to auto focus
let nextId = {
  box: "idfolder",
  idfolder: "account",
  account: "alternatecode",
  alternatecode: "description",
  description: "user1",
  user1: "user2",
  user2: "user3",
  user3: "user4",
  user4: "secuencebegin",
  secuencebegin: "secuenceend",
  secuenceend: "fromdate",
  fromdate: "todate",
  todate: "setname",
  setname: "box"
};
// mapping and description of values of input fields and nextid to auto focus
let previousId = {
  idfolder: "box",
  account: "idfolder",
  alternatecode: "account",
  description: "alternatecode",
  user1: "description",
  user2: "user1",
  user3: "user2",
  user4: "user3",
  secuencebegin: "user4",
  secuenceend: "secuencebegin",
  fromdate: "secuenceend",
  todate: "fromdate",
  setname: "todate",
  box: "setname"
};

let formValues = [
  {
    id: "box",
    name: "CAJA",
    propierties: [
      { name: "maxlength", value: 7 },
      { name: "minlength", value: 7 }
    ]
  },
  {
    id: "idfolder",
    name: "IDFOLDER",
    propierties: [
      { name: "maxlength", value: 13 },
      { name: "minlength", value: 13 }
    ]
  },
  {
    id: "account",
    name: "ACCOUNT",
    propierties: [{ name: "minlength", value: 3 }]
  },
  { id: "alternatecode", name: "ALTERNATECODE", propierties: [] },
  {
    id: "description",
    name: "DESCRIPTION",
    propierties: [
      {
        name: "pattern",
        value: "[A-Za-z0-9]{7,8}"
      }
    ]
  },
  { id: "user1", name: "USER1", propierties: [] },
  { id: "user2", name: "USER2", propierties: [] },
  { id: "user3", name: "USER3", propierties: [] },
  { id: "user4", name: "USER4", propierties: [] },
  { id: "secuencebegin", name: "SECUENCEBEGIN", propierties: [] },
  { id: "secuenceend", name: "SECUENCEEND", propierties: [] },
  { id: "fromdate", name: "FROMDATE", propierties: [] },
  { id: "todate", name: "TODATE", propierties: [] },
  { id: "setname", name: "SETNAME", propierties: [] }
];

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".tooltipped");
  var instances = M.Tooltip.init(elems);
});

let render = document.getElementById("render");

// render inputs and labels of form

formValues.forEach(e => {
  let props = "";
  e.propierties.forEach(p => {
    props = props + ` ${p.name}="${p.value}" `;
  });
  const newField = `<div class="row">
    <div class="col s3"></div>
    <div class="col s6">
      <label class="name-field" id="label-${e.id}" >${e.name}</label>
      <input class="value-field" type="text" id="${e.id}" onclick="setId('${
    e.id
  }')" ${props}/>
    </div>
  </div>`;
  render.insertAdjacentHTML("beforeend", newField);
});

document.getElementById(inputGlobal).focus();

// function that set the next message

function setNext() {
  inputGlobal = nextId[inputGlobal];
  document.getElementById(inputGlobal).focus();
}

function setPrevious() {
  inputGlobal = previousId[inputGlobal];
  document.getElementById(inputGlobal).focus();
}

// function that set id for inputGlobal

function setId(id) {
  let message = document.getElementById("label-" + id).textContent;
  M.toast({ html: `Has seleccionado el campo ${message}`, classes: "rounded" });
  inputGlobal = id;
  document.getElementById(inputGlobal).focus();
}

// function that crete a new link for the download of csv file

function downloadCSV(csv, filename) {
  let csvFileToDownload;
  let downloadLink = document.createElement("a");
  csvFileToDownload = new Blob([csv], { type: "text/csv" });
  downloadLink.href = window.URL.createObjectURL(csvFileToDownload);
  downloadLink.download = filename;
  downloadLink.click();
}

// function that convert the fields of form in a csv file
function headerFields() {
  let names = document.getElementsByClassName("name-field");
  let fields = [];
  for (let i = 0; i < names.length; i++) fields.push(names[i].textContent);
  csvFile.push(fields.join(","));
}

headerFields();

function exportHtmlToCSV() {
  let row = [];
  let values = document.getElementsByClassName("value-field");
  for (let i = 0; i < values.length; i++) row.push(values[i].value);
  let state = true;
  csvFile.forEach(e => {
    state = state && e != row.join(",");
  });
  if (state) csvFile.push(row.join(","));
}

function turnOnRec() {
  let label = document.getElementById("rec");
  let icon = document.getElementById("icon-rec");
  icon.textContent = "mic";
  let classContent =
    "record btn-floating btn-large waves-effect waves-light red";
  label.className = classContent;
}

function turnOffRec() {
  let label = document.getElementById("rec");
  let icon = document.getElementById("icon-rec");
  icon.textContent = "mic_off";
  let classContent =
    "record btn-floating btn-large waves-effect waves-light grey";
  label.className = classContent;
}

function turnOnCode() {
  let label = document.getElementById("code");
  let icon = document.getElementById("icon-code");
  icon.textContent = "link";
  let classContent =
    "record btn-floating btn-large waves-effect waves-light red";
  label.className = classContent;
}

function turnOffCode() {
  let label = document.getElementById("code");
  let icon = document.getElementById("icon-code");
  icon.textContent = "link_off";
  let classContent =
    "record btn-floating btn-large waves-effect waves-light grey";
  label.className = classContent;
}
