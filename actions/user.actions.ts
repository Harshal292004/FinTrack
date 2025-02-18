import mongoose from "mongoose";

export async function registerUserAction(user: { name: string }) {
  const response = await fetch("/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to register user");
  }
  return data;
}

export async function loginUserAction(user: { name: string }) {
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to login user");
  }
  return data;
}

export async function updateUserAction({
  id,
  name,
}: {
  id: mongoose.Schema.Types.ObjectId;
  name: string;
}) {
  const response = await fetch("/api/users/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to update user");
  }
  return data;
}

export async function deleteUserAction({ id }: { id: mongoose.Schema.Types.ObjectId }) {
  const response = await fetch("/api/users/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to delete user");
  }
  return data;
}
