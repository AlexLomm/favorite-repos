import { GithubRepository } from '../models/github-repository';

const addGithubRepositoryToServer = (githubRepository: GithubRepository) => {
  return fetch('http://localhost:8080/repo/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(githubRepository),
  });
};

export default addGithubRepositoryToServer;
