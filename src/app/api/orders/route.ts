import { NextResponse } from "next/server";
import { getOrders } from "@/domain/order/queries/getOrders.query";

export const GET = async () => {
  try {
    const orders = await getOrders();
    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
};
