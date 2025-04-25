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
    query?: { [key: string]: string | string[] | undefined }
) => {
    const params = new URLSearchParams();

    if (query?.price) {
        params.append("minPrice", "0");
        params.append("maxPrice", query?.price.toString());
    }

    if (query?.categories) {
        params.append("categories", query?.categories.toString());
    }

    if (query?.condition) {
        params.append("condition", query?.condition.toString());
    }

    if (query?.location) {
        params.append("location", query?.location.toString());
    }

    if (query?.searchTerm) {
        params.append("searchTerm", query?.searchTerm.toString());
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/listings?limit=${limit}&page=${page}&${params}`,
            {
                next: {
                    tags: ["Product"],
                },
            }
        );

        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};

export const getSingleProduct = async (id: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/listings/${id}`,
            {
                next: {
                    tags: ["Product"],
                },
            }
        );
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
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