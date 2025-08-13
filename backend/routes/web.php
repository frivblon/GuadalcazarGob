<?php
/*
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

Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['message' => 'CSRF cookie set']);
});


/*
|--------------------------------------------------------------------------
| Rutas Protegidas (Requieren autenticación)
|--------------------------------------------------------------------------
|
| Estas rutas solo son accesibles para usuarios que ya han iniciado sesión.
|
*/

/*
Route::middleware(['web', 'auth:sanctum'])->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']); // Devuelve datos del usuario

});*/