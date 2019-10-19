@extends('layouts.gentela')
@section('content')
<div class="right_col container-fluid" role="main">
    @if(Auth::user()->idtipo=="4"):
        @include('VistasPorUsuario.administrador')
    @endif
    @if(Auth::user()->idtipo=="5"):
        
    @endif
    @if(Auth::user()->idtipo=="3"):
        @include('VistasPorUsuario.usuario')
    @endif
</div>
@endsection