<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\InfocardController;
use App\Http\Controllers\Api\ProyectoController;
/*
|--------------------------------------------------------------------------
| Rutas Públicas (no requieren autenticación)
|--------------------------------------------------------------------------
*/

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