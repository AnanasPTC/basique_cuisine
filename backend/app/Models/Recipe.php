<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'cost_level',
        'preparation_time',
        'calories',
        'category_id',
        'image',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function usersWhoFavorited()
    {
        return $this->belongsToMany(User::class, 'favorites', 'recipe_id', 'user_id');
    }
}
