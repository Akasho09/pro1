let studentId = 1; // Starting ID for new students
function showForm() {
    document.getElementById("addStudentForm").style.display = "block";
}
function addStudent(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.elements["name"].value;
  const age = form.elements["age"].value;
  const grade = form.elements["grade"].value;

  // connection.query("select * from client_master ", function (error, result) 
  const table = document.getElementById("studentTable").getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();
  newRow.innerHTML = `<td>${studentId}</td><td>${name}</td><td>${age}</td><td>${grade}</td>`;
  studentId++;
  form.reset();
}
document.getElementById("studentForm").addEventListener("submit", addStudent);
