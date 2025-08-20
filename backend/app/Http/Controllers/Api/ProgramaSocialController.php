<?php
// app/Http/Controllers/Api/ProgramaSocialController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProgramaSocial;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class ProgramaSocialController extends Controller
{
    public function index()
    {
        return new JsonResponse(ProgramaSocial::latest()->get(), 200, [], JSON_UNESCAPED_SLASHES);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'target_population' => 'nullable|string',
            'requirements' => 'nullable|string',
            'image' => 'required|image|max:10240', // Límite de 10MB
        ]);

        $path = $request->file('image')->store('programas', 'public');

        $programa = ProgramaSocial::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'target_population' => $validated['target_population'],
            'requirements' => $validated['requirements'],
            'image_url' => $path,
        ]);

        return new JsonResponse($programa, 201, [], JSON_UNESCAPED_SLASHES);
    }

    public function show(ProgramaSocial $programaSocial)
    {
        return new JsonResponse($programaSocial, 200, [], JSON_UNESCAPED_SLASHES);
    }

    public function destroy(ProgramaSocial $programaSocial)
    {
        if ($programaSocial->image_url) {
            Storage::disk('public')->delete($programaSocial->getRawOriginal('image_url'));
        }
        $programaSocial->delete();
        return response()->noContent();
    }
}