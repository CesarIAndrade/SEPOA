@extends('layouts.gentela')
@section('title')
Gestión de Periodos
@endsection
@section('content')
<div class="right_col container-fluid" role="main">
    @include('GestionPeriodo.modal_periodo')
    @include('GestionPeriodo.tabla_periodo')
</div>
<script src='js/GestionPeriodo.js'></script>
@endsection