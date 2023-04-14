import React from 'react';
import { css } from '@emotion/react';

import GithubRepositoriesSearch from './GithubRepositoriesSearch';

const Home = () => {
  return (
    <div
      css={css`
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <GithubRepositoriesSearch />
    </div>
  );
};

export default Home;
