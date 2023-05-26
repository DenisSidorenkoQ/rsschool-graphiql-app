export const makeRequest = (query: string, githubToken: string) => {
  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer  ${githubToken}`,
    },
    body: JSON.stringify({
      query,
    }),
  }).then((res) => res.json());
};
