<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User; // Asegúrate de importar tu modelo User
use Illuminate\Validation\ValidationException; // Importa esta clase para manejar errores de validación de forma más limpia

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // 1. Validar los datos de entrada
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // 2. Intentar autenticar al usuario
        if (!Auth::attempt($credentials)) {
            // Si la autenticación falla, lanza una excepción de validación
            // Laravel la convertirá automáticamente en una respuesta JSON 422
            throw ValidationException::withMessages([
                'email' => ['Las credenciales proporcionadas son incorrectas.'],
            ]);
        }

        // 3. Si la autenticación es exitosa, Laravel ya ha establecido la cookie de sesión.
        // No necesitas generar un token aquí para la autenticación de SPA.
        // Simplemente devuelve una respuesta sin contenido (o un mensaje de éxito simple).
        return response()->noContent(); // Responde con un estado 204 (No Content)
    }

    // Opcional: Un método para obtener los datos del usuario autenticado
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    // Opcional: Un método para cerrar sesión
    public function logout(Request $request)
    {
        Auth::guard('web')->logout(); // Cierra la sesión web
        $request->session()->invalidate(); // Invalida la sesión
        $request->session()->regenerateToken(); // Regenera el token CSRF

        return response()->noContent();
    }
}