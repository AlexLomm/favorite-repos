import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';
import React from 'react';
import { css } from '@emotion/react';

import { ReactComponent as StarIcon } from '../assets/icon-star.svg';
import { ReactComponent as CodeIcon } from '../assets/icon-code.svg';
import { GithubRepository } from '../models/github-repository';

interface GithubRepositoriesSearchItemProps {
  githubRepository: GithubRepository;
  onClick: (githubRepository: GithubRepository) => void;
}

const GithubRepositoryCard = ({
  githubRepository,
  onClick,
}: GithubRepositoriesSearchItemProps) => {
  return (
    <Card elevation={0}>
      <CardActionArea onClick={() => onClick(githubRepository)}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            css={css`
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            `}
          >
            {githubRepository.fullName}
          </Typography>

          <Typography gutterBottom variant="body2" color="text.secondary">
            {githubRepository.description}
          </Typography>

          <CardActions style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Chip
              size="small"
              icon={
                <StarIcon
                  css={css`
                    width: 16px;
                    height: 16px;
                    margin-bottom: 2px;
                  `}
                />
              }
              label={githubRepository.stargazersCount}
            />

            <Chip
              size="small"
              icon={
                <CodeIcon
                  css={css`
                    width: 16px;
                    height: 16px;
                    margin-bottom: 2px;
                  `}
                />
              }
              label={githubRepository.language}
            />
          </CardActions>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GithubRepositoryCard;
