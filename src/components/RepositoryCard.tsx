import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { css } from '@emotion/react';

import { ReactComponent as StarIcon } from '../assets/icon-star.svg';
import { ReactComponent as CodeIcon } from '../assets/icon-code.svg';

interface RepositoryCardProps {
  id: string;
  fullName: string;
  description?: string;
  language: string;
  stargazersCount: number;
  onClick: (id: string) => void;
  onRemoveClick?: (id: string) => void;
  elevation?: number;
}

const RepositoryCard = ({
  id,
  fullName,
  description,
  language,
  stargazersCount,
  onClick,
  onRemoveClick,
  elevation,
}: RepositoryCardProps) => {
  return (
    <Card
      css={css`
        width: 100%;
      `}
      elevation={elevation}
    >
      <CardActionArea onClick={() => onClick(id)}>
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
            {fullName}
          </Typography>

          {description && (
            <Typography gutterBottom variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}

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
              label={stargazersCount}
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
              label={language}
            />
          </CardActions>
        </CardContent>
      </CardActionArea>

      {onRemoveClick && (
        <CardActions>
          <Button size="small" color="error" onClick={() => onRemoveClick(id)}>
            Remove
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default RepositoryCard;
