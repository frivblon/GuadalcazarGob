<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * Los eventos de la aplicación y sus listeners asociados.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        // Añade aquí más eventos y listeners según necesites:
        // \App\Events\MiEvento::class => [ \App\Listeners\MiListener::class ],
    ];

    /**
     * Registra cualquier evento para tu aplicación.
     */
    public function boot()
    {
        parent::boot();
    }
}
