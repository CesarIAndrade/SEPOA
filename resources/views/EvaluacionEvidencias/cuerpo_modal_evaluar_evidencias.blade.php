<div class = "row">
    <div class="col-md-6">
        <div class="form-group has-feedback">
            <label for="id_porcentaje_cumplido">{{ __('Porcentaje Cumplido') }}</label>
            <input autocomplete="off" id="id_porcentaje_cumplido" value="" type="number" min="0" class="form-control" disabled>
        </div>
    </div>
    <div class="col-md-6">
        <div class="form-group has-feedback">
            <label for="id_porcentaje_evaluado">{{ __('Porcentaje Evaluado') }}</label>
            <input autocomplete="off" name="porcentaje_evaluado" id="id_porcentaje_evaluado" value="" type="number" min="0" class="form-control" required autofocus>
        </div>
    </div>
</div> 