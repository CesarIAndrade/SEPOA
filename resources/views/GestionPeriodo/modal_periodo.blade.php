<div data-backdrop="static" data-keyboard="false" class="modal fade modal_gestion_periodos" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id = "modal_apertura_periodo">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Apertura de periodos</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                @include('GestionPeriodo.tabla_evaluacion')
                @include('GestionPeriodo.modal_de_confirmacion')
            </div>
        </div>
    </div>
</div>