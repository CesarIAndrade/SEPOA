$(document).ready(function () {
    obtenerPeriodosDeEvaluacion();
});

var estado_de_evaluacion = {};
function obtenerPeriodosDeEvaluacion(){
    $.get("evaluacion_poa", function (data) {
        $.each(data, function (index, val) {
            estado_de_evaluacion[index] = val.estado;
        });
        obtenerNotificaciones();
    });
}

notificaciones = [];
function obtenerNotificaciones(){
    $.get("notificaciones", function (data) {
        $.each(data, function (index, val) {
            notificaciones[index] = val;
        });
        cargarNotificaciones();
    });
}

function cargarNotificaciones(){
    var _notificacion, c = 0;
    $.each(notificaciones, function (index, notificacion) {
        $.each(estado_de_evaluacion, function (indexE, estado) {
            if(notificacion.tipo == "H" && estado == "H"){
                _notificacion = estructurarNotificaciones(notificacion);
                $('#notificaciones').append(_notificacion);
                c += 1;
            }
            else if(notificacion.tipo == "D" && estado == "D"){
                _notificacion = estructurarNotificaciones(notificacion);
                $('#notificaciones').append(_notificacion);
                c += 1;
            }
        });
        $('#numeroNotificaciones').html(c);
    });
}

function estructurarNotificaciones(notificacion){
    return '<li id="notificacion'+notificacion.id+'"><a><span class="image"><img src="images/img.jpg" alt="Profile Image"/></span><span>'+$('#UserName').val() +'</span><span class="time">3 mins ago</span><span class="message"><span>'+notificacion.titulo+': </span><span>'+notificacion.descripcion+'</span></span></a><li>';
}
