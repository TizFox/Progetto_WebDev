import Stripe from "stripe";
import { SECRET_STRIPE_KEY } from "$env/static/private";

export const stripeAdmin = new Stripe(SECRET_STRIPE_KEY);
