const readline = require('readline-sync');

const tareas = [];

function agregarTareas() {
    let indicador = readline.question('Indicador de la tarea: ');
    let descripcion = readline.question('Descripcion de la tarea: ');
    tareas.push({ indicador, descripcion, completada: false });
    console.log('Tarea agregada correctamente');
}

function eliminarTarea() {
    let indicador = readline.question('Indicador de la tarea a eliminar: ');
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].indicador === indicador) {
            tareas.splice(i, 1);
            console.log('Tarea eliminada correctamente');
            return;
        }
    }
    console.log('No se encontró la tarea con ese indicador');
}

function completarTarea() {
    let indicador = readline.question('Indicador de la tarea a completar: ');
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].indicador === indicador) {
            tareas[i].completada = true;
            console.log('Tarea completada correctamente');
            return;
        }
    }
    console.log('No se encontró la tarea con ese indicador');
}

function mostrarTareas() {
    console.log('Tareas del dia de hoy:');
    const tareasMostradas = tareas.map((tarea) => ({
        indicador: tarea.indicador,
        descripcion: tarea.descripcion,
        estado: tarea.completada ? 'Completada' : 'Incompleta',
    }));

    console.table(tareasMostradas);
}



function main() {
    while (true) {
        let opcion = readline.question(
            'Seleccione una opcion\n1. Agregar tarea\n2. Eliminar tarea\n3. Mostrar tareas\n4. Completar tarea\n5. Salir\n'
        );
        switch (opcion) {
            case '1':
                agregarTareas();
                break;
            case '2':
                eliminarTarea();
                break;
            case '3':
                mostrarTareas();
                break;
            case '4':
                completarTarea();
                break;
            case '5':
                console.log('Hasta Luego');
                return;
            default:
                console.log('Opcion no valida');
        }
    }
}

main();


