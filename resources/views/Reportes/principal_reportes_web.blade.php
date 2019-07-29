@extends('layouts.gentela')
@section('title')
    Reportes
@endsection
@section('content')

<div class="right_col" role="main">
    <div class="container">
    @include('Reportes.estadistico_areas_periodos')
    </div>
    <div class="container">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
            <a class="nav-link active" id="area-tab" data-toggle="tab" href="#areas_reportes" role="tab" aria-controls="areas_reportes" aria-selected="true">Areas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="periodos-tab" data-toggle="tab" href="#periodos_reportes" role="tab" aria-controls="periodos_reportes" aria-selected="false">Periodos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="tablas-tab" data-toggle="tab" href="#tablas_reportes" role="tab" aria-controls="tablas_reportes" aria-selected="false">Tablas</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active in" id="areas_reportes" role="tabpanel" aria-labelledby="area-tab">                
                <br>
                <div class="container">
                    @include('Reportes.graficas')
                </div>
            </div>
            <div class="tab-pane fade" id="periodos_reportes" role="tabpanel" aria-labelledby="periodos-tab">...</div>
            <div class="tab-pane fade" id="tablas_reportes" role="tabpanel" aria-labelledby="tablas-tab">...</div>
        </div>    
    </div>
</div>
    
@endsection
