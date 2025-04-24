import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.route";
import { UserRoutes } from "../module/users/user.routes";
import { ListingRoutes } from "../module/listings/listing.route";

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
    path: '/listings',
    route: ListingRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;