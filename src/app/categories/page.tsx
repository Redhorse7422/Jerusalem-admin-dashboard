"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CategoriesTable } from "@/components/Categories";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { useGetAllCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } from "@/store/features/categories/categoriesApi";
import { useState, useEffect } from "react";

const CategoriesPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const { data, isLoading } = useGetAllCategoriesQuery({});
    const [createCategory] = useCreateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();

    useEffect(() => {
        if (data?.data?.categories) {
            setCategories(data.data.categories);
        }
    }, [data]);

    // Function to create a new category
    const handleCreateCategory = async (formData: { name: string; description: string }) => {
        try {
            const response = await createCategory(formData).unwrap(); // API call
            setCategories([...categories, response.data]); // Add new category to state
        } catch (error) {
            console.error("Error creating category:", error);
        }
    };

    // Function to delete a category
    const handleDeleteCategory = async (categoryId: string) => {
        try {
            await deleteCategory(categoryId).unwrap();
            setCategories(categories.filter(category => category.id !== categoryId)); // Remove category from UI
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    // Function to update a category
    const handleUpdateCategory = async (id: string, updatedData: { name: string; description: string }) => {
        try {
            const response = await updateCategory({ 'id': id, ...updatedData }).unwrap(); // API call
            setCategories((prevCategories) => prevCategories.map(cat => cat.id === id ? response.data : cat));
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };


    return (
        <>
            <Breadcrumb pageName="Categories" />
            {isLoading ? (
                <TopChannelsSkeleton />
            ) : (
                <CategoriesTable
                    categories={categories}
                    onCreateCategory={handleCreateCategory}
                    onDeleteCategory={handleDeleteCategory}
                    onUpdateCategory={handleUpdateCategory}
                />
            )}
        </>
    );
};

export default CategoriesPage;
