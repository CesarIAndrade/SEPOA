<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notificaciones extends Model
{
    //
    protected $table = "notificaciones";
    protected $primaryKey = "id";
    public $timestamps = false;
}
