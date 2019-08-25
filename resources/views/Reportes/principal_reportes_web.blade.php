@extends('layouts.gentela')
@section('title')
    Reportes
@endsection
@section('content')
<div class="right_col" role="main">
    <div class="container">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title"><center>Resumenes de cumplimiento</center></h3>
            </div>
            <div class="panel-body">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="periodos-tab" data-toggle="tab" href="#periodos_reportes" role="tab" aria-controls="periodos_reportes" aria-selected="true"><i class="glyphicon glyphicon-stats"></i> Periodos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " id="area-tab" data-toggle="tab" href="#areas_reportes" role="tab" aria-controls="areas_reportes" aria-selected="false"><i class="glyphicon glyphicon-th-large"></i> Areas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="tablas-tab" data-toggle="tab" href="#tablas_reportes" role="tab" aria-controls="tablas_reportes" aria-selected="false"><i class="glyphicon glyphicon-th-large"></i> Tablas</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade in" id="areas_reportes" role="tabpanel" aria-labelledby="area-tab">                
                        <div class="container">
                            @include('Reportes.graficas')
                        </div>
                    </div>
                    <div class="tab-pane fade active in" id="periodos_reportes" role="tabpanel" aria-labelledby="periodos-tab">
                        <div class="container">
                            @include('Reportes.estadistico_areas_periodos')
                        </div>
                    </div>
                    <div class="tab-pane fade" id="tablas_reportes" role="tabpanel" aria-labelledby="tablas-tab">...</div>
                </div>    
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/ReportesWeb.js')}}"></script>    
@endsection
