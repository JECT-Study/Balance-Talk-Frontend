/* eslint-disable no-console */
/* eslint-disable no-alert */
import { AxiosErrorResponse, axiosInstance } from '@/api/interceptor';
import { postLogout } from '@/api/member';
import { PATH } from '@/constants/path';
import { useNewDispatch } from '@/store';
import { tokenActions } from '@/store/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useLogoutMutation = () => {
  const dispatch = useNewDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      delete axiosInstance.defaults.headers.Authorization;
      dispatch(tokenActions.deleteToken());

      navigate(`/${PATH.LOGIN}`, { state: { status: 'logout' } });
    },
    onError: (err: AxiosErrorResponse) => {
      console.log('로그아웃 에러: ', err);
      alert('로그아웃에 실패했습니다😥');
    },
  });
};
