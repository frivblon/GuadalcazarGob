<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Las políticas de tu aplicación.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
            \App\Models\InfoCard::class => \App\Policies\InfoCardPolicy::class, // <-- Añade esta línea

    ];

    /**
     * Registra los servicios de autenticación / autorización.
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
