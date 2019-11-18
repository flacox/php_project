// BUSCAR MATERIAS
// function buscarMaterias(){
//                 fetch("/universidad_materia.php")
//                 .then( res => res.json())
//                 .then( res => {
//                     var listaId = document.getElementById('list_Id')
//                     var temp = '';
//                     res.forEach(m => {

//                         temp = temp + '<tr>' + 
//                         '<td>' + m.nombre +'</td>' + 
//                         '<td>' + m.creditos + '</td>' + 
//                         '<td>' + '<button class="btn btn-warning">Actualizar</button>' + '</td>' +
//                         '<td>' + '<button class="btn btn-danger">Eliminar</button>' + '</td>' +
//                         '</tr>' 
//                         listaId.innerHTML = temp;
//                         //console.log(temp);
//                     });
                   
//                 })
//                 .catch( err => {
//                     console.log(err);
//                 });
//             }





var materiaTemplate = `
    <tr id="row-materia-{{ID}}">
    <td>{{NOMBRE}}</td>
    <td>{{CREDITOS}}</td>
    <td><button id="editar-{{ID}}" onclick='editar({{ID}})' data-materia='{{DATA}}' class="btn btn-warning">Editar</button></td>
    <td><button onclick="eliminar({{ID}})" class="btn btn-danger">Eliminar</button></td>
    </tr>`

function buscarMaterias() {
    fetch("/universidad_materia.php")
        .then( res => res.json())
        .then( res => {
            var listaM = document.getElementById('list_Id');
            var temp = '';
            res.forEach(m => {
                temp = temp + materiaTemplate.replace(/{{NOMBRE}}/, m.nombre)
                    .replace(/{{CREDITOS}}/, m.creditos)
                    .replace(/{{ID}}/g, m.id)
                    .replace(/{{DATA}}/, JSON.stringify(m));

            });
            listaM.innerHTML = temp;
        })
        .catch( err => {
            console.log(err);
        });
}

var materia = null;

function guardar(){

    nombre = document.getElementById("nombre").value;
    creditos = document.getElementById("creditos").value;

    var nueva = true;
    if (materia != null && materia.id ){
        nueva = false;
        var btnEditar = document.getElementById("editar-"+materia.id);
    } else {
        materia = {};
    }

    materia.nombre = nombre
    materia.creditos = creditos;

    // console.log(materia);
   
    if (nueva == false) {
        btnEditar.dataset.materia = JSON.stringify(materia);
    }

   fetch('/universidad_materia.php'+(nueva ? '' : `?id=${materia.id}`), {
        method: (nueva ? 'POST' : 'PUT'),
        body: JSON.stringify(materia),
        headers: {
            'Content-Type': 'application/json'
          }
    })
    .then( res => res.json())
    .then( res => {
        console.log(res);
    })
    .catch( err => {
        console.log(err);
    });


    materia = null;
}

function editar(id){

    var btnEditar = document.getElementById("editar-"+id);

    var data = btnEditar.dataset.materia;
    materia = JSON.parse(data);

    document.getElementById("nombre").value = materia.nombre;
    document.getElementById("creditos").value = materia.creditos;
}

function eliminar(id){
    fetch(`/universidad_materia.php`, {
        method: 'DELETE',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({id:id})
    })
    
    .then( res => res.json())
    .then( res => {console.log(res);
    })

    .catch( err => {
        console.log(err);
        //console.log(id);
    });

    

}


window.onload = function(){
    buscarMaterias();

    document.getElementById("guardarMateria")
    .addEventListener("click", guardar);
}
