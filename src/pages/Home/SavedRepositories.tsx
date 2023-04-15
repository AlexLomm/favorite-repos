import React from 'react';
import { motion } from 'framer-motion';
import { css } from '@emotion/react';
import { enqueueSnackbar } from 'notistack';

import { ServerRepository } from '../../models/server-repository';
import RepositoryCard from '../../components/RepositoryCard';
import removeServerRepository from '../../api/remove-server-repository';

export interface SavedRepositoriesProps {
  repositories: ServerRepository[];
  refetchRepositories: () => void;
}

const SavedRepositories = ({ repositories, refetchRepositories }: SavedRepositoriesProps) => {
  return (
    <>
      {repositories.map((repository) => (
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
              window.open(`https://github.com/${repository.fullName}`, '_blank')
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
                refetchRepositories();
              }
            }}
          />
        </motion.div>
      ))}
    </>
  );
};

export default SavedRepositories;
