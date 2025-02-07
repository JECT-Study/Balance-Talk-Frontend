import React, { forwardRef, ComponentPropsWithRef, ForwardedRef } from 'react';
import { More, MoreReply, MoreSmall } from '@/assets';
import * as S from './MoreButton.style';

export interface MoreButtonProps extends ComponentPropsWithRef<'button'> {
  icon?: 'plus' | 'arrow';
  size?: 'small' | 'default';
}

const MoreButton = (
  { icon = 'plus', size = 'default', ...props }: MoreButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const getIcon = () => {
    if (size === 'small') return <MoreSmall />;
    return icon === 'plus' ? <More /> : <MoreReply />;
  };

  return (
    <button type="button" ref={ref} css={S.moreButtonStyling(icon)} {...props}>
      더보기
      {getIcon()}
    </button>
  );
};

export default forwardRef(MoreButton);
