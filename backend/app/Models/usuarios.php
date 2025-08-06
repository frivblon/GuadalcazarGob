<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticable;

class usuarios extends Authenticable
{
    use HasFactory;

    //Aqui hacemos referencia a la tabla usuarios que creamos
    protected $table = 'usuarios';

    //Estos son los atributos que utilizaremos
    protected $fillable = [
        'user_name',
        'user_pass',
        'user_tipo',
    ];

    //El password evidentemente de tipo hidden por seguridad
    protected $hidden = [
        'user_pass',
    ];

    //Esta funcion obtiene el password 
    public function getAuthPassword()
    {
        return $this -> user_pass;
    }

    //Esto es para que no se manejen los datos de fecha y hora en la tabla usuarios
    public $timestamps = false;
}
