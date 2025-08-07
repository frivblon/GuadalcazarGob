<?php
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::controller(ProductController::class)->group(function () {
    Route::get('/products', 'index');
    Route::post('/product', 'store');
    Route::get('/product/{id}', 'show');
    Route::put('/product/{id}', 'update');
    Route::delete('/product/{id}', 'destroy');
});

// Rutas de autenticación
Route::post('/login', [AuthController::class, 'login']);

// ⬅️ Todas tus rutas protegidas deben estar aquí, en un solo grupo de middleware.
Route::middleware('auth:sanctum')->group(function () {
    // Rutas para el usuario autenticado
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Ejemplo de una ruta protegida
    // Si necesitas este controlador, asegúrate de importarlo en la parte superior
    // Route::get('/profile', [SomeOtherController::class, 'showProfile']);
    
});

// Rutas de registro (opcional)
Route::post('/register', [AuthController::class, 'register']);
// Rutas de prueba (opcional, para verificar que la API está funcionando)
Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});