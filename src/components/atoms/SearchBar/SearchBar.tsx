import React, {
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
} from 'react';
import { Search } from '@/assets';
import Button from '@/components/atoms/Button/Button';
import * as S from './SearchBar.style';

export interface SearchBarProps extends ComponentPropsWithoutRef<'input'> {
  onSearchClick: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isMobile?: boolean;
}

const SearchBar = (
  { onSearchClick, onInputChange, isMobile = false, ...props }: SearchBarProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchClick();
    }
  };

  return (
    <div css={S.searchBarStyling}>
      {isMobile ? (
        <>
          <Button size="medium" variant="circle" onClick={onSearchClick}>
            <Search />
          </Button>
          <input
            ref={ref}
            css={S.mobileInputStyling}
            placeholder="궁금한 키워드를 입력해주세요!"
            onChange={onInputChange}
            onKeyDown={handleInputKeyDown}
            {...props}
          />
        </>
      ) : (
        <>
          <input
            ref={ref}
            css={S.inputStyling}
            placeholder="궁금한 키워드를 입력해주세요!"
            onChange={onInputChange}
            onKeyDown={handleInputKeyDown}
            {...props}
          />
          <Button size="large" variant="circle" onClick={onSearchClick}>
            <Search />
          </Button>
        </>
      )}
    </div>
  );
};

export default forwardRef(SearchBar);
