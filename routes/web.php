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
    Route::prefix('master')->group(function () {
        Route::get('/', function () {
            return Inertia::render('masters/index');
        })->name('master');

        // Master - Users
        Route::prefix('user')->group(function () {
            Route::get('/', function () {
                return Inertia::render('masters/users/index');
            })->name('master.user');

            Route::get('admin', function () {
                return Inertia::render('masters/users/admin/index');
            })->name('master.user.admin');

            Route::get('sales', function () {
                return Inertia::render('masters/users/sales/index');
            })->name('master.user.sales');

            Route::get('supplier', function () {
                return Inertia::render('masters/users/supplier/index');
            })->name('master.user.supplier');

            Route::get('customer', function () {
                return Inertia::render('masters/users/customer/index');
            })->name('master.user.customer');
        });

        Route::get('branch', function () {
            return Inertia::render('masters/branch/index');
        })->name('master.branch');

        Route::get('financial-year', function () {
            return Inertia::render('masters/financial-year/index');
        })->name('master.financial-year');
    });

    // Supplier
    Route::prefix('supplier')->group(function () {
        Route::get('/', function () {
            return Inertia::render('supplier/index');
        })->name('supplier');
    });

    // Maid
    Route::prefix('maid')->group(function () {
        Route::get('/', function () {
            return Inertia::render('maid/index');
        })->name('maid');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
