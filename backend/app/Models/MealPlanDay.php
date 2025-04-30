<?php

// app/Models/MealPlanDay.php
class MealPlanDay extends Model
{
    use HasFactory;

    protected $fillable = ['meal_plan_id', 'day'];

    public function mealPlan()
    {
        return $this->belongsTo(MealPlan::class);
    }

    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'meal_plan_day_recipe');
    }
}
