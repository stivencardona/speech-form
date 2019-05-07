let commands = {
  siguiente: function() {
    inputGlobal = nextId[inputGlobal];
    document.getElementById(inputGlobal).focus();
    codAvaible = false;
    turnOffCode();
  },
  anterior: function() {
    inputGlobal = previousId[inputGlobal];
    document.getElementById(inputGlobal).focus();
    codAvaible = false;
    turnOffCode();
  },
  eliminar: function() {
    if (recAvaible) document.getElementById(inputGlobal).value = "";
  },
  corregir: function() {
    let arrayFields = document.getElementById(inputGlobal).value.split(" ");
    arrayFields.pop();
    document.getElementById(inputGlobal).value = "";
    if (recAvaible) deploy(arrayFields.join(" "));
  },
  grabar: function() {
    recAvaible = true;
    turnOnRec();
  },
  nuevo: function() {
    let erase = confirm("¿Desea eliminar todos los campos?");
    if (erase) {
      formValues.forEach(e => {
        document.getElementById(e.id).value = "";
      });
      document.getElementById("box").focus();
      inputGlobal = "box";
      recAvaible = false;
      turnOffRec();
      turnOffCode();
    }
  },
  codigo: function() {
    codAvaible = true;
    turnOnCode();
  },
  normal: function() {
    codAvaible = false;
    turnOffCode();
  },
  pausa: function() {
    recAvaible = false;
    turnOffRec();
  },
  descargar: function() {
    document.getElementById("download-csv").click();
  }
};

let months = {
  enero: "01",
  febrero: "02",
  marzo: "03",
  abril: "04",
  mayo: "05",
  junio: "06",
  julio: "07",
  agosto: "08",
  septiembre: "09",
  octubre: "10",
  noviembre: "11",
  diciembre: "12"
};

function normalize(str) {
  let ret = [];
  let from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÇç&",
    to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuucci",
    dict = {};
  for (let i = 0; i < from.length; i++) dict[from[i]] = to[i];
  for (let i = 0; i < str.length; i++) {
    ret.push(dict[str[i]] != undefined ? dict[str[i]] : str[i]);
  }
  let strRet = ret.join("");
  return strRet;
}

function toastAlert(message) {
  M.toast({ html: `Has dicho ${message}`, classes: "rounded" });
}

function filterCode(dateToProcess) {
  let str = new String(dateToProcess);
  let words = str.split(" ");
  let response = [];
  words.forEach(w => {
    if (isNaN(parseInt(w))) response.push(w[0]);
    else response.push(w);
  });
  console.log(response.join(""));
  return response.join("");
}

function filterDate(dateToProcess) {
  let str = new String(dateToProcess);
  let words = str.split(" ");
  let dd = "";
  let mm = "";
  let aaaa = "";
  words.forEach(w => {
    let num = parseInt(w);
    dd =
      !isNaN(num) && num < 32 && dd == ""
        ? num < 10
          ? "0" + num.toString()
          : num.toString()
        : dd;
    mm =
      isNaN(num) && months[w] != undefined
        ? months[w]
        : !isNaN(num) && num < 13
        ? num < 10
          ? "0" + num.toString()
          : num.toString()
        : mm;
    aaaa = !isNaN(num) && num > 1000 ? num.toString() : aaaa;
  });
  let date = dd + "/" + mm + "/" + aaaa;
  console.log(date);
  return date;
}

// filter comma

function filterCommand(message) {
  if (commands[message] != undefined) {
    commands[message]();
    toastAlert(message);
  } else if (recAvaible) {
    if (codAvaible) message = filterCode(message);
    deploy(message);
  }
}

// deploy of message of input

function deploy(message) {
  let input = document.getElementById(inputGlobal);
  let val =
    inputGlobal == "fromdate" || inputGlobal == "todate"
      ? filterDate(message.toLowerCase())
      : message;
  input.value +=
    input.value != "" ? " " + val.toUpperCase() : val.toUpperCase();
}
