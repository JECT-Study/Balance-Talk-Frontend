/* eslint-disable @typescript-eslint/no-floating-promises */
import { BalanceGame } from '@/types/game';
import { postGame } from '@/api/game';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';
import { Id } from '@/types/api';
import { AxiosErrorResponse } from '@/api/interceptor';
import { HTTP_STATUS_CODE } from '@/constants/api';
import { ERROR, SUCCESS } from '@/constants/message';

export const useCreateGameMutation = (
  showToastModal: (message: string, callback?: () => void) => void,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: BalanceGame) => postGame(data),
    onSuccess: (gameId: Id) => {
      queryClient.invalidateQueries({
        queryKey: ['games'],
      });
      showToastModal(SUCCESS.CREATEGAME.CREATE, () => {
        navigate(`/${PATH.BALANCEGAME.VIEW(gameId)}`);
      });
    },
    onError: (err: AxiosErrorResponse) => {
      if (err.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
        showToastModal(ERROR.CREATE.FAIL);
      }
    },
  });

  return { ...mutation };
};
