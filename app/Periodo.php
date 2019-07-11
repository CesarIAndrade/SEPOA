<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Periodo extends Model
{
    //
    protected $table = "periodo_poa";
    protected $primaryKey = "id";
    public $timestamps = false;
}
