<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Indicadores extends Model
{
    protected $table = "indicadores";
    protected $primaryKey = "id";
    public $timestamps = false;
}
