<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User; 
use Illuminate\Validation\ValidationException; // Importa esta clase para manejar errores de validación de forma más limpia
use Illuminate\Support\Facades\Hash;

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


    public function register(Request $request)
    {
        // 1. Validar los datos de entrada
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed', // 'confirmed' valida que password_confirmation sea igual
        ]);

        // 2. Crear el nuevo usuario
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // 3. Devolver una respuesta de éxito
        return response()->json([
            'message' => '¡Registro exitoso!',
            'user' => $user,
        ], 201); // El estado 201 indica que se ha creado un nuevo recurso
    }
}

    // Puedes añadir más métodos según sea necesario, como para restablecer contraseñas, etc.
