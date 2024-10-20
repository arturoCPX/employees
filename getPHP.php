<?php
include('connection.php');

$sql = "SELECT * FROM employees";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "ID: " . $row["id"]. " - Nombre: " . $row["name"]. " - Edad: " . $row["age"]." - Genero: " . $row["gender"]." - Fecha: " . $row["date"]. "<br>";
    }
} else {
    echo "No se encontraron resultados";
}

// Cerrar la conexión
$conn->close();
?>