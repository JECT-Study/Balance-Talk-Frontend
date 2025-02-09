import { AxiosErrorResponse, axiosInstance } from '@/api/interceptor';
import { postLogin } from '@/api/member';
import { HTTP_STATUS_CODE } from '@/constants/api';
import { useNewDispatch } from '@/store';
import { tokenActions } from '@/store/auth';
import { MemberForm } from '@/types/member';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';
import { ERROR, SUCCESS } from '../../constants/message';
import useInputs from '../common/useInputs';
import { validateLoginForm } from './validateLoginForm';

export const useLoginForm = (
  showToastModal?: (message: string, callback?: () => void) => void,
  pathTalkPickId?: number,
  onModalLoginSuccess?: () => void,
) => {
  const queryClient = useQueryClient();
  const initialState: Pick<MemberForm, 'email' | 'password'> = {
    email: localStorage.getItem('savedEmail') ?? '',
    password: '',
  };

  const { form, onChange } =
    useInputs<Pick<MemberForm, 'email' | 'password'>>(initialState);

  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const setLoginError = (message: string) => {
    setIsError(true);
    setErrorMessage(message);
  };

  const navigate = useNavigate();

  const dispatch = useNewDispatch();

  const login = useMutation({
    mutationFn: postLogin,
    onSuccess: async (res: string) => {
      setIsError(false);
      setErrorMessage(undefined);
      onModalLoginSuccess?.();

      dispatch(tokenActions.setToken(res));
      axiosInstance.defaults.headers.Authorization = `Bearer ${res}`;

      localStorage.setItem('savedEmail', form.email);

      await queryClient.invalidateQueries({
        queryKey: ['members'],
      });

      showToastModal?.(SUCCESS.LOGIN, () => {
        if (pathTalkPickId) {
          navigate(`/${PATH.TALKPICK(pathTalkPickId)}`);
        } else {
          navigate('/');
        }
      });
    },

    onError: (err: AxiosErrorResponse) => {
      if (err.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
        setLoginError(ERROR.LOGIN.FAIL);
      }
    },
  });

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginValidation = validateLoginForm(form);

    if (!loginValidation.isValid) {
      setLoginError(loginValidation.message);
      return;
    }
    login.mutate(form);
  };

  return {
    form,
    onChange,
    isError,
    errorMessage,
    handleSubmit,
  };
};
