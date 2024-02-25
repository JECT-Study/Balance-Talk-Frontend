import React from 'react';
import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import PostImage from './PostImage';
import TagButton from './TagButton';
import Eye from '../assets/svg/Eye';
import Comment from '../assets/svg/Comment';
import { Post, VoteInfo } from '../types/post';
import { fetchVoteCount } from '../api/posts/posts';
import HeartButton from './HeartButton';

type MainPostProps = {
  post?: Post;
};

const calculateTotalVoteCount = (data: VoteInfo[]) => {
  return data.reduce((prev, current) => {
    return prev + current.voteCount;
  }, 0);
};

const MainPost = ({ post }: MainPostProps) => {
  const postId = post?.id;

  const { data } = useQuery({
    queryKey: ['posts', 'vote', postId],
    queryFn: () => fetchVoteCount(postId!),
    enabled: !!postId,
  });

  const isLiked = post?.myLike;

  const postInfo = post;

  const images = post?.balanceOptions;

  return (
    <div css={css({ display: 'flex' })}>
      <PostImage images={images} size="large" />
      <div
        css={css({
          marginLeft: '50px',
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <div css={css({ flex: 1 })} />
        <div css={css({ display: 'flex', marginBottom: '10px' })}>
          <div
            css={css({
              fontFamily: 'SpoqaHanSansNeo-Bold',
              fontSize: '48px',
              textShadow: '0px 4px 4px gray',
            })}
          >
            {postInfo?.title}
          </div>
          <div css={css({ marginTop: '10px', marginLeft: '10px' })}>
            {postInfo &&
              postInfo.tags.map((tag) => {
                return <TagButton key={tag} tag={tag} />;
              })}
          </div>
        </div>
        <div
          css={css({
            fontFamily: 'SpoqaHanSansNeo-Regular',
            fontSize: '24px',
            marginBottom: '20px',
          })}
        >
          현재 투표수 : {data && calculateTotalVoteCount(data)}
        </div>
        <div
          css={css({
            display: 'flex',
            justifyContent: 'center',
            flex: 1,
          })}
        >
          <button
            type="button"
            css={css({
              backgroundColor: '#FFD369',
              border: 0,
              borderRadius: '10px',
              fontFamily: 'SpoqaHanSansNeo-Bold',
              fontSize: '20px',
              width: '165px',
              height: '45px',
              boxShadow: '0px 4px 4px gray',
              ':hover': {
                backgroundColor: '#E5BD5E',
              },
            })}
          >
            투표하기
          </button>
        </div>
        <div
          css={css({
            display: 'flex',
            justifyContent: 'space-between',
            height: '38px',
            alignItems: 'center',
          })}
        >
          <div
            css={css({
              height: '24px',
            })}
          >
            <Eye />
            <span
              css={css({
                marginLeft: '5px',
                marginRight: '5px',
                position: 'relative',
                bottom: '7px',
              })}
            >
              {postInfo?.views}
            </span>
            <Comment />
            <span
              css={css({
                marginLeft: '5px',
                marginRight: '5px',
                position: 'relative',
                bottom: '7px',
              })}
            >
              {postInfo?.commentCount}
            </span>
          </div>
          <div css={css({ display: 'flex', height: '100%' })}>
            <HeartButton isLiked={isLiked} postId={postId} />
            <span
              css={css({
                margin: 'auto',
                marginTop: '9px',
              })}
            >
              {postInfo?.likeCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPost;