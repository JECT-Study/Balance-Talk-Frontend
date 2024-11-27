import { ChangeEvent, useState } from 'react';
import { AxiosErrorResponse, axiosInstance } from '@/api/interceptor';
import { postLogin } from '@/api/member';
import { HTTP_STATUS_CODE } from '@/constants/api';
import { useNewDispatch } from '@/store';
import { tokenActions } from '@/store/auth';
import { MemberForm } from '@/types/member';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';
import { ERROR } from '../../constants/message';
import useInputs from '../common/useInputs';
import { validateLoginForm } from './validateLoginForm';

export const useLoginForm = (pathTalkPickId: number | undefined) => {
  const initialState: Pick<MemberForm, 'email' | 'password'> = {
    email: localStorage.getItem('savedEmail') ?? '',
    password: '',
  };

  const { form, onChange } =
    useInputs<Pick<MemberForm, 'email' | 'password'>>(initialState);

  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
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

    onSuccess: (res: string) => {
      setIsError(false);
      setErrorMessage(undefined);
      setLoginSuccess(true);

      dispatch(tokenActions.setToken(res));
      axiosInstance.defaults.headers.Authorization = `Bearer ${res}`;

      localStorage.setItem('accessToken', res);
      localStorage.setItem('rtk', 'rtk');
      localStorage.setItem('savedEmail', form.email);

      setTimeout(() => {
        if (pathTalkPickId) {
          navigate(`${PATH.TALKPICK(pathTalkPickId)}`);
        } else {
          navigate('/');
        }
      }, 2000);
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

  return { form, onChange, isError, errorMessage, handleSubmit, loginSuccess };
};
