<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Masters
    Route::get('master', function () {
        return Inertia::render('masters/index');
    })->name('master');

    // Master - Users
    Route::prefix('user')->group(function () {
        Route::get('/', function () {
            return Inertia::render('masters/users/index');
        })->name('user');

        Route::get('admin', function () {
            return Inertia::render('masters/users/admin');
        })->name('user.admin');

        Route::get('sales', function () {
            return Inertia::render('masters/users/sales');
        })->name('user.sales');

        Route::get('supplier', function () {
            return Inertia::render('masters/users/supplier');
        })->name('user.supplier');

        Route::get('customer', function () {
            return Inertia::render('masters/users/customer');
        })->name('user.customer');
    });

    Route::get('branch', function () {
        return Inertia::render('masters/branch');
    })->name('branch');

    Route::get('financial-year', function () {
        return Inertia::render('masters/financial-year');
    })->name('financial-year');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
