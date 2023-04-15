import { z } from 'zod';

export interface ServerRepository {
  id: string;
  fullName: string;
  url: string;
  language?: string;
  stargazersCount: number;
  createdAt?: string;
}

export interface ServerRepositoriesResponse {
  repos: ServerRepository[];
}

export const githubRepositoryServerSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  language: z.string().nullable(),
  stargazersCount: z.number(),
  createdAt: z.string().nullable(),
});

export const serverRepositoriesResponseSchema = z.object({
  repos: z.array(githubRepositoryServerSchema).nullable(),
});
