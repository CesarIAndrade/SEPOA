@extends('layouts.app')
@section('content')
    @include('Reportes.prueba')
    <div class="container">
        <a href='reporteGenerate/Reportes.prueba/portrait' target="_blank" class="btn btn-outline-success">Generar como pdf</a>
    </div>
    @include('Reportes.graficas')
    <div class="container">
        <a href='reporteGenerate/Reportes.graficas/landscape' target="_blank" class="btn btn-outline-success">Generar como pdf</a>
    </div>
    <!-- <div class="container">
        <iframe src="https://docs.google.com/viewer?url={{asset('reporteGenerate/Reportes.prueba')}}&embedded=true" width="600" height="780" style="border: none;"></iframe>
    </div> -->
@endsection
