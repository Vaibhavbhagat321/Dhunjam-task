export async function updateUser(id, newData) {
  const res = await fetch(`https://stg.dhunjam.in/account/admin/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const data = await res.json();
  return data;
}
