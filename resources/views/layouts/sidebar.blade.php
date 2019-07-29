<div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
    <div class="menu_section">
        <ul class="nav side-menu">
        @if(Auth::user()->id_tipo_usuario=="1"):
            <li><a href="periodo"><i class="fa fa-sliders"></i>Gestión de Periodos</a></li>
            <li><a href="evaluacion_evidencias"><i class="fa fa-check-square"></i>Evaluación de Evidencias</a></li>
            <li><a href="estadistica_cumplimiento"><i class="fa fa-bar-chart"></i>Resumen de cumplimiento</a></li>

        @endif
        @if(Auth::user()->id_tipo_usuario=="2"):
            <li><a href="reporteP"><i class="fa fa-file-text"></i>Reportes</a></li>
        @endif
        @if(Auth::user()->id_tipo_usuario=="3"):
            <li><a href="evidencias"><i class="fa fa-archive"></i>Gestión de Evidencias</a></li>
        @endif
        </ul>
    </div>
</div>