import axios from 'axios';

class GithubService {
  validToken = async (token: string): Promise<boolean> => {
    const response = await axios.get(`https://api.github.com/`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    return response.status === 200;
  };

  sendGraphQl = async (body: JSON): Promise<boolean> => {
    const response = await axios.post(`https://api.github.com/graphql`, { body });
    return response.data;
  };
}

export default new GithubService();
