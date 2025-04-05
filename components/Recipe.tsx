import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RecipeProps {
  name: string;
  ingredients: string[];
  steps: string;
}

export default function Recipe({ name, ingredients, steps }: RecipeProps) {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-2">{name}</h1>
          <h2 className="text-lg font-semibold mt-4">Ingredients</h2>
          <ul className="list-disc list-inside mb-4">
            {ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <h2 className="text-lg font-semibold">Instructions</h2>
          <pre className="whitespace-pre-wrap mt-2 text-sm text-muted-foreground">
            {steps}
          </pre>
          <Button className="mt-6">Prep This Box</Button>
        </CardContent>
      </Card>
    </div>
  );
}
