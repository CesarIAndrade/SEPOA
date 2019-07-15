
$(document).ready(function () {
    GargarTodo()
    $(document).on("submit","#formulario_subida_evidencias",function (e) {
        e.preventDefault()
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        var formData = new FormData($(this)[0]);
        console.log(formData)
        var id=$(this).val()
        $.ajax({
            type: "POST",
            url: "subirEvidencia/" + id,
            data: formData,
            cache: false,
            contentType:false,
            processData:false,
            dataType: "json",
            success: function (val) {
                alertify.success('Evidencia almacenada correctamente');
            },
            error: function (val) {
                console.log('Error:', val)
            }
        });
        $('#formulario_subida_evidencias').trigger('reset');
        $('#nombre_archivo').text('Subir Archivo');
        $('#modal_subida_evidencia').modal('hide');

    });
});

//obtener relacion entre metas evaluacion

 //obtebner metas para la tabla
 function CargarMetas(id) {
     var valor
    $.ajax({
		url: 'Meta/'+id,
		type: 'GET',
		dataType: 'json',
	})
	.done(function(datos) {
       valor=datos
    })
    .fail(function() {
        console.log("error");
        valor=null
    })
    return valor
 }
 function GuardarArchivo() {
     
 }
function MostrarModalEvidencias(id, porcentaje) {
    $('#formulario_subida_evidencias').trigger('reset');
    $('#nombre_archivo').text('Subir Archivo');
    $('#modal_subida_evidencia').modal('show');
    $('#formulario_subida_evidencias').val(id);
    $.get("buscarEvidencia/"+id,
    function (data) {
        if(data.evidencia==null||data.evidencia==""){
            $('#contenido_evidencia').hide();
        }
        else{
            $('#contenido_evidencia').show();
            $('#id_porcentaje_cumplido').val(data.porcentaje_cumplido)
            $('#archivo_disponible').val(data.evidencia)
        }
    },
    "json"
);
    $('#id_porcentaje_esperado').val(porcentaje)

}
 //cargar datos en la tabla
function GargarTodo() {
    $('#tabla_lista_metas_evidencias').html('');
    var c = 1;
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.get("poaActivos",
        function (data) {
            var c=1
            $.each(data, function (index, poaA) {
                $.ajax({
                    url: 'MetaEvaluacion/'+poaA.id,
                    type: 'GET',
                    dataType: 'json',
                })
                .done(function(metasEval) {
                    $.each(metasEval, function (i, MetasE) {
                         
                        $.ajax({
                            url: 'Meta/'+MetasE.id_meta,
                            type: 'GET',
                            dataType: 'json',
                        })
                        .done(function(valorMeta) {
                            var periodo = '<tr id="metaeval' + MetasE.idmeta_evaluacion + '">\
                            <td>'+ c + '</td>\
                            <td class="text-success">Activa</td>\
                            <td>'+ valorMeta.descripcion + '</td>\
                            <td>'+ poaA.fecha_inicio_evaluacion + '</td>\
                            <td>'+ poaA.fecha_fin_evaluacion + '</td>\
                            <td><button class="btn btn-info upload_evd" id="metaeva'+MetasE.idmeta_evaluacion+'" onClick="MostrarModalEvidencias('+MetasE.idmeta_evaluacion+','+MetasE.porcentaje+')">Evidencia</button></td></tr>'
    
                            $('#tabla_lista_metas_evidencias').append(periodo);
                            c++
                        })
                        .fail(function() {
                            console.log("error");
                            valor=null
                        })
                    });
                })
                .fail(function() {
                    console.log("error");
                })
                
                
            });
        },
    );
}

