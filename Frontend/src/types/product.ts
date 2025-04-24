export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  condition: "Used" | "New";
  images: string;
  category: "Electronics" | "Clothing" | "Furniture" | "Books";
  userID: string;
  status: "available" | "sold";
}
