export async function getUser(body) {
  try {
    const res = await fetch(`https://stg.dhunjam.in/account/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error.message);
  }
}
