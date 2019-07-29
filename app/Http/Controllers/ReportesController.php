<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Response;
class ReportesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function ObtenerArea($id){
        $area = DB::table('area_proyecto')
                // ->where('area_proyecto.id_area_proyecto',$id)
                ->join('proyectos', 'proyectos.idAreaPoa', '=', 'area_proyecto.id_area_proyecto')
                ->join('indicadores', 'indicadores.idProyecto', '=', 'proyectos.id')
                ->join('meta','meta.id_indicador','=','indicadores.id')
                ->join('meta_evaluacion','meta_evaluacion.id_meta','=','meta.idmetas')
                ->join('evaluacion_poa', 'evaluacion_poa.id', '=', 'meta_evaluacion.id_evaluacion')
                ->join('periodo_poa', 'periodo_poa.id', '=', 'evaluacion_poa.id_poa')
                ->where('evaluacion_poa.estado','E')->where('evaluacion_poa.id_poa',$id)
                ->orderby('area_proyecto.nombre')
                ->select('area_proyecto.nombre as area',
                        'meta_evaluacion.porcentaje',
                        'meta_evaluacion.porcentaje_evaluado',
                        'periodo_poa.id as id_periodo_poa'
                        )
                ->get();
        return response::json($area);
    }
    public function ObtenerPorcentajePeriodos($id){
        $periodos = DB::table('evaluacion_poa')
                ->where('estado','E')
                ->join('meta_evaluacion', 'evaluacion_poa.id', '=', 'meta_evaluacion.id_evaluacion')
                ->select('evaluacion_poa.etapa','meta_evaluacion.porcentaje',
                'meta_evaluacion.porcentaje_evaluado')
                ->get();
        return response::json($periodos);
    }
    
}

// ->select('area_proyecto.id_area_proyecto',
//                 'area_proyecto.nombre as area',
//                 'proyectos.descripcion as proyecto',
//                 'indicadores.descripcion as indicador',
//                 'meta.descripcion as decripcionMeta',
// $area = DB::table('area_proyecto')
//                 ->where('area_proyecto.id_area_proyecto',$id)
//                 ->join('proyectos', 'proyectos.idAreaPoa', '=', 'area_proyecto.id_area_proyecto')
//                 ->join('evaluacion_poa', 'evaluacion_poa.id_poa', '=', 'proyectos.id_periodo_poa')
//                 ->where('evaluacion_poa.estado','E')
//                 ->join('meta_evaluacion', 'evaluacion_poa.id', '=', 'meta_evaluacion.id_evaluacion')
//                 ->join('meta','meta_evaluacion.id_meta','=','meta.idmetas')
//                 ->select('area_proyecto.id_area_proyecto','area_proyecto.nombre as area','proyectos.descripcion as proyecto',
//                 'evaluacion_poa.etapa as etapaEvaluacion','meta_evaluacion.porcentaje','meta_evaluacion.porcentaje_evaluado', 
//                 'meta.descripcion as decripcionMeta')
//                 ->get();