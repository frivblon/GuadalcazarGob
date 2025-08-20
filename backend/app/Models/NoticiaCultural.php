<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NoticiaCultural extends Model
{
    use HasFactory;

protected $table = 'noticia_cultural'; 

    protected $fillable = ['title', 'description', 'location', 'event_date', 'image_url'];

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