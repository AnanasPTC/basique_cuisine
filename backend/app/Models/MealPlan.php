<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MealPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'budget',
        'target_calories',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Un programme peut contenir plusieurs repas par jour (recettes) pour chaque jour
    public function days()
    {
        return $this->hasMany(MealPlanDay::class);
    }
}
