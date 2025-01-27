import React, { useState } from 'react';
import ActionButton from '@/components/atoms/ActionButton/ActionButton';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';
import { actionBoxContainer } from './ActionBox.style';

const ActionBox = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('activity');

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);

    if (buttonType === 'edit') {
      navigate(`/${PATH.CHANGE.PROFILE}`);
    }
  };

  return (
    <div css={actionBoxContainer}>
      <ActionButton
        label="활동 내역"
        iconType="activity"
        isActive={activeButton === 'activity'}
        onClick={() => handleButtonClick('activity')}
      />
      <ActionButton
        label="회원정보 수정"
        iconType="edit"
        isActive={activeButton === 'edit'}
        onClick={() => handleButtonClick('edit')}
      />
      <ActionButton
        label="회원탈퇴"
        iconType="withdraw"
        isActive={activeButton === 'withdraw'}
        onClick={() => handleButtonClick('withdraw')}
      />
    </div>
  );
};

export default ActionBox;
