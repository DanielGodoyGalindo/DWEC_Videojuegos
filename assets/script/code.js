/* Obtener datos del fichero JSON y recorrerlos. Si el usuario ha seleccionado la primera generación, el foreach
recorrerá todo el json y comprobará si el atributo "generacion" coincide con el id del elemento de la lista.
Si coincide, con el selector jquery se selecciona el elemento (videoconsola) que coincide con el atributo "nombre"
del archivo json y se le aplican los métodos de eliminar clase, añadir clase, etc... */

$(document).ready(function () {
    $('li').click(async function (event) {
        $(this).animate({ fontSize: "1.5vw" }, 600); // Agregar animación al hacer click en elementos del aside
        setTimeout(() => {
            $(this).removeAttr('style');
        }, 1000);
        try {
            const response = await fetch('./assets/data/consolas.json'); // solicitar datos (devuelve una Promesa)
            if (!response.ok) {
                throw new Error(`Ha habido un error al obtener los datos:  ${response.status}`);
            }
            const data = await response.json(); // Convertir los datos a json (devuelve otra Promesa)
            data.forEach(consola => { // Recorrer el json
                if (consola.generacion == event.target.id) { // Si la generación de la consola coincide (compara el fichero json con el id del elemento li)
                    $('#' + consola.nombre).removeClass('noSeleccionada').addClass('seleccionada'); // Quitar / añadir clase
                    $('#' + consola.nombre).next().text($('#' + consola.nombre).attr('alt')); // Añadir nombre al párrafo hermano
                    $('#' + consola.nombre).click(function () { // Añadir eventListener a las consolas de la generación seleccionada
                        $('#modal').html(consola.video); // Incluir iframe dentro del modal
                        $('#modal').addClass('mostrarVideo'); // Añadir animación al modal
                        setTimeout(() => { // Despues de la animación, que se quede visible
                            $('#modal').css({ 'visibility': 'visible', 'opacity': '1' });
                        }, 1000);
                        $('#modal') // Agregar párrafo con texto para indicar al usuario
                            .append($("<p></p>")
                                .text("PRESIONA ESCAPE PARA SALIR")
                                .css({
                                    'color': 'white',
                                    'font-size': '3rem',
                                    'top': '70vh',
                                    'heigh': '10rem',
                                    'line-height': '8rem'
                                }));
                        document.addEventListener("keydown", (e) => { // Añadir eventListener para que se pueda pulsar ESC
                            // e.preventDefault();
                            if (e.code == 'Escape') {
                                $('#modal').empty(true).css({ 'visibility': 'hidden', 'opacity': '0' }).removeClass('mostrarVideo');
                            }
                        })
                    });
                } else {
                    $('#' + consola.nombre)
                        .unbind('click')
                        .removeClass('seleccionada')
                        .addClass('noSeleccionada')
                        .next().text(''); // eliminar/añadir clase, quitar texto al parrafo hermano y quitar evento click
                }
            });
        }
        catch (error) {
            console.error(`${error}`);
        }
    })
});