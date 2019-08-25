<div class="modal fade modal_gestion_periodos" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id = "modal_evaluar_evidencia" val="">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Evaluar de Evidencias</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
                <form id="formulario_evaluacion_evidencias">    
                <div class="modal-body">
                    @include('EvaluacionEvidencias.cuerpo_modal_evaluar_evidencias')
                    @include('EvaluacionEvidencias.tabla_evidencias')
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" ><i class="glyphicon glyphicon-floppy-disk"></i> Guardar cambios</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-times-circle"></i> Cerrar</button>
                </div>
            </form>
        </div>
    </div>
</div>