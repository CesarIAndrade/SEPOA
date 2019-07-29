<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();

// Home
Route::get('/', function () {
    return view('welcome');
});
Route::get('/home', 'HomeController@index')->name('home');

// Gestion de evidencias
Route::get('/evidencias', function () {
    return view('GestionEvidencias.gestion_evidencias');
})->middleware('auth');
Route::resource('/evidencia', 'MetaEvaluacionController');
Route::get('/MetaEvaluacion/{id}', 'MetaEvaluacionController@ObtenerEvaluacion');
Route::post('/subirEvidencia/{id}', 'MetaEvaluacionController@GuardarArchivo');
Route::get('/buscarEvidencia/{id}', 'MetaEvaluacionController@buscar');
Route::post('/evaluarEvidencia/{id}', 'MetaEvaluacionController@GuardarEvaluacion');

// Periodos 
Route::get('/periodo', function () {
    return view('GestionPeriodo.gestion_periodo');
})->middleware('auth');;
Route::resource('/periodos', 'PeriodoController');

// Evaluacion Periodos
Route::resource('/evaluacion_poa', 'EvaluacionPoaController');
Route::get('poaActivos','EvaluacionPoaController@obtenerActivos');
Route::put('/periodo/{id}', 'EvaluacionPoaController@actualizar_periodo_evaluacion');
Route::get('evaluacion_poas/{id}','EvaluacionPoaController@BuscarPeriodo');
Route::get('evaluacion_poaE/{id}','EvaluacionPoaController@obtenerEtapasPeriodos');

// Indicadores
Route::resource('/indicador', 'IndicadoresController');
Route::get('/Indicador/{id}', 'IndicadoresController@buscar');

// Metas
Route::resource('/meta', 'MetaController');
Route::get('/Meta/{id}', 'MetaController@buscar');

// Proyectos
Route::resource('/proyecto', 'ProyectosController');

// Evaluacion Evidencias
Route::get('/evaluacion_evidencias', function () {
    return view('EvaluacionEvidencias.evaluacion_evidencias');
})->middleware('auth');;

// EvaluacionMetas para llenar la tabla
Route::get('/evaluacionRutas', 'EvaluacionesRutasController@ObtenerEvaluaciones');

//Obtiene las areas y su repectivo porcentaje de cumplimiento
Route::get('/obtenerAreas/{id}', 'ReportesController@ObtenerArea');

//Obtiene las los periodos y sus repectivos porcentajes de cumplimiento
Route::get('/obtenerPorcentaje/{id}', 'ReportesController@ObtenerPorcentajePeriodos');


// Reportes
Route::get('/reporteP', function () {
    return view('Reportes.principal');
})->middleware('auth');;
Route::get('/reporteGenerate/{ruta}/{tipo}','GenerarPDFController@GenerarPDF');

// Notificaciones
Route::resource('/notificaciones', 'NotificacionesController');

// Pusher
Route::get('/pusher', function(){
    return view('pusher');
});
//retorna la vista de reportes de cumplimiento
Route::get('/estadistica_cumplimiento', function () {
    return view('Reportes.principal_reportes_web');
})->middleware('auth');;

//retorna los periodos de evaluacion