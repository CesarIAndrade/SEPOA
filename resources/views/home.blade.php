@extends('layouts.gentela')
@section('content')
<div class="right_col container-fluid" role="main">
    @if(Auth::user()->id_tipo_usuario=="1"):
        @include('VistasPorUsuario.administrador')
    @endif
    @if(Auth::user()->id_tipo_usuario=="2"):
        @include('VistasPorUsuario.supervisor')
    @endif
    @if(Auth::user()->id_tipo_usuario=="3"):
        @include('VistasPorUsuario.usuario')
    @endif
</div>
@endsection