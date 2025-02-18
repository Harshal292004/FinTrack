import mongoose from "mongoose";

export async function addTransactionAction({
  transaction_id,
  amount,
  date,
  description,
}: {
  transaction_id: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
  description: string;
}) {
  const response = await fetch("/api/transactions/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transaction_id, amount, date, description }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to add transaction");
  }
  return data;
}

export async function updateTransactionAction({
  transaction_id,
  index,
  amount,
  date,
  description,
}: {
  transaction_id: mongoose.Types.ObjectId;
  index: number;
  amount?: number;
  date?: Date;
  description?: string; 
}) {
  const response = await fetch("/api/transactions/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transaction_id, index, amount, date, description }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to update transaction");
  }
  return data;
}

export async function deleteTransactionAction({
  transaction_id,
  index,
}: {
  transaction_id: mongoose.Types.ObjectId;
  index: number;
}) {
  const response = await fetch("/api/transactions/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transaction_id, index }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to delete transaction");
  }
  return data;
}