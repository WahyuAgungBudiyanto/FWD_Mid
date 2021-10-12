/* array save faculty + programStudy */
const faculties = {
  1: ["Magister Manajemen", "Magister Teologi"],
  2: ["Ilmu Filsafat"],
  3: ["Pendidikan Agama", "Pendidikan Bahasa Inggris", "Pendidikan Ekonomi", "Pendidikan Luar Sekolah"],
  4: ["Akuntansi", "Manejemen"],
  5: ["Agroteknologi"],
  6: ["Informatika", "Sistem Informasi"],
  7: ["Profesi Ners", "Keperawatan"],
  8: ["Sekretari D3"],
};

//creating variables to save ID elements
let facultySelection = document.querySelector("#faculty");
let prodiSelection = document.querySelector("#pStudy");

//Select dependencies
facultySelection.addEventListener("change", (e) => {
  const val = e.target.value;

  let prodies = faculties[val];

  if (!prodies) {
    return (prodiSelection.innerHTML = `<option value="0">-- SELECT PROGRAM STUDY --</option>`);
  }
  prodiSelection.innerHTML = prodies.map((p) => `<option value="${p}">${p}</option>`).join("");
});

//creating variables to save ID element
const showHide = document.querySelector("#show-hide-btn");
const form = document.querySelector("#addStudent");
const table = document.querySelector("table");

/* Show / Hide Form with Button */
showHide.addEventListener("click", toggleShowHide);

//When mouse click the button, it will run this function
function toggleShowHide(e) {
  //if display of the form style is none / hide, it will show the form and change the button text
  if (form.style.display == "none") {
    form.style.display = "block";
    showHide.textContent = "Hide Forms Add New Student";
    //if display of the form style other than none, it will hide the form and change the button text
  } else {
    form.style.display = "none";
    showHide.textContent = "Show Forms Add New Student";
  }
}

/* Add Student */
form.addEventListener("submit", addStudent);

function addStudent(e) {
  //get data input
  let nim = document.querySelector("#studentId").value;
  let fullName = document.querySelector("#studentName").value;
  let gender = document.querySelector("input[name=gender]:checked");
  let faculty = document.querySelector("#faculty").options[document.querySelector("#faculty").selectedIndex];
  let prodi = document.querySelector("#pStudy").options[document.querySelector("#pStudy").selectedIndex];

  if (!nim) {
    alert("Please enter your NIM");
  } else if (!fullName) {
    alert("Please enter your Full Name");
  } else if (!gender) {
    alert("Please choose your Gender");
  } else if (!faculty.value) {
    alert("Please choose your Faculty");
  } else if (!prodi.value) {
    alert("Please choose your Program of Study");
  } else {
    let aRow = confirm(`Are you sure to add ${fullName}?`);
    if (aRow) {
      gender = gender.value;
      faculty = faculty.textContent;
      prodi = prodi.textContent;
      let template = `
                    <tr>
                      <td class="py-3">${nim}</td>
                      <td class="py-3">${fullName}</td>
                      <td class="py-3">${gender}</td>
                      <td class="py-3">${faculty}</td>
                      <td class="py-3">${prodi}</td>
                      <td><button class="btn btn-danger btn-md ms-1 rounded-2" onclick="removeRow(this)" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button></td>
                    </tr>`;

      table.querySelector("tbody").innerHTML += template;
    } else {
      alert("cancelled!");
    }
  }
}

/* Delete row */
function removeRow(event) {
  let p = event.parentNode.parentNode;
  fullName = p.querySelector("td:nth-child(2)").textContent;
  let rRow = confirm(`Are you sure to delete ${fullName}?`);
  if (rRow) {
    p.parentNode.removeChild(p);
    alert(`${fullName} has been removed!`);
  } else {
    alert("cancelled!");
  }
}

/* Search data by fullName */
let searchBox = document.querySelector("#search");

searchBox.addEventListener("keyup", function (e) {
  let rows = document.querySelectorAll("tbody tr");
  const fetch = e.target.value.toLowerCase();
  rows.forEach((row) => {
    row.querySelector("td:nth-child(2)").textContent.toLowerCase().includes(fetch) ? (row.style.display = "") : (row.style.display = "none");
  });
});

// filter by faculty
function facultyS() {
  let rows = document.querySelectorAll("tbody tr");
  let facultySelect = document.querySelector("#select_by_faculty");
  const fetch = facultySelect.value.toLowerCase();
  rows.forEach((row) => {
    row.querySelector("td:nth-child(4)").textContent.toLowerCase().includes(fetch) ? (row.style.display = "") : (row.style.display = "none");
  });
}
// filter by program study
function prodiS() {
  let rows = document.querySelectorAll("tbody tr");
  let prodiSelect = document.querySelector("#filter_by_pStudy");
  const fetch = prodiSelect.value.toLowerCase();
  rows.forEach((row) => {
    row.querySelector("td:nth-child(5)").textContent.toLowerCase().includes(fetch) ? (row.style.display = "") : (row.style.display = "none");
  });
}
