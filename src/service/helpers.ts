export const makeRequest = (query: string, githubToken: string) => {
    return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer  ${githubToken}`
    //   'Authorization': 'Bearer  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'
    },
    body: JSON.stringify({
      query,
      // variables: {
      //   now: new Date().toISOString(),
      // },
    }),
  })
    .then(res => res.json())
    
  }