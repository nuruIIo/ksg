import axios from "axios";
import NodeCache from "node-cache";
import { Request, Response } from "express";

const cache = new NodeCache({ stdTTL: 100 });

export const getItems = async (req: Request, res: Response) => {
  const cachedData = cache.get("items");
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await axios.get("https://api.skinport.com/v1/items", {
      params: {
        app_id: 730,
        currency: "USD",
      },
    });

    const items = response.data.map((item: any) => {
      const tradablePrice =
        item.prices?.find((p: any) => p.tradable)?.price || null;
      const nonTradablePrice =
        item.prices?.find((p: any) => !p.tradable)?.price || null;
      return {
        ...item,
        min_tradable_price: tradablePrice,
        min_non_tradable_price: nonTradablePrice,
      };
    });

    cache.set("items", items);
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Error fetching items", error: error });
  }
};
