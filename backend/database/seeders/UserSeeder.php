<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@guadalcazar.gob.mx',
            'password' => Hash::make('password123'), // ⬅️ Hashea la contraseña
        ]);
    }
}