import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function Modal(props) {
  const { className, onClose, maskCloseable, closeable, visible } = props;

  const onMaskClicks = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper className={className} onClick={maskCloseable ? onMaskClicks : null} tabIndex="-1" visible={visible}>
        <ModalInner tabIndex="0" className="modal-inner" onClick={(e) => e.stopPropagation()}>
          {closeable && (
            <>
              <>{props.children}</>
            </>
          )}
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

Modal.propTypes = {
  visibles: PropTypes.func,
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: white;
  /* border-radius: 10px; */
  width: 100%;
  max-width: 480px;
  max-height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 40px;
`;
