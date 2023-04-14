import validateSchema from '../utils/validate-schema';
import {
  GithubRepositoriesResponse,
  githubRepositoriesResponseSchema, GithubRepository,
} from '../models/github-repository';

const getGithubRepositoriesFromServer = async (): Promise<GithubRepository[]> => {
  const response = await fetch('http://localhost:8080/repo');

  const data = await response.json();

  // parse the data and ensure that it matches the schema (this way we
  // can be sure that the ts types match the underlying data)
  const validatedData = validateSchema<GithubRepositoriesResponse>(
    githubRepositoriesResponseSchema,
    data
  );

  return validatedData.items;
};

export default getGithubRepositoriesFromServer;
