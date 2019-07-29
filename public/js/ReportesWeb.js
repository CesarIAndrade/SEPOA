var areas = [];
var porcentajes = [];
var colores = [];
$(document).ready(function () {
    // console.log(porcentajeDosValores(80,40))
});
console.log(porcentajeDosValores(80,40))
llenarGrafica();
console.log(areas);
console.log(porcentajes);
console.log(colores);

var ctx = document.getElementById('grafica_estadistica').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: areas,
        datasets: [{
            label: 'Porcentaje de cumplimiento',
            data: porcentajes,
            backgroundColor: colores
            ,
            borderColor: colores
            ,
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
function llenarGrafica() {
    var auxArea, auxPorcentaje;
    var contador=0;
    $.ajax({
        type: "get",
        url: "obtenerAreas",
        dataType: "json",
        success: function (response) {
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
