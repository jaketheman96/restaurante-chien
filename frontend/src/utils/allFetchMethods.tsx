interface IrequestOptions {
  method: string;
  body?: string;
  headers: any;
}

const allFetchMethods = async (
  fetchMethod: string,
  route: string,
  body: any,
  token: string
): Promise<any> => {
  const requestOptions: IrequestOptions = {
    method: fetchMethod,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      Authorization: token,
    },
  };
  if (fetchMethod === 'GET') {
    delete requestOptions.body;
  }
  const response = await fetch(`http://localhost:3502${route}`, requestOptions);
  return response.json();
};

export default allFetchMethods;
