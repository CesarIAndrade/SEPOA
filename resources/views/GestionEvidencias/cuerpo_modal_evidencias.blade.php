<div class = "row">
    <div class="col-md-6">
        <div class="form-group has-feedback">
            <label for="id_porcentaje_esperado">{{ __('Porcentaje esperado') }}</label>
            <input id="id_porcentaje_esperado"  value="" type="text" class="form-control" disabled>
        </div>
    </div>
    <div class="col-md-6">
        <div class="form-group has-feedback">
            <label for="id_porcentaje_cumplido">{{ __('Porcentaje cumplido') }}</label>
            <input autocomplete="off" name="porcentaje_cumplido" id="id_porcentaje_cumplido" value="" type="text" class="form-control" required autofocus>
        </div>
    </div>
    <div class="col-md-12" id="contenido_evidencia">
        <div class="form-group has-feedback">
            <label for="archivo_disponible">{{ __('Archivo disponible') }}</label>
            <input id="archivo_disponible" type="text" class="form-control" disabled>
        </div>
    </div>
</div> 

<div class="form-div" id="id_evidencias" style = "display:flex; justify-content: flex-end;">
    <label class ="btn btn-info" for="archivo_subido">
        <span id = "nombre_archivo">Subir Archivo</span>
    </label>
    <input multiple = "true" style = "display:none" autocomplete="off" id="archivo_subido" class="form-control" type="file" name="archivo_subido" accept=".pdf" required >
</div>

<script>
    $(document).ready(function(){
        $('#archivo_subido').on('change', function(e){
            var files = $(this)[0].files;
            if(files.length >= 2){
                $('#nombre_archivo').text(files.length + " archivos seleccionados");              
            }
            else{
                var file = e.target.value.split('\\').pop();
                $('#nombre_archivo').text(file);
            }
        })
    })
</script>
