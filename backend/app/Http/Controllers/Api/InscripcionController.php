<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inscripcion;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class InscripcionController extends Controller
{

     public function index()
    {
        // Usamos with('eventoDeportivo') para cargar la información del evento
        // junto con cada inscripción. Esto es muy eficiente.
        $inscripciones = Inscripcion::with('eventoDeportivo')->latest()->get();

        return new JsonResponse($inscripciones, 200, [], JSON_UNESCAPED_SLASHES);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'evento_deportivo_id' => 'required|exists:evento_deportivos,id',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone_number' => 'nullable|string|max:20',
        ]);

        $inscripcion = Inscripcion::create($validated);

        return response()->json([
            'message' => '¡Inscripción exitosa! Nos pondremos en contacto contigo pronto.',
            'data' => $inscripcion
        ], 201);
    }
    public function show(Inscripcion $inscripcion)
    {
        return new JsonResponse($inscripcion, 200, [], JSON_UNESCAPED_SLASHES);
    }

     public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}



