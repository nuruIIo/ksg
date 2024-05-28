import { Request, Response } from "express";
import pool from "../db";

export const updateUserBalance = async (req: Request, res: Response) => {
  const { amount } = req.body;
  const userId = 1;

  try {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const result = await client.query(
        "SELECT balance FROM users WHERE id = $1",
        [userId]
      );
      const currentBalance = result.rows[0]?.balance;

      if (currentBalance === undefined) {
        throw new Error("User not found");
      }

      if (currentBalance < amount) {
        throw new Error("Insufficient balance");
      }

      await client.query(
        "UPDATE users SET balance = balance - $1 WHERE id = $2",
        [amount, userId]
      );

      await client.query("COMMIT");

      res.json({
        message: "Balance updated successfully",
        newBalance: currentBalance - amount,
      });
    } catch (err: unknown) {
      await client.query("ROLLBACK");

      const error = err as Error;
      if (error.message === "Insufficient balance") {
        return res.status(400).json({ message: error.message });
      } else if (error.message === "User not found") {
        return res.status(404).json({ message: error.message });
      } else {
        console.error("Error updating balance:", error);
        return res.status(500).json({ message: "Error updating balance" });
      }
    } finally {
      client.release();
    }
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Database connection error:", error);
    res.status(500).json({ message: "Database connection error" });
  }
};
