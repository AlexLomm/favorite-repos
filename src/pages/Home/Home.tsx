import React, { useState } from 'react';
import { css } from '@emotion/react';
import { useSnackbar } from 'notistack';
import { motion } from 'framer-motion';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

import GithubRepositoriesSearch from './GithubRepositoriesSearch';
import useGithubRepositories from '../../hooks/use-github-repositories';
import addGithubRepositoryToServer from '../../api/add-github-repository-to-server';
import useGithubRepositoriesFromServer, {
  UseServerRepositoriesProps,
} from '../../hooks/use-server-repositories';
import RepositoryCard from '../../components/RepositoryCard';
import removeServerRepository from '../../api/remove-server-repository';
import Ghost from '../../components/Ghost';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] =
    useState<UseServerRepositoriesProps['sortBy']>('createdAt');

  const { isLoading, repositories, clear } = useGithubRepositories(searchQuery);
  const {
    isLoading: isLoadingServer,
    repositories: repositoriesServer,
    refetch,
  } = useGithubRepositoriesFromServer({ sortBy });

  const { enqueueSnackbar } = useSnackbar();

  return (
    <div
      css={css`
        padding: 216px 32px 56px 32px;
        max-width: 1200px;
        margin: 0 auto;
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

          <FormControl
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
            <FormLabel id="sort-by-label">Sort By</FormLabel>

            <RadioGroup
              row
              aria-labelledby="sort-by-label"
              name="row-radio-buttons-group"
              onChange={(event) => {
                setSortBy(
                  event.target.value as UseServerRepositoriesProps['sortBy']
                );
              }}
            >
              <FormControlLabel
                value="createdAt"
                control={<Radio />}
                label="Date Created"
                checked={sortBy === 'createdAt'}
              />

              <FormControlLabel
                value="stargazersCount"
                control={<Radio />}
                label="Stars"
                checked={sortBy === 'stargazersCount'}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      <div
        css={css`
          pointer-events: none;
          position: absolute;
          top: 60%;
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
        {repositoriesServer.map((repository) => (
          <motion.div
            key={repository.id}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0, translateY: -20 },
              visible: { opacity: 1, translateY: 0 },
              exit: { opacity: 0, translateY: 20 },
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            css={css`
              max-width: 300px;

              @media (min-width: 480px) {
                max-width: none;
              }
            `}
          >
            <RepositoryCard
              id={repository.id}
              fullName={repository.fullName}
              language={repository.language}
              stargazersCount={repository.stargazersCount}
              onClick={() =>
                window.open(
                  `https://github.com/${repository.fullName}`,
                  '_blank'
                )
              }
              onRemoveClick={async (id) => {
                try {
                  const data = await removeServerRepository(id);

                  if (data.ok) {
                    enqueueSnackbar(
                      `"${repository.fullName}" removed from server`,
                      { variant: 'success' }
                    );
                  } else {
                    enqueueSnackbar(
                      `Oops.. Could not delete "${repository.fullName}" from server: (${data.statusText})`,
                      { variant: 'error' }
                    );
                  }
                } catch (error) {
                  enqueueSnackbar(`Oops.. Something went wrong: "${error}"`, {
                    variant: 'error',
                  });
                } finally {
                  refetch();
                }
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
