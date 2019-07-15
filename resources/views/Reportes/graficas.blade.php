<script src="{{ asset('js/jspdf.js')}}"></script>
<script src="{{ asset('js/Chart.js')}}"></script>

<canvas id="myChart" style="background-color: #E85E40 ;" width="auto" height="auto"></canvas>

<button type="button" class="btn btn-outline-success" id="id_descargarGrafico" >
            Generar como pdf
        </button>
<script>
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    backgroundColor:'Red',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

$('#id_descargarGrafico').click(function (e) { 
  downloadPDF();
});
//download pdf form hidden canvas
function downloadPDF() {
    var canvas = document.querySelector('#myChart');
	//creates image
    canvas.fillStyle = "red";

	var canvasImg = canvas.toDataURL("image/png", 1.0);
  
	//creates PDF from img
	var doc = new jsPDF('landscape');
	doc.setFontSize(20);
	doc.text(15, 15, "Cool Chart");
	doc.addImage(canvasImg, 'JPEG', 10, 10, 280, 150 );
    window.open(doc.output('bloburl'));
}

</script>
