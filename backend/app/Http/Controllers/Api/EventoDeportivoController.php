<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\EventoDeportivo;
use Illuminate\Support\Facades\Storage;

class EventoDeportivoController extends Controller
{
     public function index()
    {
        // Ordenamos por fecha del evento, los más nuevos primero
        return new JsonResponse(EventoDeportivo::latest('event_date')->get(), 200, [], JSON_UNESCAPED_SLASHES);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'nullable|string',
            'event_date' => 'nullable|date',
            'image' => 'required|image|max:2048',
        ]);

        $path = $request->file('image')->store('eventos', 'public');

        $evento = EventoDeportivo::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'location' => $validated['location'],
            'event_date' => $validated['event_date'],
            'image_url' => $path,
        ]);

        return new JsonResponse($evento, 201, [], JSON_UNESCAPED_SLASHES);
    }

    public function show(EventoDeportivo $evento)
    {
        return new JsonResponse($evento, 200, [], JSON_UNESCAPED_SLASHES);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
public function destroy(EventoDeportivo $evento)
{
    if ($evento->image_url) {
        Storage::disk('public')->delete($evento->image_url);
    }

    $evento->delete();
    return response()->noContent();
}

}
