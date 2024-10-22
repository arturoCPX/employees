let editingEmployeeId = null; // Variable para guardar el ID del empleado en modo edición

// Función que se ejecuta al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    loadEmployees(); // Cargar empleados al iniciar
});

// Manejar el formulario de agregar o actualizar empleado
document.getElementById('addEmployeeForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let gender = document.getElementById('gender').value;
    let date = document.getElementById('date').value;

    let formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('date', date);

    // Si estamos editando un empleado, actualizar los datos; de lo contrario, agregar un nuevo empleado
    if (editingEmployeeId) {
        formData.append('id', editingEmployeeId);
        fetch('update_employee.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Empleado actualizado correctamente');
                resetForm();
                loadEmployees(); // Recargar empleados después de la actualización
            } else {
                alert('Error al actualizar empleado');
            }
        });
    } else {
        fetch('add_employee.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Empleado agregado correctamente');
                resetForm();
                loadEmployees(); // Recargar empleados después de agregar
            } else {
                alert('Error al agregar empleado');
            }
        });
    }
});

// Función para restablecer el formulario
function resetForm() {
    document.getElementById('addEmployeeForm').reset();
    editingEmployeeId = null; 
}

// Cargar empleados y mostrarlos en la tabla
function loadEmployees() {
    fetch('get_employees.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayEmployees(data.employees);
            } else {
                document.getElementById('showEmployees').innerHTML = 'No se encontraron empleados.';
            }
        });
}

// Función para mostrar empleados en una tabla
function displayEmployees(employees) {
    let tableHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Género</th>
                    <th>Fecha de Ingreso</th>
                </tr>
            </thead>
            <tbody>`;
    
    employees.forEach(employee => {
        tableHTML += `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.age}</td>
                <td>${employee.gender}</td>
                <td>${employee.date}</td>
            </tr>`;
    });

    tableHTML += `</tbody></table>`;
    
    document.getElementById('showEmployees').innerHTML = tableHTML;
}

// Borrar empleado
document.getElementById('deleteBtn').addEventListener('click', function () {
    let empId = document.getElementById('empId').value;

    if (empId) {
        fetch('delete_employee.php?id=' + empId, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Empleado borrado correctamente');
                loadEmployees(); // Recargar empleados después de borrar
            } else {
                alert('Error al borrar empleado');
            }
        });
    } else {
        alert('Por favor, ingresa un ID');
    }
});

// Editar empleado
document.getElementById('editBtn').addEventListener('click', function () {
    let empId = document.getElementById('empId').value;

    if (empId) {
        fetch('get_employee.php?id=' + empId, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                let employee = data.employee;
                document.getElementById('name').value = employee.name;
                document.getElementById('age').value = employee.age;
                document.getElementById('gender').value = employee.gender;
                document.getElementById('date').value = employee.date;
                editingEmployeeId = employee.id; 
            } else {
                alert('Empleado no encontrado');
            }
        });
    } else {
        alert('Por favor, ingresa un ID');
    }
});
