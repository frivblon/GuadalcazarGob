<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\NoticiaCultural;
use Illuminate\Support\Facades\Storage;

class NoticiaCulturalController extends Controller
{
    // Listar todas las noticias
    public function index()
    {
        return new JsonResponse(
            NoticiaCultural::latest('event_date')->get(),
            200,
            [],
            JSON_UNESCAPED_SLASHES
        );
    }

    // Crear nueva noticia
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'nullable|string',
            'event_date' => 'nullable|date',
            'image' => 'required|image|max:10240', // Máximo 10MB
        ]);

        $path = $request->file('image')->store('cultura', 'public');

        $noticia = NoticiaCultural::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'location' => $validated['location'] ?? null,
            'event_date' => $validated['event_date'] ?? null,
            'image_url' => $path,
        ]);

        return new JsonResponse($noticia, 201, [], JSON_UNESCAPED_SLASHES);
    }

    // Mostrar noticia individual
    public function show(NoticiaCultural $noticias_culturale)
    {
        return new JsonResponse($noticias_culturale, 200, [], JSON_UNESCAPED_SLASHES);
    }

    // Actualizar noticia (puedes completar según tus necesidades)
    public function update(Request $request, NoticiaCultural $noticias_culturale)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'location' => 'nullable|string',
            'event_date' => 'nullable|date',
            'image' => 'nullable|image|max:10240',
        ]);

        if ($request->hasFile('image')) {
            // Eliminar imagen anterior si existe
            if ($noticias_culturale->image_url) {
                Storage::disk('public')->delete($noticias_culturale->image_url);
            }
            $validated['image_url'] = $request->file('image')->store('cultura', 'public');
        }

        $noticias_culturale->update($validated);

        return new JsonResponse($noticias_culturale, 200, [], JSON_UNESCAPED_SLASHES);
    }

    // Eliminar noticia
    public function destroy(NoticiaCultural $noticias_culturale)
    {
        // Eliminar imagen si existe
        if ($noticias_culturale->image_url) {
            Storage::disk('public')->delete($noticias_culturale->image_url);
        }

        $noticias_culturale->delete();
        return response()->noContent();
    }
}
