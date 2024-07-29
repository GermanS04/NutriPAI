import { Layout } from "@/components/layout/Layout";
import { RecipeForm } from "@/components/recipeRecommendation/RecipeForm";
import '@/styles/reciperecommendation.css'

export default function RecipeRecommendation() {
    return (
        <Layout>
            <div className="recipe-recommendation-main-container">
                <div className="recipe-recommendation-form-container">
                    <RecipeForm />
                </div>
                <div className="recipe-recommendation-result-container">
                    a
                </div>
            </div>
        </Layout>
    )
}
