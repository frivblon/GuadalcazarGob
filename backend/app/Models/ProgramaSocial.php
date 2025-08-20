<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramaSocial extends Model
{
    use HasFactory;

    protected $table = 'programa_social';

    protected $fillable = ['title', 'description', 'target_population', 'requirements', 'image_url'];

    protected function imageUrl(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? config('app.url') . '/storage/' . $value : null,
        );
    }
}