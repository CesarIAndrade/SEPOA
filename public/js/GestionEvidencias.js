var userid;

$(document).ready(function () {
    userid = $('#user_information').val();
    GargarTodo()
    $(document).on("submit","#formulario_subida_evidencias",function (e) {
        e.preventDefault()
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        var formData = new FormData($(this)[0]);
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
                alertify.error('Se ha producido un error en la petición');
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
        alertify.error('Se ha producido un error en la petición');
        valor=null
    })
    return valor
 }
 function ComparacionDeFechas(fecha11, fecha22) {//retorna la diferencia de dias de dos fechas
    var fecha1 = new Date(fecha11); // Define día y mes
    var fecha2 = new Date(fecha22); // Define día y mes  
    var diasDif = fecha2.getTime() - fecha1.getTime();
    return (diasDif/(1000 * 60 * 60 * 24))
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
function CrearSemaforización(fecha1, fecha2) {
    var diferencia1=ComparacionDeFechas(fecha1,fecha2)
    var diferencia2=ComparacionDeFechas(ObtenerFechaActual(),fecha2)
    var porcentaje1,porcentaje2, fondo;
    porcentaje1=diferencia1*0.4;
    porcentaje2=diferencia1*0.2;
    if (diferencia2>porcentaje1) {
        fondo="bg-green";
    }else if (diferencia2>porcentaje2) {
        fondo="bg-orange";
    }else{
        fondo="bg-red";
    }
    return fondo;
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
                            if(valorMeta.id_responsable==userid){
                                var fondo=CrearSemaforización(poaA.fecha_inicio_evaluacion,poaA.fecha_fin_evaluacion)
                                var periodo = '<tr id="metaeval' + MetasE.idmeta_evaluacion + '" class="'+fondo+'">\
                                <td>'+ c + '</td>\
                                <td class="text-success">Activa</td>\
                                <td>'+ valorMeta.descripcion + '</td>\
                                <td>'+ poaA.fecha_inicio_evaluacion + '</td>\
                                <td>'+ poaA.fecha_fin_evaluacion + '</td>\
                                <td><button class="btn btn-info upload_evd" id="metaeva'+MetasE.idmeta_evaluacion+'" onClick="MostrarModalEvidencias('+MetasE.idmeta_evaluacion+','+MetasE.porcentaje+')">Evidencia</button></td></tr>'
                                
                                $('#tabla_lista_metas_evidencias').append(periodo);
                                c++
                            }
                        })
                        .fail(function() {
                            alertify.error('Se ha producido un al mostrar las metas');
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

