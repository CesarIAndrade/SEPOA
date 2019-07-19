var id_periodo, etapa_seleccionada, estado;
$(document).ready(function () {
    
    obtener_fecha_limite();
    llenar_fecha();
    listar_periodos();
    $('body').on('click', '.abrir_modal', function () {
        id_periodo = $(this).val();
        llenar_evaluacion_periodo();
        $('#modal_apertura_periodo').modal('show');
    })

    // Ubicar periodo de evaluacion seleecionado
    $('#tabla_evaluacion').on('click', '.seleccionado', function () {
        etapa_seleccionada = $(this).val();
        estado = $(this).html();   
        marcar_dispositivos($(this));
        // validar_fecha();
        // crear_periodo();
    });

    // Modificar Campos para abrir periodo de evaluacion
    // $('#habilitar_periodo_de_evaluacion').click(function (e) {
    //     e.preventDefault();
    //     validar_fecha();
    //     crear_periodo();
    // })
});

function crear_periodo() {
    var c = 1;
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    var formData = {
        fecha_inicio_evaluacion: $('#id_md_fecha_ini_periodo').val(),
        fecha_fin_evaluacion: $('#id_md_fecha_fin_periodo').val(),
        estado: estado,
    }
    $.ajax({
        type: "PUT",
        url: "periodo/" + etapa_seleccionada,
        data: formData,
        dataType: "json",
        success: function (val) {
            clase = crear_clase_para_etapa(val.estado);
            var etapa = '<tr id="etapa' + val.id + '">\
                <td>'+ c++ + '</td>\
                <td>'+ val.fecha_inicio + '</td>\
                <td>'+ val.fecha_fin + '</td>\
                <td>'+ val.etapa + '</td>\
                <td><button type = "button" class="'+clase[0]+' seleccionado" id="etapa' + val.id + '" value="' + val.id + '" '+clase[2]+'>'+clase[1]+'</button></td></tr>'
            $('#etapa' + val.id).replaceWith(etapa);
            $('#modal_apertura_periodo').trigger('reset');
            $('#id_md_fecha_fin_periodo').val('');
            document.getElementById('id_md_fecha_fin_periodo').disabled = true;
        },
        error: function (val) {
            console.log('Error:', val)
        }
    });
}

function listar_periodos() {
    $('#tabla_lista_metas_evidencias').html('');
    var c = 1;
    $.get("periodos",
        function (data) {
            $.each(data, function (index, val) {
                id_periodo = val.id;
                var periodo = '<tr id="periodo' + val.id + '">\
                <td>'+ c++ + '</td>\
                <td>'+ val.descripcion + '</td>\
                <td>'+ val.fecha_inicio + '</td>\
                <td>'+ val.fecha_fin + '</td>\
                <td>'+ val.estado + '</td>\
                <td><button class="btn btn-success abrir_modal" id="periodo'+ val.id + '" value="' + val.id + '">Abrir Periodo</button></td></tr>'
                $('#tabla_periodos').append(periodo);
            });
        },
    );
}

function llenar_evaluacion_periodo() {
    $('#tabla_evaluacion').html('');
    var c = 1;
    $.get("evaluacion_poa", function (data) {
        $.each(data, function (index, val) {
            clase = crear_clase_para_etapa(val.estado);
            var etapa = '<tr id="etapa' + val.id + '">\
                <td>'+ c++ + '</td>\
                <td>'+ val.fecha_inicio + '</td>\
                <td>'+ val.fecha_fin + '</td>\
                <td>'+ val.etapa + '</td>\
                <td><button type = "button" class="'+clase[0]+' seleccionado" onclick="confirmacion_modal()" id="etapa' + val.id + '" value="'+val.id+'" '+clase[2]+'>'+clase[1]+'</button></td></tr>'
            $('#tabla_evaluacion').append(etapa);
        });
    });
}

function crear_clase_para_etapa(estado) {
    if (estado == 'H') {
        var arreglo = ['btn btn-success', 'Habilitar', '']
        return arreglo;
    }
    else if (estado == 'D') {
        var arreglo = ['btn btn-danger', 'Deshabilitar', '','E']
        return arreglo;
    }
}

function marcar_dispositivos(objeto){
    if($(objeto).hasClass('btn btn-danger')){
        $(objeto).removeClass('btn btn-danger');
        $(objeto).addClass('btn btn-info');
        document.getElementById('id_md_fecha_fin_periodo').disabled = true;
    }
    else if($(objeto).hasClass('btn btn-success')){
        $(objeto).removeClass('btn btn-success');
        $(objeto).addClass('btn btn-info');
        document.getElementById('id_md_fecha_fin_periodo').disabled = false;
    }
    else if($(objeto).hasClass('btn btn-info') && $(objeto).html() == 'Habilitar'){
        $(objeto).removeClass('btn btn-info');
        $(objeto).addClass('btn btn-success');
        document.getElementById('id_md_fecha_fin_periodo').disabled = true;
    }
    else if($(objeto).hasClass('btn btn-info') && $(objeto).html() == 'Deshabilitar'){
        $(objeto).removeClass('btn btn-info');
        $(objeto).addClass('btn btn-danger');
    }
}

function obtener_fecha_limite(){
    var f = new Date();
    var min = f.getFullYear() + '-01-01T00:00'
    var max = f.getFullYear() + '-12-31T23:59';
    $('#id_md_fecha_fin_periodo').attr('min', min);
    $('#id_md_fecha_fin_periodo').attr('max', max);
}

function validar_fecha(){
    let fecha_inicio = new Date($('#id_md_fecha_inicio_periodo').val());
    let fecha_fin = new Date($('#id_md_fecha_fin_periodo').val());
    if(fecha_fin.getDate() <= fecha_inicio.getDate()){
        alert('fecha incorrecta');
        $('#id_md_fecha_fin_periodo').val('');
    }
    else if((fecha_fin.getMonth()+1) < (fecha_inicio.getMonth()+1)){
        alert('fecha incorrecta');
        $('#id_md_fecha_fin_periodo').val('');
    }
}

function llenar_fecha(){
    var f = new Date();
    var min;
    if((f.getMonth()+1) <= 9){
        // min = f.getFullYear() + "-0" + (f.getMonth() +1) + "-" + f.getDate() + 'T00:00';
        min = f.getFullYear() + "-0" + (f.getMonth() +1) + "-" + f.getDate() + 'T' +f.getHours()+":"+f.getMinutes()+":"+f.getSeconds(); 
    }
    else{
        // min = f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + 'T00:00';
        min = f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + 'T' +f.getHours()+":"+f.getMinutes()+":"+f.getSeconds(); 
    }
    $('#id_md_fecha_inicio_periodo').attr('min', min);
    $('#id_md_fecha_inicio_periodo').val(min);
}

function confirmacion_modal() {
    alertify.confirm("¿¡Está Seguro?!",
    function(){
        alertify.success('Listo');
    },
    function(){
        alertify.error('Cancelado');
    }
);
}


