import React, { useRef, useState } from 'react';
import type { ComponentPropsWithRef } from 'react';
import DotButton from '@/components/atoms/DotButton/DotButton';
import LikeButton from '@/components/atoms/LikeButton/LikeButton';
import TextArea from '@/components/molecules/TextArea/TextArea';
import * as S from './Comment.style';

export interface CommentProps extends ComponentPropsWithRef<'div'> {
  imgUrl: string | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  nickname: string;
  createdTime: string;
  comment: string;
  likeCount: number;
  initialLikeState?: boolean;
}

const Comment = ({
  imgUrl: ImgComponent,
  nickname,
  createdTime,
  comment,
  likeCount,
  initialLikeState = false,
  ...attributes
}: CommentProps) => {
  const likeButtonRef = useRef<HTMLButtonElement>(null);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReplyToggle = () => {
    setShowReply(!showReply);
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
  };

  const handleReplySubmit = () => {
    console.log('Reply submitted:', replyText);
  };

  return (
    <div css={S.MainContainer} {...attributes}>
      <div css={S.commentContainer}>
        {typeof ImgComponent === 'string' ? (
          <img src={ImgComponent} alt={nickname} css={S.profileImage} />
        ) : (
          <ImgComponent css={S.profileImage} />
        )}
        <div css={S.commentWrapper}>
          <div css={S.commentBox}>
            <span css={S.nickname}>{nickname}</span>
            <span css={S.createdTime}>{createdTime}</span>
          </div>
          <p css={S.commentText}>{comment}</p>
        </div>
        <div css={S.sideWrapper}>
          <div css={S.sideBox}>
            <button
              type="button"
              css={S.replyButton}
              onClick={handleReplyToggle}
            >
              답글
            </button>
            <DotButton />
          </div>
          <LikeButton
            ref={likeButtonRef}
            likeCount={likeCount}
            likeState={initialLikeState}
          />
        </div>
      </div>
      {showReply && (
        <div css={S.replyForm}>
          <TextArea
            size="medium"
            value={replyText}
            onChange={handleReplyChange}
            onSubmit={handleReplySubmit}
            placeholder="댓글을 입력하세요"
            label="답글달기"
          />
        </div>
      )}
    </div>
  );
};

export default Comment;
