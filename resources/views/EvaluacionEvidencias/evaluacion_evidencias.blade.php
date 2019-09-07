@extends('layouts.gentela')
@section('title')
Evaluación de Evidencias
@endsection
@section('content')
<div class="right_col container-fluid" role="main">
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title"><center>Gestión de Evidencias</center></h3>
        </div>
        <div class="panel-body">
            @include('EvaluacionEvidencias.modal_evaluar_evidencias')
            @include('EvaluacionEvidencias.tabla_evaluacion_evidencias')
        </div>
    </div>
</div>
<script src='js/EvaluacionEvidencias.js'></script>
@endsection