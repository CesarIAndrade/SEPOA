<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Meta extends Model
{
    protected $table = "meta";
    protected $primaryKey = "idmetas";
    public $timestamps = false;
}
