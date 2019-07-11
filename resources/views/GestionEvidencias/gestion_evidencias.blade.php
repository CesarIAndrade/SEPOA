@extends('layouts.gentela')
@section('title')
Gestión de Evidencias
@endsection
@section('content')
<div class="right_col" role="main">
    @include('GestionEvidencias.modal_subida_evidencias')
    @include('GestionEvidencias.tabla_metas_evidencias')
</div>
<script src='js/GestionEvidencias.js'></script>
@endsection