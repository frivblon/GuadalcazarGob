<?php

namespace App\Http\Controllers;

use App\Models\Infocard;
use Illuminate\Http\Request;

class InfocardController extends Controller
{
    /**
     * Muestra una lista de todas las infocards.
     */
    public function index()
    {
        return response()->json(Infocard::all());
    }

    /**
     * Almacena una nueva infocard en la base de datos.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image_url' => 'required|url', // Valida que sea una URL válida
        ]);

        $infocard = Infocard::create($request->all());

        return response()->json($infocard, 201); // 201 Created
    }

    /**
     * Muestra una infocard específica. (Opcional, no usado directamente en el CRUD básico del frontend)
     */
    public function show(Infocard $infocard)
    {
        return response()->json($infocard);
    }

    /**
     * Actualiza una infocard existente en la base de datos.
     */
    public function update(Request $request, Infocard $infocard)
    {
        $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'image_url' => 'url',
        ]);

        $infocard->update($request->all());

        return response()->json($infocard, 200); // 200 OK
    }

    /**
     * Elimina una infocard de la base de datos.
     */
    public function destroy(Infocard $infocard)
    {
        $infocard->delete();

        return response()->noContent(); // 204 No Content
    }
}
