var pdfreader = require('pdfreader');
var fs = require('fs');
var rows = {};

var data = "";

function printRow(y) {
    textLine = (rows[y] || []).join('')
    data += textLine;
    data += '\n'
}

function printRows() {
  Object.keys(rows)
    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2))
    .forEach(printRow);
}

new pdfreader.PdfReader().parseFileItems('texto.pdf', function(err, item){
  if (err)
    console.error(err);
  else if (!item || item.page) {
    
    printRows();

    rows = {};
    
    console.log(data);

    fs.writeFile('./arquivo.txt', data , function(erro) {
        if(erro) {
            throw erro;
        }
        console.log("Arquivo salvo");
    }); 
  }
  else if (item.text) {
    (rows[item.y] = rows[item.y] || []).push(item.text);
  }
});

