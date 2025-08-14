<?php

namespace App\Http\Controllers;

use App\Models\Infocard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\JsonResponse; 
class InfocardController extends Controller
{
   /**
     * Muestra una lista de todas las infocards.
     */
     public function index()
    {
        $infocards = Infocard::all();

        return new JsonResponse($infocards, 200, [], JSON_UNESCAPED_SLASHES);
    }
    /**
     * Almacena una nueva infocard en la base de datos.
     */
     public function store(Request $request)
    {
        // 1. La validación sigue siendo la misma
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|max:2048', // 2MB max
        ]);

        // 2. Guardamos la imagen en el disco público
        // Laravel automáticamente generará un nombre único para el archivo
        // y lo guardará dentro de 'storage/app/public/infocards'
        $path = $request->file('image')->store('infocards', 'public');

        // 3. Creamos el registro en la base de datos con la ruta del archivo
        $infocard = Infocard::create([
            'title' => $request->title,
            'description' => $request->description,
            'image_url' => $path, // Guardamos la ruta relativa, ej: "infocards/random_name.jpg"
        ]);

        return response()->json($infocard, 201);
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
