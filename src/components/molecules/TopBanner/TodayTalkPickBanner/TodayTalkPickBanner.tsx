import React from 'react';
import { PATH } from '@/constants/path';
import { useNavigate } from 'react-router-dom';
import { TodayTalkPick } from '@/types/talk-pick';
import { Check, CheckSmall } from '@/assets';
import useIsMobile from '@/hooks/common/useIsMobile';
import {
  bannerBtnStyling,
  bannerChipStyling,
  talkPickStyling,
  talkPickTextStyling,
} from './TodayTalkPickBanner.style';

interface TodayTalkPickBannerProps {
  talkPick?: TodayTalkPick;
}

const TodayTalkPickBanner = ({ talkPick }: TodayTalkPickBannerProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const onClickBanner = () => {
    navigate(`/${PATH.TODAY_TALKPICK}`, {
      state: { talkPickId: talkPick?.id, isTodayTalkPick: true },
    });
  };

  return (
    <button
      type="button"
      key={talkPick?.id}
      css={talkPickStyling}
      onClick={onClickBanner}
    >
      <div css={bannerChipStyling}>
        {isMobile ? <CheckSmall /> : <Check />}
        오늘의 톡픽
      </div>
      <div css={talkPickTextStyling}>
        {talkPick?.title} <br />
        {talkPick?.optionA} VS {talkPick?.optionB}
      </div>
      <div css={bannerBtnStyling}>투표결과 보러 가기</div>
    </button>
  );
};

export default TodayTalkPickBanner;
