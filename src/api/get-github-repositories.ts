import {
  GithubRepositoriesResponse,
  githubRepositoriesResponseSchema,
  GithubRepository,
} from '../models/github-repository';
import validateSchema from '../utils/validate-schema';

const getGithubRepositories = async (
  searchQuery: string
): Promise<GithubRepository[]> => {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(
      searchQuery
    )}`,
  );

  const data = await response.json();

  // parse the data and ensure that it matches the schema (this way we
  // can be sure that the ts types match the underlying data)
  const validatedData = validateSchema<GithubRepositoriesResponse>(
    githubRepositoriesResponseSchema,
    data
  );

  return validatedData.items;
};

export default getGithubRepositories;
