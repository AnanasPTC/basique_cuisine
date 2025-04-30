<?php

use App\Http\Controllers\RecipeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MealPlanController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

Route::apiResource('users', UserController::class);
Route::apiResource('recipes', RecipeController::class);
Route::apiResource('categories', CategoryController::class);
Route::middleware('auth:api')->group(function () {
    Route::post('/meal-plans/generate', [MealPlanController::class, 'generate']);
    Route::get('/meal-plans', [MealPlanController::class, 'index']);
    Route::post('/meal-plans', [MealPlanController::class, 'store']);
    Route::get('/meal-plans/{id}', [MealPlanController::class, 'show']);
    Route::put('/meal-plans/{id}', [MealPlanController::class, 'update']);
    Route::delete('/meal-plans/{id}', [MealPlanController::class, 'destroy']);
});
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::delete('/recipes/{id}', [RecipeController::class, 'destroy']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:api')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:api')->get('/me', [AuthController::class, 'me']);
