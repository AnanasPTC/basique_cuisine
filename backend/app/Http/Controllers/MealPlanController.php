<?php

namespace App\Http\Controllers;

use App\Models\MealPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MealPlanController extends Controller
{
    public function index()
    {
        // Récupère les plans de l'utilisateur connecté
        $plans = MealPlan::where('user_id', Auth::id())->get();
        return response()->json($plans);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'budget' => 'required|numeric',
            'target_calories' => 'required|integer',
            'days' => 'required|array|size:7',
            'days.*.recipes' => 'required|array',
        ]);

        $mealPlan = MealPlan::create([
            'name' => $request->name,
            'budget' => $request->budget,
            'target_calories' => $request->target_calories,
            'user_id' => auth()->id(),
        ]);

        foreach ($request->days as $dayIndex => $day) {
            $mealPlanDay = $mealPlan->days()->create([
                'day_index' => $dayIndex, // 0 = Lundi
            ]);
            $mealPlanDay->recipes()->sync($day['recipes']);
        }

        return response()->json($mealPlan->load('days.recipes'), 201);
    }


    public function show($id)
    {
        $plan = MealPlan::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        return response()->json($plan);
    }

    public function update(Request $request, $id)
    {
        $plan = MealPlan::where('id', $id)->where('user_id', Auth::id())->firstOrFail();

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'budget' => 'sometimes|required|numeric',
            'target_calories' => 'sometimes|required|numeric',
        ]);

        $plan->update($validated);

        return response()->json($plan);
    }

    public function destroy($id)
    {
        $plan = MealPlan::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        $plan->delete();

        return response()->json(null, 204);
    }

    public function generate(Request $request)
    {
        $validated = $request->validate([
            'target_calories' => 'required|integer|min:100',
            'budget' => 'required|in:€,€€,€€€',
        ]);

        $user = $request->user();

        // Création du programme
        $mealPlan = MealPlan::create([
            'name' => 'Programme personnalisé',
            'budget' => $validated['budget'],
            'target_calories' => $validated['target_calories'],
            'user_id' => $user->id,
        ]);

        // Générer pour 7 jours
        for ($i = 1; $i <= 7; $i++) {
            $day = $mealPlan->days()->create([
                'day' => now()->startOfWeek()->addDays($i - 1)->format('Y-m-d'),
            ]);

            // Sélection de 2-3 recettes aléatoires selon le budget
            $recipes = Recipe::where('cost_level', $validated['budget'])
                         ->inRandomOrder()
                         ->take(3)
                         ->get();

            $day->recipes()->attach($recipes->pluck('id'));
        }

        return response()->json([
            'message' => 'Programme généré avec succès',
            'data' => $mealPlan->load('days.recipes.category')
        ], 201);
    }

}
