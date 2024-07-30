'use client'

import { Layout } from "@/components/layout/Layout";
import { RecipeForm } from "@/components/recipeRecommendation/RecipeForm";
import '@/styles/reciperecommendation.css'
import { useEffect, useState } from "react";

type NutrientContent = {
    label: string;
    quantity: number;
    unit: string;
}

type Nutrient = {
    ENERC_KCAL: NutrientContent;
    FAT: NutrientContent;
    CHOCDF: NutrientContent;
    PROCNT: NutrientContent;
}

type Recipe = {
    label: string;
    image: string;
    url: string;
    dietLabels: string[];
    healthLabels: string[];
    cautions: string[];
    ingredientLines: string[];
    totalTime: string;
    cuisineType: string[];
    mealType: string[];
    totalNutrients: Nutrient;
}

type NodeAVL = {
    rank: number;
    recipe: Recipe;
    height: number;
    left: NodeAVL;
    right: NodeAVL;
}

type AVLTree = {
    root: NodeAVL;
    getTop: Function;
    deleteTop: Function;
}

export default function RecipeRecommendation() {
    const [treeRecipes, setTreeRecipes] = useState<AVLTree | null>(null)
    const [topRecipe, setTopRecipe] = useState<NodeAVL | null>(null)

    useEffect(() => {
        if (treeRecipes !== undefined && treeRecipes !== null) {
            setTopRecipe(treeRecipes.getTop(treeRecipes.root))
        }
    }, [treeRecipes])

    return (
        <Layout>
            <div className="recipe-recommendation-main-container">
                <div className="recipe-recommendation-form-container">
                    <RecipeForm setTreeRecipes={setTreeRecipes} />
                </div>
                <div className="recipe-recommendation-result-container">
                    a
                </div>
            </div>
        </Layout>
    )
}
