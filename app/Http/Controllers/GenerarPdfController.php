<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use PDF;

class GenerarPDFController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function GenerarPDF($ruta, $tipo)
    {
        // $data = $datos;
        // $date = date('Y-m-d');
        $view =  \View::make($ruta)->render();
        $pdf = \App::make('dompdf.wrapper');
        $pdf->loadHTML($view);
        $pdf->setPaper('A4', $tipo);
        return $pdf->stream('reporte');
    //     if($tipo==2){return $pdf->download('reporte.pdf'); }
    // 
    }
}
