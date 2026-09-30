<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');

Route::get('/login', fn() => Inertia::render('auth/login'))->name('login');
Route::post('login', [AuthController::class, 'login']);

Route::get('/signup', fn() => Inertia::render('auth/signup'))->name('signup');
Route::post('/signup', [AuthController::class, 'signup']);

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('dashboard'));
});
