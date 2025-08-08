<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController; // Se importa el controlador correcto

/*
|--------------------------------------------------------------------------
| Rutas Públicas (No requieren autenticación)
|--------------------------------------------------------------------------
|
| Rutas para que un usuario pueda registrarse e iniciar sesión.
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Rutas Protegidas (Requieren autenticación)
|--------------------------------------------------------------------------
|
| Estas rutas solo son accesibles para usuarios que ya han iniciado sesión.
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']); // Para obtener los datos del usuario
});