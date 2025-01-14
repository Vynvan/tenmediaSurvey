<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\JobOfferController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/api/categories', [CategoryController::class, 'apiIndex'])
    ->name('api.categories.index');

Route::get('/api/companies', [CompanyController::class, 'apiIndex'])
    ->name('api.companies.index');
    
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('categories', CategoryController::class)
    ->only(['index', 'store', 'update'])
    ->middleware(['auth', 'verified']);

Route::resource('companies', CompanyController::class)
    ->only(['index', 'store', 'update'])
    ->middleware(['auth', 'verified']);

Route::resource('jobOffers', JobOfferController::class)
    ->only(['index', 'store', 'update'])
    ->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';
