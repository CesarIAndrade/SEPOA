$(document).ready(function () {
    $('#id').on('click', function () {
        $('#modal_evaluar_evidencia').modal('show');
    })
    CargarPeriodosActivos();
});

$(document).on("submit","#formulario_evaluacion_evidencias",function (e) {
    e.preventDefault()
    var formData = {
        porcentaje_evaluado: $('#id_porcentaje_evaluado').val(),
        porcentaje_cumplido: $('#id_porcentaje_cumplido').val(),

    }
    console.log(formData)
    var id=$(this).val()
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: "POST",
        url: "evaluarEvidencia/" + id,
        data: formData,
        dataType: "json",
        success: function (val) {
            alertify.success('Evaluacion realizada');
            CargarPeriodosActivos();

        },
        error: function (val) {
            console.log('Error:', val)
        }
    });
    $('#formulario_evaluacion_evidencias').trigger('reset');
    $('#modal_evaluar_evidencia').modal('hide');
});

function MostrarEvaluacion(id, porcentaje) {
    $('#formulario_evaluacion_evidencias').trigger('reset');
    $('#id_tabla_evidencia_revisar').html('');
    $('#modal_evaluar_evidencia').modal('show');
    $('#formulario_evaluacion_evidencias').val(id);
    $.get("buscarEvidencia/"+id,
    function (data) {
        if(data.evidencia==null||data.evidencia==""){
            $('#contenido_evidencia').hide();
        }
        else{
            $('#contenido_evidencia').show();
            $('#id_porcentaje_cumplido').val(data.porcentaje_cumplido)
            if (data.porcentaje_evaluado==null||data.porcentaje_evaluado=="") {

            } else {
                $('#id_porcentaje_evaluado').val(data.porcentaje_evaluado)
            }
            $('#id_tabla_evidencia_revisar').html('');
            var periodo = '<tr>\
            <td>'+ data.evidencia + '</td>\
            <td><center><a class="btn btn-primary" target="_blank" href="ArchivosSubidos/'+data.evidencia+'">Visualizar/Abrir</a></center></td></tr>'
            $('#id_tabla_evidencia_revisar').append(periodo);
        }
    },
    "json"
);
    $('#id_porcentaje_esperado').val(porcentaje)

}
//llenar tabla de periodos de evaluacion activos
function CargarPeriodosActivos() {  
    $('#tabla_lista_evaluacion_evidencias').html('');
    var c = 1;
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: 'evaluacionRutas',
        type: 'GET',
        dataType: 'json',
    })
    .done(function(evaluacion) {
        var c=1
        $.each(evaluacion, function (index, elemento) { 
            var valor=''
            var valor2=''
            var valor3=''
            var valor4=''
            
            if(elemento.porcentaje_evaluado==null||elemento.porcentaje_evaluado==''){
                valor3='No evaluado'
                valor4='text-danger'
            }
            else{
                valor3='Evaluado'
                valor4='text-success'
            }
            if(elemento.evidencia==null||elemento.evidencia==''){
                valor='No disponible'
                valor3='No evaluable'
                valor2='disabled'
                valor4='text-danger'
            }
            else{
                valor=elemento.evidencia
            }
            var periodo = '<tr id="metaeval' + elemento.idmeta_evaluacion + '">\
            <td>'+ c + '</td>\
            <td class="'+valor4+'">'+valor3+'</td>\
            <td>'+ elemento.descripcion + '</td>\
            <td>'+ elemento.fecha_inicio + '</td>\
            <td>'+ elemento.fecha_fin + '</td>'            
            periodo+='<td>'+valor+'</td>\
            <td><button '+valor2+' class="btn btn-info" id="metaeva'+elemento.idmeta_evaluacion+'" onClick="MostrarEvaluacion('+elemento.idmeta_evaluacion+','+elemento.porcentaje_cumplido+')">Revisar</button></td>\
            </tr>'
            
            $('#tabla_lista_evaluacion_evidencias').append(periodo);
            c++
        });
    })
    .fail(function() {
        console.log("error");
    })
}