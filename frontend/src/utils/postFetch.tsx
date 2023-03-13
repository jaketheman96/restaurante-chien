const fetchWhenClicked = async (
  fetchMethod: string,
  route: string,
  body: any,
  token: string
): Promise<any> => {
  const response = await fetch(`http://localhost:3502${route}`, {
    method: fetchMethod,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      Authorization: token,
    }
  });
  return response.json();
}

export default fetchWhenClicked;