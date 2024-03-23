import React, { SetStateAction } from 'react';
import { Comment } from '@/types/comment';
import { Profile, More } from '@/assets';
import { getCreatedDate } from '@/utils/date';
import CommentLikeButton from '@/components/Buttons/CommentLikeButton';
import CommentReportButton from '@/components/Buttons/CommentReportButton';
import { useParseJwt } from '@/hooks/common/useParseJwt';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { useMemberQuery } from '@/hooks/api/useMemberQuery';
import {
  btnsWrapper,
  commentHistoryWrapper,
  commentInfoWrapper,
  commentMainWrapper,
  commentWrapper,
  contentWrapper,
  createdAtWrapper,
  likeBtnWrapper,
  nameWrapper,
  replyBtnWrapper,
  userCommentWrapper,
  utilityBtnsWrapper,
} from './UserComment.style';

type UserCommentProps = Comment & {
  handleLoginModal: React.Dispatch<SetStateAction<boolean>>;
};

const UserComment = ({
  id,
  content,
  memberName,
  postId,
  selectedOptionId,
  myLike,
  createdAt,
  likesCount,
  lastModifiedAt,
  profileImageUrl,
  handleLoginModal,
}: UserCommentProps) => {
  const createdDate = getCreatedDate(createdAt);
  // const { member } = useMemberQuery(
  //   useParseJwt(useNewSelector(selectAccessToken)).memberId,
  // );

  const member = { memberId: 100, nickname: '김성현' };

  return (
    <div css={userCommentWrapper(selectedOptionId)}>
      <div css={commentMainWrapper(selectedOptionId)}>
        <div css={commentWrapper(selectedOptionId)}>
          {profileImageUrl ? (
            <img src="" alt="이미지" />
          ) : (
            <Profile width={40} />
          )}
          <div css={commentInfoWrapper}>
            <div css={commentHistoryWrapper(selectedOptionId)}>
              <div css={nameWrapper}>{memberName || '익명'}</div>
              <div css={createdAtWrapper}>
                {createdDate < 1 ? '오늘' : `${createdDate}일전`}
              </div>
              {member?.nickname === memberName && <More />}
            </div>
            <div css={contentWrapper}>{content}</div>
          </div>
        </div>
        <div css={btnsWrapper(selectedOptionId)}>
          <div css={utilityBtnsWrapper}>
            <div css={likeBtnWrapper}>
              <CommentLikeButton
                handleModal={handleLoginModal}
                myLike={myLike}
                postId={postId}
                commentId={id}
              />
              <span>{likesCount}</span>
            </div>
            <CommentReportButton
              postId={postId}
              handleModal={handleLoginModal}
              commentId={id}
            />
          </div>
          <div css={replyBtnWrapper}>
            <button type="button" onClick={() => {}}>
              답글
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComment;
