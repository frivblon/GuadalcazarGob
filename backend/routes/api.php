<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\InfocardController; // <-- Importación añadida

/*
|--------------------------------------------------------------------------
| Rutas Públicas (no requieren autenticación)
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']); // <-- Movida aquí, fuera de la protección

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
    
    // Rutas para el usuario autenticado
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Rutas para gestionar Productos (ahora protegidas)
    Route::controller(ProductController::class)->group(function () {
        Route::get('/products', 'index');
        Route::post('/product', 'store');
        Route::get('/product/{id}', 'show');
        Route::put('/product/{id}', 'update');
        Route::delete('/product/{id}', 'destroy');
    });

    // Rutas para gestionar las Infocards (ahora protegidas)
    Route::apiResource('infocards', InfocardController::class);
});