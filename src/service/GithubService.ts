import axios from "axios";

class GithubService {
    validToken = (token: string): Promise<boolean> => {
        return axios
            .get(`https://api.github.com/`,
                {
                    headers: {
                        'Authorization': `bearer ${token}`
                    },
                })
            .then((response) => {
                return response.status === 200;
            });
    };

    sendGraphQl = (body: JSON): Promise<boolean> => {
        return axios
            .post(`https://api.github.com/graphql`, {body}).then(response => {
                return response.data;
            });
    };
}

export default new GithubService();
