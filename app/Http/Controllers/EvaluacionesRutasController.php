<?php

namespace App\Http\Controllers;

use App\MetaEvaluacion;
use App\EvaluacionPoa;
use App\Meta;
use Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EvaluacionesRutasController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\EvaluacionesRutas  $evaluacionesRutas
     * @return \Illuminate\Http\Response
     */
    public function show(EvaluacionesRutas $evaluacionesRutas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\EvaluacionesRutas  $evaluacionesRutas
     * @return \Illuminate\Http\Response
     */
    public function edit(EvaluacionesRutas $evaluacionesRutas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\EvaluacionesRutas  $evaluacionesRutas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, EvaluacionesRutas $evaluacionesRutas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\EvaluacionesRutas  $evaluacionesRutas
     * @return \Illuminate\Http\Response
     */
    public function destroy(EvaluacionesRutas $evaluacionesRutas)
    {
        //
    }
    public function ObtenerEvaluaciones()
    {
        $users = DB::table('evaluacion_poa')
            ->join('meta_evaluacion', 'evaluacion_poa.id', '=', 'meta_evaluacion.id_evaluacion')
            ->join('meta', 'meta_evaluacion.idmeta_evaluacion', '=', 'meta.idmetas')
            ->select('evaluacion_poa.estado','evaluacion_poa.fecha_inicio',
                        'evaluacion_poa.fecha_fin', 'meta.descripcion',
                        'meta_evaluacion.idmeta_evaluacion','meta_evaluacion.porcentaje_evaluado',
                        'meta_evaluacion.evidencia')
            ->get();
        return response::json($users);
    }
}
