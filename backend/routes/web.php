<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;

Route::get('/', function () {
    return view('welcome');
});

/*Esta ruta muestra el formulario de inicio de sesión es de tipo GET llama al metodo 
showLoginForm del Login Controller*/
Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');

/* Esta ruta procesa el formulario de login. Es decir, cuando el usuario envía sus 
credenciales, este método verifica si son correctas e inicia la sesión es de tipo POST
y llama al metodo login del Login Controller*/ 
Route::post('login', [LoginController::class, 'login']);

/*Esta ruta se usa para cerrar sesión, es de tipo POST y llama al metodo logout del LoginController */
Route::post('logout', [LoginController::class, 'logout'])->name('logout');
