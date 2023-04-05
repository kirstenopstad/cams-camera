export async function loadArray(path, arrayName) {
  let pages = [];
  try {
    const res = await fetch(`${process.env.HOST_URL}${path}`);
    const jres = await res.json();
    pages = jres[arrayName];
  } catch (error) {
    console.log(error);
  }
  return pages;
}
