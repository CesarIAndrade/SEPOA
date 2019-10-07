<div class = "row">
    <div class="col-md-6">
        <div class="form-group has-feedback">
            <label for="id_porcentaje_cumplido">{{ __('Porcentaje Cumplido') }}</label>
            <input autocomplete="off" id="id_porcentaje_cumplido" value="" type="number" min="0" class="form-control" disabled>
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group has-feedback">
            <label for="id_porcentaje_evaluado">{{ __('Porcentaje Evaluado') }}</label>
            <input autocomplete="off" name="porcentaje_evaluado" id="id_porcentaje_evaluado" value="" type="number" min="0" class="form-control" required autofocus>
        </div>
    </div>
    <div class="col-md-2">
        <div class="form-group has-feedback row">
            <label class="col-md-12" for="id_observacion_gregar"><center>{{ __('Observación') }}</center></label>
            <div class="col-md-3"></div>
            <a id="id_observacion_gregar" data-toggle="tooltip" title="Agregar observación sobre porcentaje evaluado" class="btn btn-success col-md-5">+</a>
        </div>
    </div>
    <div class="col-md-9"></div>
    <div id="div_observacion_agregar" class="col-md-3">
        <div class="form-group has-feedback">
            <textarea id="id_observacion_agregada" name="observacion_agregada" placeholder="Ingrese observaciones aquí" rows="5" cols="40" ></textarea>
        </div>
    </div>
</div> 