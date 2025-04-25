import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.route";
import { UserRoutes } from "../module/users/user.routes";
import { ListingRoutes } from "../module/listings/listing.route";
import { CategoryRoutes } from "../module/category/category.route";
import { WishlistRouters } from "../module/wishlist/wishlist.route";

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/listings',
    route: ListingRoutes,
  },
  {
    path: '/wishlists',
    route: WishlistRouters,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;