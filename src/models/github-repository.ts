import { z } from 'zod';

export interface GithubRepository {
  id: number;
  fullName: string;
  description: string;
  language: string;
  stargazersCount: number;
  createdAt: string;
}

export interface GithubRepositoriesResponse {
  items: GithubRepository[];
}

export const githubRepositorySchema = z
  .object({
    id: z.number(),
    full_name: z.string(),
    description: z.string(),
    language: z.string(),
    stargazers_count: z.number(),
    created_at: z.string(),
  })
  .transform(
    ({ id, full_name, stargazers_count, created_at, ...otherProps }) => ({
      id: `${id}`,
      fullName: full_name,
      stargazersCount: stargazers_count,
      createdAt: created_at,
      ...otherProps,
    })
  );

export const githubRepositoriesResponseSchema = z.object({
  items: z.array(githubRepositorySchema),
});
