@extends('layouts.gentela')
@section('title')
Evaluación de Evidencias
@endsection
@section('content')
<div class="right_col container-fluid" role="main">
    @include('EvaluacionEvidencias.modal_evaluar_evidencias')
    @include('EvaluacionEvidencias.tabla_evaluacion_evidencias')
</div>
<script src='js/EvaluacionEvidencias.js'></script>
@endsection