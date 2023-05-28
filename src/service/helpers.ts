export const makeRequest = async (query: string, githubToken: string) => {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer  ${githubToken}`,
    },
    body: JSON.stringify({
      query,
    }),
  });
  return await res.json();
};
