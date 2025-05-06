/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// add product
export const addProduct = async (productData: FormData): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings`, {
            method: "POST",
            body: productData,
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value || "",
            },
        });
        revalidateTag("Product");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};

export const getAllProducts = async (
    page?: string,
    limit?: string,
    query: { [key: string]: string | string[] | undefined } = {}
) => {
    try {
        const params = new URLSearchParams();

        // Map query keys safely
        if (query.price) {
            params.append("minPrice", "0");
            params.append("maxPrice", String(query.price));
        }
        if (query.categories) params.append("categories", String(query.categories));
        if (query.condition) params.append("condition", String(query.condition));
        if (query.location) params.append("location", String(query.location));
        if (query.searchTerm) params.append("searchTerm", String(query.searchTerm));

        // Add pagination if available
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);

        const url = `${process.env.NEXT_PUBLIC_BASE_API}/listings?${params.toString()}`;

        const res = await fetch(url, {
            next: { tags: ["Product"] },
            cache: "force-cache", // optional for better caching
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        console.error("getAllProducts error:", error);
        return { error: (error as Error).message };
    }
};


export const getSingleProduct = async (id: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/listings/${id}`,
            {
                next: { tags: ["Product"] },
                cache: "force-cache",
            }
        );

        if (!res.ok) {
            throw new Error(`Failed to fetch product: ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        console.error("getSingleProduct error:", error);
        return { error: (error as Error).message };
    }
};


export const deleteProduct = async (id: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/listings/${id}`,
            {
                method: "DELETE",
            }
        );
        revalidateTag("Product");

        return await res.json();
    } catch (error: any) {
        return new Error(error.message);
    }
};

export const updateProduct = async (
    productData: FormData,
    id: string
): Promise<any> => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/listings/${id}`,
            {
                method: "PUT",
                body: productData,
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
            }
        );
        revalidateTag("Product");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};

export const changeProductStatus = async (
    id: string,
    status: string
): Promise<any> => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/listings/${id}/status`,
            {
                method: "PATCH",
                body: JSON.stringify({ status }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
            }
        );
        revalidateTag("Product");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};