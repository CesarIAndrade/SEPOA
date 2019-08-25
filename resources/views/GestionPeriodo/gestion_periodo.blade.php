@extends('layouts.gentela')
@section('title')
Gestión de Periodos
@endsection
@section('content')
<div class="right_col container-fluid" role="main">
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title"><center>Gestión de periodos de evaluación</center></h3>
        </div>
        <div class="panel-body">
            @include('GestionPeriodo.modal_periodo')
            @include('GestionPeriodo.tabla_periodo')
        </div>
    </div>
<script src='js/GestionPeriodo.js'></script>
@endsection