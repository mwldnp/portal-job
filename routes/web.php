<?php

use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VacancyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'home'])->name('home');
Route::post('/', [HomeController::class, 'home']);

Route::middleware(['guest'])->group(function () {
    Route::get('/login', fn() => Inertia::render('auth/login'))->name('login')->middleware('guest');
    Route::post('login', [AuthController::class, 'login']);

    Route::get('/signup', fn() => Inertia::render('auth/signup'))->name('signup');
    Route::post('/signup', [AuthController::class, 'signup']);
});

Route::middleware(['auth', 'role.guest'])->group(function () {
    // Route::resource('/applicant', ApplicantController::class);
});

Route::middleware(['auth', 'role.admin'])->group(function () {

    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/admin', fn() => Inertia::render('dashboard/index'))->name('dashboard');

    Route::resource('admin/user', UserController::class)->except(['create', 'show', 'edit']);
    Route::resource('admin/department', DepartmentController::class)->except(['create', 'show', 'edit']);
    Route::resource('admin/vacancy', VacancyController::class)->except(['create', 'show', 'edit']);
});
