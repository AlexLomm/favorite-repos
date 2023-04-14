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

import { GithubRepository } from '../hooks/use-github-repositories';
import { ReactComponent as StarIcon } from '../assets/icon-star.svg';
import { ReactComponent as CodeIcon } from '../assets/icon-code.svg';

interface GithubRepositoriesSearchItemProps {
  githubRepository: GithubRepository;
}

const GithubRepositoriesSearchItem = ({
  githubRepository,
}: GithubRepositoriesSearchItemProps) => {
  return (
    <Card elevation={0}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {githubRepository.name}
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
              label={githubRepository.stargazers_count}
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

export default GithubRepositoriesSearchItem;
