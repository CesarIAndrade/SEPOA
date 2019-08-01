var id_periodo, etapa_seleccionada, estado;
$(document).ready(function () {
    
    //llenar_fecha();
    listar_periodos();
    $('body').on('click', '.abrir_modal', function () {
        id_periodo = $(this).val();
        llenar_evaluacion_periodo();
        $('#id_info_apertura_periodos').html('Etapas de evaluacion para el periodo '+$('#descripcion'+id_periodo).html());
        $('#modal_apertura_periodo').modal('show');
    })
    $('#id_cancelar_accion_periodo').click(function (e) { 
        alertify.error("Cancelado");
        $('#modal_de_confirmacion').modal("hide");
        $('#modal_de_confirmacion').trigger('reset');
    });
    $('#id_cerrar_accion_periodo').click(function (e) { 
        alertify.error("Cancelado");
        $('#modal_de_confirmacion').modal("hide");
        $('#modal_de_confirmacion').trigger('reset');
    });
    $('#id_confirmar_accion_periodo').click(function (e) { 
        e.preventDefault();
        // validar_fecha();
        crear_periodo(etapa_seleccionada,estado);
        $('#modal_de_confirmacion').trigger('reset');
    });
    // Ubicar periodo de evaluacion seleecionado
    // $('#tabla_evaluacion').on('click', '.seleccionado', function () {
    //     // validar_fecha();
    //     // crear_periodo();
    // });

    // Modificar Campos para abrir periodo de evaluacion
    // $('#habilitar_periodo_de_evaluacion').click(function (e) {
    //     e.preventDefault();
    //     validar_fecha();
    //     crear_periodo();
    // })
});

function crear_periodo(etapa_seleccionada,estado) {
    var c = 1;
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    var formData = {
        fecha_inicio_evaluacion: $('#id_md_fecha_inicio_periodo').val(),
        fecha_fin_evaluacion: $('#id_md_fecha_fin_periodo').val(),
        estado: estado,
    }
    console.log($('#id_md_fecha_inicio_periodo').val())
    $.ajax({
        type: "PUT",
        url: "periodo/" + etapa_seleccionada,
        data: formData,
        dataType: "json",
        success: function (val) {
            clase = crear_clase_para_etapa(val.estado);
            var etapa = '<tr id="etapa' + val.id + '">\
                <td>'+ val.etapa + '</td>\
                <td>'+ val.fecha_inicio + '</td>\
                <td>'+ val.fecha_fin + '</td>\
                <td><button type = "button" class="'+clase[0]+' seleccionado" onclick="confirmacion_modal2(etapaBtn' + val.id +')" id="etapaBtn' + val.id + '" value="' + val.id + '" '+clase[2]+'>'+clase[1]+'</button></td></tr>'
            $('#etapa' + val.id).replaceWith(etapa);
            $('#modal_apertura_periodo').trigger('reset');
            $('#id_md_fecha_fin_periodo').val('');
            alertify.success("Realizado");
            $('#modal_de_confirmacion').modal("hide");
        },
        error: function (val) {
            alertify.error('Error en la petición');
        }
    });
}

function listar_periodos() {//llena la tabla con todos los periodos 
    $('#tabla_lista_metas_evidencias').html('');
    var c = 1;
    $.get("periodos",
        function (data) {
            $.each(data, function (index, val) {
                id_periodo = val.id;
                var periodo = '<tr id="periodo' + val.id + '">\
                <td>'+ c++ + '</td>\
                <td id="descripcion'+ val.id + '">'+ val.descripcion + '</td>\
                <td>'+ val.fecha_inicio + '</td>\
                <td>'+ val.fecha_fin + '</td>\
                <td><button class="btn btn-success abrir_modal" id="periodo'+ val.id + '" value="' + val.id + '">Abrir Periodo</button></td></tr>'
                $('#tabla_periodos').append(periodo);
            });
        },
    );
}

function llenar_evaluacion_periodo() { //llena la tabla de las etapas de evaluacion
    $('#tabla_evaluacion').html('');
    var c = 1;
    $.get("evaluacion_poaE/"+id_periodo, function (data) {
        $.each(data, function (index, val) {
            clase = crear_clase_para_etapa(val.estado);
            var actividad='disabled';
            var etapa = '<tr id="etapa' + val.id + '">\
                <td>'+ val.etapa + '</td>\
                <td>'+ val.fecha_inicio + '</td>\
                <td>'+ val.fecha_fin + '</td>'
                if ((ComparacionDeFechas(val.fecha_fin,ObtenerFechaActual()))>=0) {
                    actividad='';
                }
                etapa+='<td><button type = "button" class="'+clase[0]+' seleccionado" onclick="confirmacion_modal2(etapaBtn' + val.id +')" id="etapaBtn' + val.id + '" value="'+val.id+'" '+clase[2]+' '+actividad+'>'+clase[1]+'</button></td></tr>'
            $('#tabla_evaluacion').append(etapa);
        });
    });
}

