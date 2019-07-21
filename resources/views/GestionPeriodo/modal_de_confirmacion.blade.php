<div class="modal fade" data-backdrop="static" data-keyboard="false" id="modal_de_confirmacion" tabindex="-1" role="dialog" aria-hidden = "true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Confirmación</h5>
            <button id="id_cerrar_accion_periodo" type="button" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
          <center><p class="h5" id="id_cuerpo_info"></p></center>
          <div id="id_cuerpo_fechas">
            @include('GestionPeriodo.cuerpo_modal_periodo')
          </div>
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn btn-primary" id = "id_confirmar_accion_periodo">Confirmar</button>
            <button type="button" class="btn btn-secondary" id = "id_cancelar_accion_periodo" >Cancelar</button>
        </div>
    </div>
  </div>
</div>