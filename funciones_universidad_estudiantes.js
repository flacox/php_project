
// BUSCAR ESTUDIANTES
function buscarEstudiantes(){
                fetch("/universidad_estudiante.php")
                .then( res => res.json())
                .then( res => {
                    var listaId = document.getElementById('list_Estudiantes')
                    var temp = '';
                    res.forEach(m => {

                        temp = temp + '<tr>' + 
                        // '<td>' + m.id + '</td>' +
                        '<td>' + m.nombre +'</td>' + 
                        '<td>' + m.matricula + '</td>' + 
                        '<td>' + m.edad + '</td>' + 
                        '<td>' + m.carrera_id + '</td>' + 
                        '<td>' + '<button class="btn btn-warning">Actualizar</button>' + '</td>' +
                        '<td>' + '<button class="btn btn-danger">Eliminar</button>' + '</td>' +
                        '</tr>' 
                        listaId.innerHTML = temp;
                        //console.log(temp);
                    });
                   
                })
                .catch( err => {
                    console.log(err);
                });
            }

