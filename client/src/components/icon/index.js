import React, { Component } from 'react';
import styled from 'styled-components';

export const InlineSvg = styled.svg`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  color: inherit;
  fill: currentColor;
`;

export const SvgWrapper = styled.div`
  display: inline-block;
  flex: 0 0 ${props => (props.size ? `${props.size}px` : '32px')};
  width: ${props => (props.size ? `${props.size}px` : '32px')};
  height: ${props => (props.size ? `${props.size}px` : '32px')};
  min-width: ${props => (props.size ? `${props.size}px` : '32px')};
  min-height: ${props => (props.size ? `${props.size}px` : '32px')};
  position: relative;
  color: inherit;
`;

export const Glyph = ({ glyph }) => {
    switch (glyph) {
        case 'log-out':
            return (
                <path d='M3.414 7.828h5.642a1 1 0 1 1 0 2H3.414l1.122 1.122a1 1 0 1 1-1.415 1.414L.293 9.536a.997.997 0 0 1 0-1.415L3.12 5.293a1 1 0 0 1 1.415 1.414L3.414 7.828zM13 0a1 1 0 0 1 1 1v16a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1z' />
            );
        case 'document':
            return (
                <path d='M9 18h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4V8H2V6h14v2H9v10zM3 0h12a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3z' />
            );
        case 'paper':
            return (
                <path d='M3 0h10a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3zm2 1h6a1 1 0 0 1 0 2H5a1 1 0 1 1 0-2zm0 12h2a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2zm0-4h6a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2zm0-4h6a1 1 0 0 1 0 2H5a1 1 0 1 1 0-2z' />
            );
        case 'printer':
            return (
                <path d='M16 14h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1V9h12v5zM4 4V0h12v4h1a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-1v4H4v-4H3a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1zm2 14h8v-7H6v7zM6 4h8V2H6v2z'/>
            );
        case 'user':
            return (
                <path d='M3.534 10.07a1 1 0 1 1 .733 1.86A3.579 3.579 0 0 0 2 15.26V17a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1.647a3.658 3.658 0 0 0-2.356-3.419 1 1 0 1 1 .712-1.868A5.658 5.658 0 0 1 14 15.353V17a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3v-1.74a5.579 5.579 0 0 1 3.534-5.19zM7 0a4 4 0 0 1 4 4v2a4 4 0 1 1-8 0V4a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v2a2 2 0 1 0 4 0V4a2 2 0 0 0-2-2z' />
            );
        case 'add':
            return (
                <path d='M8.9 6.9v-5a1 1 0 1 0-2 0v5h-5a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5z' />
            )
        case 'register':
            return (
                <path d='M5.648 12.276l-1.65 1.1-.415 1.68 1.665-.42 1.104-1.656-.704-.704zM7.1 10.899l.627.627.091-.032c.937-.334 1.88-1.019 2.824-2.089 1.139-1.29 3.061-3.587 5.757-6.879a.211.211 0 0 0-.297-.297c-3.286 2.693-5.583 4.616-6.881 5.758-1.076.946-1.76 1.888-2.088 2.819l-.033.093zm-.615 5.486L.843 17.814l1.4-5.671 3.004-2.004C5.7 8.863 6.583 7.645 7.9 6.486c1.32-1.162 3.632-3.097 6.936-5.804a2.21 2.21 0 0 1 3.111 3.112c-2.71 3.309-4.645 5.62-5.804 6.934-1.156 1.31-2.373 2.193-3.652 2.65l-2.005 3.007z' />
            )
        default:
            return null;
    }
}



class Icon extends Component {
    render() {
        const { glyph, size } = this.props;

        return (
            <SvgWrapper size={size}>
                <InlineSvg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -1.5 24 24" preserveAspectRatio="xMinYMin">
                    <Glyph glyph={glyph} />
                </InlineSvg>
            </SvgWrapper>
        );
    }
}

export default Icon;