function crear_clase_para_etapa(estado) {//llena un arreglo para controlar las clases de llenado en la tabla
    if (estado == 'H') {                 //etapas de evaluacion
        var arreglo = ['btn btn-success', 'Habilitar', '']
        return arreglo;
    }
    else if (estado == 'D') {
        var arreglo = ['btn btn-danger', 'Deshabilitar', '']
        return arreglo;
    }else if(estado == 'E'){
        var arreglo = ['btn btn-success', 'Evaluado','disabled']
        return arreglo;
    }
}

function marcar_periodos(objeto){//Cambia las clases de los botones de habilitar o deshabilitar que se seleccionen
    // if($(objeto).hasClass('btn btn-danger')){
    //     $(objeto).removeClass('btn btn-danger');
    //     $(objeto).addClass('btn btn-info');
    //     document.getElementById('id_md_fecha_fin_periodo').disabled = true;
    // }
    // else if($(objeto).hasClass('btn btn-success')){
    //     $(objeto).removeClass('btn btn-success');
    //     $(objeto).addClass('btn btn-info');
    //     document.getElementById('id_md_fecha_fin_periodo').disabled = false;
    // }
    // else 
    if($(objeto).hasClass('btn btn-danger') && $(objeto).html() == 'Habilitar'){
        $(objeto).removeClass('btn btn-danger');
        $(objeto).addClass('btn btn-success');
        // 
    }
    else if($(objeto).hasClass('btn btn-success') && $(objeto).html() == 'Deshabilitar'){
        $(objeto).removeClass('btn btn-success');
        $(objeto).addClass('btn btn-danger');
    }
}

function obtener_fecha_limite(id){//obtiene una fecha minima para la apertura de los periodos de evaluacion
    var minim, minim2;
    $.get("evaluacion_poas/"+id,
        function (data) {
            var fechaObtenida = new Date(data.fecha_fin);
            minim = (fechaObtenida.getFullYear())+'-'+(reconstruirFecha(fechaObtenida.getMonth()+1))+'-'+(reconstruirFecha(fechaObtenida.getDate()+1))+ 'T23:59:59';
            var f = new Date();
            minim2 = f.getFullYear() + "-" + (reconstruirFecha(f.getMonth() +1)) + "-" +(reconstruirFecha(f.getDate())) + 'T' +(reconstruirFecha(f.getHours()))+":"+(reconstruirFecha(f.getMinutes())); 
            if(minim<minim2){
                $('#id_md_fecha_inicio_periodo').attr('min', minim2);
                $('#id_md_fecha_inicio_periodo').val(minim2);
                $('#id_md_fecha_fin_periodo').attr('min', minim2);
                $('#id_md_fecha_fin_periodo').val(minim2);
            }else{
                $('#id_md_fecha_inicio_periodo').attr('min', minim);
                $('#id_md_fecha_inicio_periodo').val(minim);
                $('#id_md_fecha_fin_periodo').attr('min', minim);
                $('#id_md_fecha_fin_periodo').val(minim);
            }
        }
    );
}
function ObtenerFechaActual() {//retorna la fecha actual del sistema
    var fecha = new Date();
    //fecha = f.getFullYear() + "-" + (reconstruirFecha(f.getMonth() +1)) + "-" +(reconstruirFecha(f.getDate())) + 'T' +(reconstruirFecha(f.getHours()))+":"+(reconstruirFecha(f.getMinutes())); 
    return fecha
}
function reconstruirFecha(datosFecha){//arregla el formato de el cero antes de las fechas de un digito
    if((datosFecha) <= 9){
        return "0"+datosFecha;
    }
    else{
        return	datosFecha;
    }
}
function confirmacion_modal2(id) { //Abre un modal para confirmar la apertura o cierre de un periodo manualmente
    marcar_periodos($(id))
    // llenar_fecha();
    obtener_fecha_limite($(id).val());
    etapa_seleccionada = $(id).val();
    estado = $(id).html();   
    MostrarIngresoFechas();
    $('#modal_de_confirmacion').modal("show");

}

function MostrarIngresoFechas() {//Mostrar u ocultar los cuadros de fechas segun se necesiten
    if(estado=="Habilitar"){
        $('#id_cuerpo_info').hide();
        $('#id_cuerpo_fechas').show();
    }
    else if(estado=="Deshabilitar"){
        $('#id_cuerpo_info').show();
        $('#id_cuerpo_fechas').hide();
        $('#id_cuerpo_info').html("¿Desea cerrar la evaluación para esta etapa ahora mismo?");
    }
}

function ComparacionDeFechas(fecha11, fecha22) {
    var fecha1 = new Date(fecha11); // Define día y mes
    var fecha2 = new Date(fecha22); // Define día y mes  
    var diasDif = fecha2.getTime() - fecha1.getTime();
    return (diasDif/(1000 * 60 * 60 * 24))
}


