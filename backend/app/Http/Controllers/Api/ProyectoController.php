<?php
// app/Http/Controllers/Api/ProyectoController.php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Proyecto;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProyectoController extends Controller
{
    public function index()
    {
        return new JsonResponse(Proyecto::latest()->get(), 200, [], JSON_UNESCAPED_SLASHES);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string',
            'image' => 'required|image|max:2048',
        ]);

        $path = $request->file('image')->store('proyectos', 'public');

        $proyecto = Proyecto::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'icon' => $validated['icon'],
            'image_url' => $path,
        ]);

        return new JsonResponse($proyecto, 201, [], JSON_UNESCAPED_SLASHES);
    }

    public function show(Proyecto $proyecto)
    {
        return new JsonResponse($proyecto, 200, [], JSON_UNESCAPED_SLASHES);
    }

    public function update(Request $request, Proyecto $proyecto)
    {
        // Nota: Una lógica de actualización de imagen real sería más compleja.
        // Esto es un ejemplo básico.
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string',
        ]);

        $proyecto->update($validated);
        return new JsonResponse($proyecto, 200, [], JSON_UNESCAPED_SLASHES);
    }

    public function destroy(Proyecto $proyecto)
    {
        // Opcional: Eliminar la imagen del storage
        // Storage::disk('public')->delete($proyecto->image_url);
        
        $proyecto->delete();
        return response()->noContent();
    }
}