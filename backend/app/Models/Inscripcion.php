<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscripcion extends Model
{
    use HasFactory;

     protected $table = 'inscripciones';
    // Definimos los campos que se pueden llenar masivamente
    
    protected $fillable = [
        'evento_deportivo_id', 
        'full_name', 
        'email', 
        'phone_number'
    ];

    public function eventoDeportivo()
    {
        return $this->belongsTo(EventoDeportivo::class);
    }
}