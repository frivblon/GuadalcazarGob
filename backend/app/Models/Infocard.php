<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Infocard extends Model
{
    use HasFactory;

    /**
     * Los atributos que se pueden asignar masivamente.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'image_url',
    ];

    /**
     * Convierte la ruta de la imagen almacenada en una URL completa.
     * Esta es la versión final que construye la URL manualmente.
     */
    protected function imageUrl(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? config('app.url') . '/storage/' . $value : null,
        );
    }
}