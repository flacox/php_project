<?php


function buscarMaterias(){
    $cn = getConexion();

    $stm = $cn->query("SELECT * FROM materias");

    $rows = $stm->fetchAll(PDO::FETCH_ASSOC);

    // $data = json_decode($rows);

    // echo $data;

    foreach ($rows as $row){

        $data[] = [
            "id"=> $row["id"],
            "nombre" => $row["nombre"],
            "creditos" => $row["creditos"],
        ];

    }

    header("Content-Type: application/json, true");
    $data = json_encode($data);
    echo $data;

}


function guardarMaterias(){
    $postdata = file_get_contents("php://input");
    $data = json_decode($postdata, true);

    $cn = getConexion();
    $stm = $cn->prepare("INSERT INTO materias (nombre, creditos) VALUES (:nombre, :creditos)");
    $stm->bindParam(":nombre", $data["nombre"]);
    $stm->bindParam(":creditos", $data["creditos"]);
    $data = $stm->execute();
    echo 'Materia Guardada!';
}

function eliminarMaterias(){
    $postdata = file_get_contents("php://input");
    $data = json_decode($postdata, true);
    
    $cn = getConexion();
	$stm = $cn->prepare("DELETE FROM materias WHERE id= :id"); 
	$stm->bindParam(':id',  $data["id"]); 
    $data = $stm->execute();
    //echo 'Materia Eliminada!';
}

function actualizarMateria($id){
    
    if ($id == null) {
        header("HTTP/1.1 400 Bad Request");
        $response = [ 
            "error" => true,
            "message" => "Campos id es requerido"
        ];
        
        echo json_encode($response);
       
        return;
    } 

    $postdata = file_get_contents("php://input");
    $data = json_decode($postdata, true);

    $errors = [];
    if (!$data["nombre"]) {
        $errors[] = "campo nombre es requerido";
    }

    if (!$data["credito"]) {
        $errors[] = "campo credito es requerido";
    }

    if (count($errors)>0){
        header("HTTP/1.1 400 Bad Request");
        $response = [ 
            "error" => true,
            "message" => "Campos requeridos",
            "errors" =>  $errors
        ];
        
        echo json_encode($response);
        return;
    }

    $cn = getConexion();
    $stm = $cn->prepare("UPDATE materia SET nombre = :nombre, credito = :credito WHERE id = :id");
    $stm->bindParam(":nombre", $data["nombre"]);
    $stm->bindParam(":credito", $data["credito"]);
    $stm->bindParam(":id", $id);

    try {
        $data = $stm->execute();

        $response = [ 
            "error" => false,
        ];
        
        echo json_encode($response);
    } catch(Exception $e){

        $response = [ 
            "error" => true,
            "message" => "Error desconocido"
        ];
        
        echo json_encode($response);
    }

}


$method = $_SERVER["REQUEST_METHOD"];

// Establecer este header ya que todas las respuestan serán JSON
header("Content-Type: application/json", true);

require('conexion_universidad.php');

$method = $_SERVER["REQUEST_METHOD"];

switch ($method){
    case 'POST':
    guardarMaterias();
        break;

    case 'GET':
    buscarMaterias();
        break;

    case 'PUT':
        $id = $_GET["id"];
        actualizarMateria($id);
        break;

    case 'DELETE':
    eliminarMaterias();
        break;
        
     default:
        echo 'To be implemeted';   
}