/* eslint-disable no-console */
import { getRefreshToken } from '@/api/interceptor';
import { useNewDispatch, useNewSelector } from '@/store';
import { selectAccessToken, tokenActions } from '@/store/auth';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useTokenRefresh = () => {
  const dispatch = useNewDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const accessToken = useNewSelector(selectAccessToken);

  useEffect(() => {
    const tokenRefresh = async () => {
      if (accessToken) {
        dispatch(tokenActions.setRefreshing(false));
        return;
      }

      try {
        const newAccessToken = await getRefreshToken();
        dispatch(tokenActions.setToken(newAccessToken));

        await queryClient.invalidateQueries({
          queryKey: ['members'],
        });
      } catch (error) {
        dispatch(tokenActions.deleteToken());
      } finally {
        dispatch(tokenActions.setRefreshing(false));
      }
    };
    tokenRefresh().catch((error) => {
      console.error('토큰 에러: ', error);
    });
  }, [accessToken, dispatch, navigate, queryClient]);
};
