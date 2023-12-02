export async function getUserDetails(id) {
  const res = await fetch(`https://stg.dhunjam.in/account/admin/${id}`);
  const data = await res.json();
  return data;
}
