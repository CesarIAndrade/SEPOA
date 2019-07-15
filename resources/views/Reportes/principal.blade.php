@extends('layouts.gentela')
@section('title')
    Reportes
@endsection
@section('content')

<div class="right_col" role="main">
    <div class="container">
    @include('Reportes.prueba')
    </div>
    <div class="container">
        <a href='reporteGenerate/Reportes.prueba/portrait' target="_blank" class="btn btn-outline-success">Generar como pdf</a>
    </div>
    <div class="container">
    @include('Reportes.graficas')
    </div>
    <div class="container">
        
    </div>
</div>
    
@endsection
