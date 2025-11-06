import { NextResponse } from "next/server";
import { getOrders } from "@/core/queries/order/getOrders";

export const GET = async () => {
  try {
    const orders = await getOrders();
    return NextResponse.json(orders, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
