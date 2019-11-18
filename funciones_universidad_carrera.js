
            // BUSCAR CARRERAS
// function buscarCarreras(){
//                 fetch("/universidad_carrera.php")
//                 .then( res => res.json())
//                 .then( res => {
//                     var listaId = document.getElementById('list_carrera')
//                     var temp = '';
//                     res.forEach(m => {

//                         temp = temp + '<tr id="row-materia-{{ID}}">' + 
//                         // '<td>' + m.id + '</td>' +
//                         '<td>' + m.nombre +'</td>' + 
//                         '<td>' + '<button class="btn btn-warning">Actualizar</button>' + '</td>' +
//                         '<td>' + '<button onclick="eliminar({{ID}}/m.id)" class="btn btn-danger">Eliminar</button>' + '</td>' +
//                         '</tr>' 
//                         listaId.innerHTML = temp;
//                         //console.log(temp);
//                     });
                   
//                 })
//                 .catch( err => {
//                     console.log(err);
//                 });
//             }

    

    var carreraTemplate = `
    <tr id="row-carrera-{{ID}}">
    <td>{{NOMBRE}}</td>
    <td><button id="editar-{{ID}}" onclick='editar({{ID}})' data-materia='{{DATA}}' class="btn btn-warning">Editar</button></td>
    <td><button onclick="eliminar({{ID}})" class="btn btn-danger">Eliminar</button></td>
    </tr>`

    // BUSCAR CARRERAS

    function buscarCarreras() {
    fetch("/universidad_carrera.php")
        .then( res => res.json())
        .then( res => {
            var listaM = document.getElementById('list_carrera');
            var temp = '';
            res.forEach(m => {
                temp = temp + carreraTemplate.replace(/{{NOMBRE}}/, m.nombre)
                    .replace(/{{ID}}/g, m.id)
                    .replace(/{{DATA}}/, JSON.stringify(m));

            });
            listaM.innerHTML = temp;
        })
        .catch( err => {
            console.log(err);
        });
}



// Delete Carrera

function eliminar(id){
    fetch(`/universidad_carrera.php`, {
        method: 'DELETE',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({id:id})
    })
    .then( res => res.json())
    .then( res => {console.log(res);
        console.log(res);
    })

    .catch( err => {
        console.log(err);
    });
    

}

window.onload = function(){

    buscarCarreras();

    }

