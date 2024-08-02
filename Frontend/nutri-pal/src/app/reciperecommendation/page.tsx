'use client'

import { Layout } from "@/components/layout/Layout";
import { RecipeForm } from "@/components/recipeRecommendation/RecipeForm";
import { RecipeResult } from "@/components/recipeRecommendationResult/RecipeResult";
import '@/styles/reciperecommendation.css'
import { useEffect, useState } from "react";
import { Recipe, userData } from "../consts";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { Loading } from "@/components/loading/Loading";

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

    const [user, setUser] = useState<userData>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        })
    }, [])

    useEffect(() => {
        if (user) {
            setLoading(false)
        }
    }, [user])

    useEffect(() => {
        if (treeRecipes !== undefined && treeRecipes !== null) {
            setTopRecipe(treeRecipes.getTop(treeRecipes.root))
        }
    }, [treeRecipes])

    return (
        <Layout>
            {loading && <Loading />}
            <div className="recipe-recommendation-main-container">
                <div className="recipe-recommendation-form-container">
                    <RecipeForm setTreeRecipes={setTreeRecipes} />
                </div>
                <div className="recipe-recommendation-result-container">
                    <RecipeResult food={topRecipe?.recipe} />
                </div>
            </div>
        </Layout>
    )
}
