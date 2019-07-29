var areas = [];
var porcentajes = [];
var colores = [];
var periodosMuestra;
$(document).ready(function () {
    llenarSelect();
    $('#id_seleccion_periodos').change(function (e) { 
        llenarGrafica($('#id_seleccion_periodos').val());
    });
    
});
function llenarSelect() {//llena el select con los periodos exixtentes
    $.ajax({
        type: "get",
        url: "periodos",
        dataType: "json",
        success: function (periodosResult) {
            var select_periodos="";
            $(periodosResult).each(function (index, element) {
                if(index==0)
                {
                    periodosMuestra=element.id;
                    select_periodos+="<option selected value="+element.id+">"+element.descripcion+"</option>";
                }
                else{
                    select_periodos+="<option value="+element.id+">"+element.descripcion+"</option>";
                }
            });
            $('#id_seleccion_periodos').html(select_periodos);
            llenarGrafica(periodosMuestra);
        }
    });
}
console.log(porcentajeDosValores(80,40))

function llenarGrafica(id_periodo) {
    areas = [];
    porcentajes = [];
    colores = [];
    var auxArea, auxPorcentaje;
    var contador=0;
    $.ajax({
        type: "get",
        url: "obtenerAreas/"+id_periodo,
        dataType: "json",
        success: function (response) {
            if(response.length!=0){
                $('#grafica_estadistica').show();
                $.each(response, function (index, value) { 
                    if (index==0) {
                        contador++;
                        auxPorcentaje=porcentajeDosValores(value.porcentaje, value.porcentaje_evaluado)
                        auxArea=value.area;
                    }else if(auxArea==value.area){
                        if(response.length-1==index){
                            colores.push(getRandomColor());
                            auxPorcentaje+=porcentajeDosValores(value.porcentaje, value.porcentaje_evaluado)
                            contador++;
                            porcentajes.push(auxPorcentaje/contador);
                            areas.push(auxArea);
                        }else{
                            contador++;
                            auxArea=value.area;
                            auxPorcentaje+=porcentajeDosValores(value.porcentaje, value.porcentaje_evaluado)
                        }
                    }else if(auxArea!=value.area){
                        colores.push(getRandomColor());
                        porcentajes.push(auxPorcentaje/contador);
                        areas.push(auxArea);
                        auxPorcentaje=0;
                        contador=0;
                        auxArea=value.area;
                        auxPorcentaje+=porcentajeDosValores(value.porcentaje, value.porcentaje_evaluado)
                        contador++;
                    }
                });
                $('#grafica_estadistica').html('');
                var ctx = document.getElementById('grafica_estadistica').getContext('2d');
                if (window.grafica) {
                    window.grafica.clear();
                    window.grafica.destroy();
                }
                window.grafica = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: areas,
                        datasets: [{
                            label: 'Porcentaje de cumplimiento por areas',
                            data: porcentajes,
                            backgroundColor: colores,
                            borderColor: colores,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0,
                                    max: 100,
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            }
            else{
                $('#grafica_estadistica').hide();
            } 
        }
    });
}
function getRandomColor() {//Genera un color aleatorio
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function porcentajeDosValores(valor1, valor2) {//porcentaje de algo en base a dos valores
    var resultado=(valor2/valor1)*100;
    return resultado;
}
// $('#id_descargarGrafico').click(function (e) { 
//   downloadPDF();
// });
//download pdf form hidden canvas
// function downloadPDF() {
//     var canvas = document.querySelector('#myChart');
// 	//creates image
//     canvas.fillStyle = "red";

// 	var canvasImg = canvas.toDataURL("image/png", 1.0);
  
// 	//creates PDF from img
// 	var doc = new jsPDF('landscape');
// 	doc.setFontSize(20);
// 	doc.text(15, 15, "Cool Chart");
// 	doc.addImage(canvasImg, 'JPEG', 10, 10, 280, 150 );
//     window.open(doc.output('bloburl'));
// }
