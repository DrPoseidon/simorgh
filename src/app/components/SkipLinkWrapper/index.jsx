import React from 'react';
import { node, string, shape } from 'prop-types';
import styled from 'styled-components';
import { visuallyHiddenTextStyle } from '@bbc/psammead-visually-hidden-text';
import { C_EBON, C_WHITE } from '@bbc/psammead-styles/colours';
import { getSansBold } from '@bbc/psammead-styles/font-styles';
import { GEL_BREVIER } from '@bbc/gel-foundations/typography';

import detokeniseSkipText from './utils/detokeniseSkipText';

const SKIP_LINK_BORDER = '0.125rem';
const GEL_SPACING_PLUS_HALF = `0.75rem`;

const Wrapper = styled.div`
  position: relative;
`;

const SkipLink = styled.a`
  ${({ service }) => getSansBold(service)}
  ${GEL_BREVIER}
  background-color: ${C_WHITE};
  border: ${SKIP_LINK_BORDER} solid ${C_EBON};
  color: ${C_EBON};
  display: block;
  left: 0;
  line-height: 1;
  padding: ${GEL_SPACING_PLUS_HALF};
  position: absolute;
  text-decoration: none;
  top: 0;
  z-index: 10;

  &:not(:focus):not(:active) {
    ${visuallyHiddenTextStyle}
  }
`;

const EndText = styled.p`
  ${visuallyHiddenTextStyle}
`;

const SkipLinkWrapper = ({
  service,
  skipEndId,
  children,
  skipText,
  skipEndText,
  terms,
}) => {
  return (
    <Wrapper>
      <SkipLink service={service} href={`#${skipEndId}`}>
        {detokeniseSkipText(skipText, terms)}
      </SkipLink>
      {children}
      <EndText tabIndex="-1" id={skipEndId}>
        {detokeniseSkipText(skipEndText, terms)}
      </EndText>
    </Wrapper>
  );
};

SkipLinkWrapper.propTypes = {
  service: string.isRequired,
  children: node.isRequired,
  skipEndId: string.isRequired,
  skipText: string.isRequired,
  skipEndText: string.isRequired,
  terms: shape({}).isRequired,
};

export default SkipLinkWrapper;
