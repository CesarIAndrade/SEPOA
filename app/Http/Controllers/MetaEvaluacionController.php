<?php

namespace App\Http\Controllers;

use App\MetaEvaluacion;
use App\EvaluacionPoa;
use App\Meta;
use App\Indicadores;
use App\Proyectos;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Response;
use Storage;
class MetaEvaluacionController extends Controller
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
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\MetaEvaluacion  $metaEvaluacion
     * @return \Illuminate\Http\Response
     */
    public function show(MetaEvaluacion $metaEvaluacion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\MetaEvaluacion  $metaEvaluacion
     * @return \Illuminate\Http\Response
     */
    public function edit(MetaEvaluacion $metaEvaluacion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\MetaEvaluacion  $metaEvaluacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MetaEvaluacion $metaEvaluacion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\MetaEvaluacion  $metaEvaluacion
     * @return \Illuminate\Http\Response
     */
    public function destroy(MetaEvaluacion $metaEvaluacion)
    {
        //
    }

    public function ObtenerEvaluacion($id)
    {
        $metasEval=MetaEvaluacion::where('id_evaluacion', $id) ->get();
        return Response::json($metasEval);
    }

    public function buscar($id)
    {
        $metaeval=MetaEvaluacion::find($id);
        return Response::json($metaeval);
    }
    public function EliminarArchivo(Type $var = null)
    {
        # code...
    }
    public function GuardarArchivo(request $request, $id)
    {
        // dd($request->porcentaje_cumplido);
        $metaeval=MetaEvaluacion::find($id);
        if ($request->hasFile('archivo_subido')){ 
            $metaeval->porcentaje_cumplido=$request->porcentaje_cumplido;
            $archivo=$request->file('archivo_subido');
            $ruta=time().''.$archivo->getClientOriginalName();
            if ($metaeval->evidencia!=null):
                Storage::disk('ArchivosSubidos')->delete($metaeval->evidencia);
            endif;
            Storage::disk('ArchivosSubidos')->put($ruta, file_get_contents($archivo->getRealPath()));
            $metaeval->evidencia=$ruta;
            $metaeval->save();

            return Response::json($metaeval);
         } 
        
    }
    public function GuardarEvaluacion(request $request, $id)
    {
        $metaeval=MetaEvaluacion::find($id);
        if($request->porcentaje_cumplido!=null){
            $metaeval->porcentaje_evaluado=$request->porcentaje_evaluado;
            $metaeval->save();
            return Response::json($metaeval);  
        }
    }
    
}
