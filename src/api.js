export async function getReviews(order = "ceratedAt") {
  const query = `order=${order}`;
  const response = await fetch(
    `https://learn.codeit.kr/1636/film-reviews/?${query}`
  );
  const body = await response.json();
  return body;
}
