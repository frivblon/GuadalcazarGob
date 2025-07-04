<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Este namespace se aplica a los controladores cuando se usa
     * ->namespace($this->namespace). Si no lo definieras, 
     * deberías quitar esa llamada en boot().
     */
    protected $namespace = 'App\\Http\\Controllers';

    /**
     * Ruta a la que se redirige tras login.
     */
    public const HOME = '/home';

    /**
     * Define las rutas del proyecto.
     */
    public function boot()
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            // Rutas API: usa el middleware "api" y prefix "api"
            Route::prefix('api')
                 ->middleware('api')
                 ->namespace($this->namespace)
                 ->group(base_path('routes/api.php'));

            // Rutas web
            Route::middleware('web')
                 ->namespace($this->namespace)
                 ->group(base_path('routes/web.php'));
        });
    }

    /**
     * Configura el rate limiter para la API.
     */
    protected function configureRateLimiting()
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)
                        ->by(optional($request->user())->id ?: $request->ip());
        });
    }
}
