import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import React from 'react';

export interface GhostProps {
  isVisible: boolean;
}

const Ghost = ({ isVisible }: GhostProps) => (
  <motion.div
    initial="hidden"
    animate={isVisible ? 'visible' : 'hidden'}
    exit="exit"
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    }}
    transition={{ duration: 1.0, ease: 'easeInOut' }}
    css={css`
      position: relative;

      .ghost {
        margin: 36px auto;
        width: 100%;
        height: 80%;
        animation: floaty 2s infinite;
      }

      .ghost .body {
        position: relative;
        margin: 50px auto 0;
        width: 180px;
        height: 220px;
        background: #f2fbf1;
        border-top-left-radius: 90px;
        border-top-right-radius: 90px;
      }

      .ghost .body:before,
      .ghost .body:after {
        content: '';
        position: absolute;
        top: 130px;
        display: inline-block;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #f2fbf1;
        animation: floaty 0.2s infinite;
      }

      .ghost .body:before {
        left: -18px;
      }

      .ghost .body:after {
        right: -18px;
      }

      .ghost .body .eyes {
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        padding: 90px 0 0;
        width: 90px;
        height: 20px;
        margin-bottom: 40px;
      }

      .ghost .body .eyes:before,
      .ghost .body .eyes:after {
        content: ' ';
        display: block;
        width: 30px;
        height: 30px;
        background: 0#252c49;
        border-radius: 50%;
      }

      .ghost .body .mouth {
        background: 0#252c49;
        margin: 25px auto 0;
        width: 60px;
        height: 30px;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
      }

      .ghost .body .mouth:before {
        content: ' ';
        display: block;
        background: #fff;
        margin-left: 20px;
        width: 10px;
        height: 10px;
      }

      .ghost .body .feet {
        position: absolute;
        display: flex;
        bottom: -18px;
        width: 180px;
        height: 36px;
      }

      .ghost .body .feet > *,
      .ghost .body .feet::before,
      .ghost .body .feet::after {
        content: ' ';
        width: 36px;
        height: 36px;
        background: #f2fbf1;
        border-radius: 50%;
      }

      .shadow {
        margin: 0 auto;
        background: #252c49;
        width: 180px;
        height: 40px;
        border-radius: 50%;
        animation: zoomInOut 2s infinite;
      }

      @keyframes floaty {
        0%,
        100% {
          transform: translateY(0);
        }

        50% {
          transform: translateY(-20px);
        }
      }

      @keyframes zoomInOut {
        0%,
        100% {
          transform: scale(1);
        }

        50% {
          transform: scale(0.8);
        }
      }
    `}
  >
    <div className="ghost">
      <div className="body">
        <div className="eyes" />

        <div className="mouth" />

        <div className="feet">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>

    <div className="shadow" />
  </motion.div>
);

export default Ghost;
