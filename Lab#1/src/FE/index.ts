const requestURL: string = 'http://localhost:3000/api/v1/employee/';

interface Employee {
  id: number;
  name: string;
}

function fetchEmployees(): void {
  fetch(requestURL)
    .then((response) => response.json())
    .then((data: { data: Employee[] }) => {
      const tableBody = document.getElementById('dataTable') as HTMLTableSectionElement;
      tableBody.innerHTML = '';
      const list = data.data;

      list.forEach((item) => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = item.id.toString();
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener('click', deleteEmployee);
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell);
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error(error));
}

const submitButton = document.getElementsByClassName('btn-primary')[0] as HTMLButtonElement;
submitButton.addEventListener('click', createEmployee);

function createEmployee(): void {
  const employeeName = (document.getElementById('name') as HTMLInputElement).value;
  const employeeId = (document.getElementById('id') as HTMLInputElement).value;

  if (!employeeName) {
    alert('Please enter the employee name');
    window.location.reload();
    return;
  }
  if (!employeeId) {
    alert('Please enter the employee id');
    window.location.reload();
    return;
  }

  fetch(requestURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      employeeName,
      employeeId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      fetchEmployees();
    })
    .catch((err) => console.log(err));
}

function deleteEmployee(event: Event): void {
  const btn = event.target as HTMLButtonElement;
  const employeeId = +btn.parentNode!.parentNode!.children[0].textContent!;

  fetch(requestURL + `${employeeId}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      fetchEmployees();
    })
    .catch((err) => console.log(err));
}

fetchEmployees();
