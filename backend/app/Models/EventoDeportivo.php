<?php
// app/Models/EventoDeportivo.php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventoDeportivo extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'location', 'event_date', 'image_url'];

    // Para que Laravel maneje el campo de fecha correctamente
    protected $casts = [
        'event_date' => 'date',
    ];

    protected function imageUrl(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? config('app.url') . '/storage/' . $value : null,
        );
    }
}