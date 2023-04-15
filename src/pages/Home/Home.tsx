import React, { useState } from 'react';
import { css } from '@emotion/react';
import { useSnackbar } from 'notistack';

import GithubRepositoriesSearch from './GithubRepositoriesSearch';
import useGithubRepositories from '../../hooks/use-github-repositories';
import addGithubRepositoryToServer from '../../api/add-github-repository-to-server';
import useGithubRepositoriesFromServer, {
  UseServerRepositoriesProps,
} from '../../hooks/use-server-repositories';
import Ghost from '../../components/Ghost';
import SortingControls from './SortingControls';
import SavedRepositories from './SavedRepositories';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] =
    useState<UseServerRepositoriesProps['sortBy']>('createdAt');

  const { isLoading, repositories, clear } = useGithubRepositories(searchQuery);
  const { repositories: repositoriesServer, refetch } =
    useGithubRepositoriesFromServer({ sortBy });

  const { enqueueSnackbar } = useSnackbar();

  return (
    <div
      css={css`
        padding: 116px 32px 56px 32px;
        max-width: 1200px;
        margin: 0 auto;

        @media (min-height: 896px) {
          padding-top: 216px;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          margin-bottom: 32px;
        `}
      >
        <div
          css={css`
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: flex-end;
            justify-content: center;

            @media (min-width: 480px) {
              justify-content: space-between;
            }
          `}
        >
          <GithubRepositoriesSearch
            disabled={repositoriesServer.length >= 10}
            isLoading={isLoading}
            repositories={repositories}
            onRepositoryClick={async (githubRepository) => {
              try {
                const data = await addGithubRepositoryToServer(
                  githubRepository
                );

                if (data.ok) {
                  enqueueSnackbar(
                    `"${githubRepository.fullName}" added to server`,
                    { variant: 'success' }
                  );
                } else {
                  enqueueSnackbar(
                    `Oops.. Could not add "${githubRepository.fullName}" to server.. (${data.statusText})`,
                    { variant: 'error' }
                  );
                }
              } catch (error) {
                enqueueSnackbar(
                  `Oops.. Could not add "${githubRepository.fullName}" to server.. (${error})`,
                  { variant: 'error' }
                );
              } finally {
                refetch();
              }
            }}
            onInputChange={(value) => {
              if (!value) {
                clear();

                return;
              }

              setSearchQuery(value);
            }}
          />

          <div
            css={css`
              margin-top: 16px;
              width: 300px;
              margin-bottom: 16px;
              order: -1;

              @media (min-width: 480px) {
                width: 100%;
              }

              @media (min-width: 768px) {
                width: auto;
                margin-bottom: 0;
                order: initial;
              }
            `}
          >
            <SortingControls
              selectedSortBy={sortBy}
              onChange={(value) => setSortBy(value)}
            />
          </div>
        </div>
      </div>

      <div
        css={css`
          pointer-events: none;
          position: absolute;
          top: max(60%, 450px);
          left: 50%;
          transform: translate(-50%, -50%);
        `}
      >
        <Ghost isVisible={!repositoriesServer.length} />
      </div>

      <div
        css={css`
          display: grid;
          width: 100%;
          grid-gap: 16px;
          grid-template-columns: 300px;
          justify-content: center;

          @media (min-width: 480px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          @media (min-width: 768px) {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          @media (min-width: 1024px) {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        `}
      >
        <SavedRepositories
          repositories={repositoriesServer}
          refetchRepositories={refetch}
        />
      </div>
    </div>
  );
};

export default Home;
