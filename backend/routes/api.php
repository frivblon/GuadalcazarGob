<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aquí registras las rutas de tu API. Se cargan dentro del grupo de
| middleware "api" definido en RouteServiceProvider.
|
*/

// Fíjate en el punto y coma al final de esta línea:
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});  // <–– aquí

// Ahora ya puede arrancar el siguiente grupo sin errores de sintaxis
Route::controller(ProductController::class)->group(function () {
    Route::get('/products',  'index');
    Route::post('/products', 'store');
    Route::get('/products/{id}', 'show');
    Route::put('/products/{id}', 'update');
    Route::delete('/products/{id}', 'destroy');
});
