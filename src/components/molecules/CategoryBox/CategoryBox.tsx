import React from 'react';
import { Link } from 'react-router-dom';
import CategoryButton from '@/components/atoms/CategoryButton/CategoryButton';
import { categoryBoxStyling } from './CategoryBox.style';

interface CategoryBoxProps {
  isMobile?: boolean;
  handleService: () => void;
}

const CategoryBox = ({ handleService, isMobile = false }: CategoryBoxProps) => (
  <div css={categoryBoxStyling}>
    <Link to="/talkpickplace">
      <CategoryButton
        isMobile={isMobile}
        imageType="PickVote"
        label="톡&픽 플레이스"
      />
    </Link>
    <CategoryButton
      isMobile={isMobile}
      imageType="RandomGame"
      label="랜덤 밸런스 게임"
      onClick={handleService}
    />
  </div>
);

export default CategoryBox;
