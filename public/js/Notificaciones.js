$(document).ready(function () {
    $.get("notificaciones", function (data) {
        $('#numeroNotificaciones').html(data.length);
        $.each(data, function (index, val) {
            var notificacion = '<li id="notificacion'+val.id+'"><a><span class="image"><img src="images/img.jpg" alt="Profile Image"/></span><span>'+$('#UserName').val() +'</span><span class="time">3 mins ago</span><span class="message"><span>'+val.titulo+': </span><span>'+val.descripcion+'</span></span></a><li>';
            $('#notificaciones').append(notificacion);
        });
    });
});