<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = ['username', 'email', 'password', 'role'];

    public function favoriteRecipes()
    {
        return $this->belongsToMany(Recipe::class, 'favorites', 'user_id', 'recipe_id');
    }

    public function mealPlans()
    {
        return $this->hasMany(MealPlan::class, 'user_id');
    }

    // Méthodes requises par JWTSubject
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
