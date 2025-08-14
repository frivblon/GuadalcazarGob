<?php
// app/Models/Proyecto.php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proyecto extends Model
{
    use HasFactory;

    // Campos que se pueden llenar masivamente
    protected $fillable = ['title', 'description', 'image_url', 'icon'];

    /**
     * Convierte la ruta de la imagen en una URL completa.
     */
    protected function imageUrl(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? config('app.url') . '/storage/' . $value : null,
        );
    }
}