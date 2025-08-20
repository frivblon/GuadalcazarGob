<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\InfocardController;
use App\Http\Controllers\Api\ProyectoController;
use App\Http\Controllers\Api\EventoDeportivoController;
use App\Http\Controllers\Api\InscripcionController;
use App\Http\Controllers\Api\NoticiaCulturalController;
/*
|--------------------------------------------------------------------------
| Rutas Públicas (no requieren autenticación)
|--------------------------------------------------------------------------
*/

Route::apiResource('noticias-culturales', NoticiaCulturalController::class)
     ->only(['index', 'show'])
     ->parameters(['noticias-culturales' => 'noticias_culturale']);

// Rutas PÚBLICAS para inscripciones a eventos deportivos
Route::post('/inscripciones', [InscripcionController::class, 'store']);

//Rutas PÚBLICAS para ver los Eventos Deportivos
// Cualquiera puede ver la lista de eventos deportivos y un evento específico.
Route::apiResource('evento-deportivos', EventoDeportivoController::class)->only(['index', 'show']);

// --- RUTAS PÚBLICAS DE PROYECTOS---
Route::apiResource('proyectos', ProyectoController::class)->only(['index', 'show']);
// Rutas PÚBLICAS para ver las Infocards
// Cualquiera puede ver la lista de infocards y una infocard específica.
Route::apiResource('infocards', InfocardController::class)->only([
    'index', 'show'
]);


// Rutas para que un usuario pueda registrarse e iniciar sesión.
// ¡Estas deben estar fuera del grupo de autenticación!
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Ruta de prueba
Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

/*
|--------------------------------------------------------------------------
| Rutas Protegidas (requieren autenticación con Sanctum)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // Rutas PROTEGIDAS para Noticias Culturales
     Route::apiResource('noticias-culturales', NoticiaCulturalController::class)->except(['index', 'show'])
      ->parameters(['noticias-culturales' => 'noticias_culturale']);
    // Rutas PROTEGIDAS para inscripciones a eventos deportivos
        Route::get('/admin/inscripciones', [App\Http\Controllers\Api\InscripcionController::class, 'index']);

    // Rutas PROTEGIDAS para crear, actualizar y eliminar Eventos Deportivos.
    Route::apiResource('evento-deportivos', EventoDeportivoController::class)->except(['index', 'show']);
    // Rutas para modificar proyectos
    Route::apiResource('proyectos', ProyectoController::class)->except(['index', 'show']);

    // Rutas para el usuario autenticado
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Rutas para gestionar Productos (protegidas)
    Route::controller(ProductController::class)->group(function () {
        Route::get('/products', 'index');
        Route::post('/product', 'store');
        Route::get('/product/{id}', 'show');
        Route::put('/product/{id}', 'update');
        Route::delete('/product/{id}', 'destroy');
    });

    // Rutas PROTEGIDAS para crear, actualizar y eliminar Infocards.
    // Solo se registran las rutas que modifican datos.
    Route::apiResource('infocards', InfocardController::class)->except([
        'index', 'show'
    ]);
});