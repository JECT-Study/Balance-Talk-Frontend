import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import BalanceOptionCardsSection from './BalanceOptionCardsSection/BalanceOptionCardsSection';
import CommentsSection from './CommentsSection/CommentsSection';
import { getPost } from '../../api/posts/posts';
import CreatorSection from './CreatorSection/CreatorSection';
import UserUtilitySection from './UserUtilitySection/UserUtilitySection';
import TitleSection from './TitleSection/TitleSection';
import { ImageInfo, Post } from '../../types/post';
import { PostPageWrapper, UserSectionWrapper } from './PostPage.style';

const PostPage = () => {
  const postId = Number(useParams().id);
  const { isLoading, data: post } = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => getPost(postId),
    select: (data: { data: Post }) => data?.data,
  });

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div css={PostPageWrapper}>
      <TitleSection
        title={post?.title || 'title'}
        views={post?.views || 0}
        likeCount={post?.likeCount || 0}
        tags={post?.tags || []}
      />
      <BalanceOptionCardsSection
        id={post?.id}
        balanceOptions={post?.balanceOptions || []}
      />

      <div css={UserSectionWrapper}>
        {post?.creatorId && <CreatorSection creatorId={post?.creatorId} />}
        <UserUtilitySection />
      </div>
      <CommentsSection
        postId={postId}
        balanceOptionTitles={
          post?.balanceOptions?.map(
            (balanceOption: ImageInfo) => balanceOption?.optionTitle,
          ) || []
        }
      />
    </div>
  );
};

export default PostPage;
