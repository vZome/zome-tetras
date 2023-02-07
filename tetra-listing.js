import models from './tetra-challenge-models.json' assert { type: 'json' };

let selectedRow;

const table = document.getElementById( "partsTable" );
const tbody = table.createTBody();
for (const tetra of models) {
    const id = tetra.id;
    const url = tetra.url;
    const chiral = (tetra.chiral === "true");
    const tr = tbody.insertRow();
    fillRow(tr, tetra);
    tr.addEventListener("click",
        function (event) { 
            if(url) {
                switchModel(url);
            } else {
                alert("Tetrahedron #" + id + " is not available.\n\nPlease help us collect the full set.");
            }
            if ( selectedRow ) selectedRow.className = "";
            selectedRow = tr;
            selectedRow.className = "selected";
            const index = document.getElementById( "index" );
            index.textContent = id;
        }
    );
}

function fillRow(tr, tetra) {
  const id = tetra.id;
  const url = tetra.url;
  const chiral = (tetra.chiral === "true");
  if(!tr.id) {
    tr.id = "tetra-" + id;
  }
  tr.setAttribute("data-id", id);
  // Id column
  let td = tr.insertCell();
  td.className = url ? "ident done" : "ident todo";
  if(chiral) {
    td.className += " chiral";
  }
  td.innerHTML = id;
  // Balls column
  td = tr.insertCell();
  const ballsTd = td; // populate later
  // strut columns
  let nStruts = listStrutsByColor(tr, tetra.blu, "blu");
  nStruts += listStrutsByColor(tr, tetra.yel, "yel");
  nStruts += listStrutsByColor(tr, tetra.red, "red");
  // The number of balls is not in the json data. 
  // It is calculated from the number of struts 
  // and also serves as a simplistic checksum
  // using Euler's formula as applied to tetrahedra: 
  //   F + V = E + 2
  // Where F = 4, E = nStruts and V = the number of balls shown.
  ballsTd.innerHTML = nStruts - 2;
}

function listStrutsByColor(tr, strutCounts, color) {
    let nStruts = 0;
    for(let i = 0; i < 3; i++) {
        const td = tr.insertCell();
        td.className = color;
        const num = strutCounts[i];
        if(num != 0) {
            td.innerHTML = num;
            nStruts += num;
        }
    }
    return nStruts;
}

function switchModel( url ) {
  const viewer = document.getElementById( "viewer" );
  viewer.src = url;
}
