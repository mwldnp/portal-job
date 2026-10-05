<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VacancyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');

Route::get('/login', fn() => Inertia::render('auth/login'))->name('login');
Route::post('login', [AuthController::class, 'login']);

Route::get('/signup', fn() => Inertia::render('auth/signup'))->name('signup');
Route::post('/signup', [AuthController::class, 'signup']);

Route::middleware(['auth'])->group(function () {

    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/admin', fn() => Inertia::render('dashboard/index'));
    Route::resource('admin/user', UserController::class)->except(['create', 'show', 'edit']);

    Route::resource('admin/department', DepartmentController::class)->except(['create', 'show', 'edit']);
    Route::resource('admin/vacancy', VacancyController::class)->except(['create', 'show', 'edit']);
    // Route::get('/admin/department', fn() => Inertia::render('dashboard/department/index'));
    // Route::get('/admin/vacancy', fn() => Inertia::render('dashboard/'));
    // Route::get('/admin/applicant', fn() => Inertia::render('dashboard/'));
});
