<?php


function buscarCarrera(){
    
    $cn = getConexion();

    $stm = $cn->query("SELECT * FROM carrera");

    $rows = $stm->fetchAll(PDO::FETCH_ASSOC);

    foreach ($rows as $row){

        $data[] = [
            "id"=> $row["id"],
            "nombre" => $row["nombre"]
        ];

    }

    header("Content-Type: application/json, true");
    $data = json_encode($data);
    echo $data;

}

function guardarCarrera(){
    $postdata = file_get_contents("php://input");
    $data = json_decode($postdata, true);

    $cn = getConexion();
    $stm = $cn->prepare("INSERT INTO carrera (nombre) VALUES (:nombre)");
    $stm->bindParam(":nombre", $data["nombre"]);
    $data = $stm->execute();
    echo 'Carrera Guardada!';
}

function eliminarCarrera(){
    $postdata = file_get_contents("php://input");
    $data = json_decode($postdata, true);
    
    $cn = getConexion();
	$stm = $cn->prepare("DELETE FROM carrera WHERE id= :id"); 
	$stm->bindParam(':id',  $data["id"]); 
    $data = $stm->execute();
    echo 'Carrera Eliminada!';
}

require('conexion_universidad.php');

$method = $_SERVER["REQUEST_METHOD"];

switch ($method){
    case 'POST':
        guardarCarrera();
        break;

    case 'GET':
        buscarCarrera();
        break;

    case 'PUT':
        //
        break;

    case 'DELETE':
        eliminarCarrera(id);
        break;
        
     default:
        echo 'To be implemeted';   
}
