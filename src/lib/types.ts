import type { Database } from "$lib/database.types";

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type Cart = Database["public"]["Tables"]["cart"]["Row"];
export type Wishlist = Database["public"]["Tables"]["wishlist"]["Row"];
export type History = Database["public"]["Tables"]["history"]["Row"];
export type Order = Database["public"]["Tables"]["orders"]["Row"];

export type CartXProduct = Cart & { products: Product };
export type WishlistXProduct = Wishlist & { products: Product };
export type OrderXProduct = Order & { products: Product };
export type HistoryxOrderxProduct = History & { orders: OrderXProduct[] };
