import validateSchema from '../utils/validate-schema';
import {
  ServerRepositoriesResponse,
  serverRepositoriesResponseSchema,
  ServerRepository,
} from '../models/server-repository';

const getServerRepositories = async (): Promise<ServerRepository[]> => {
  const response = await fetch('http://localhost:8080/repo/');

  const data = await response.json();

  // parse the data and ensure that it matches the schema (this way we
  // can be sure that the ts types match the underlying data)
  const validatedData = validateSchema<ServerRepositoriesResponse>(
    serverRepositoriesResponseSchema,
    data
  );

  return validatedData.repos;
};

export default getServerRepositories;
