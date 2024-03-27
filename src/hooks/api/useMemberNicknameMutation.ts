import { putMemberNickname } from '@/api/member/member';
import { useMutation } from '@tanstack/react-query';

export const useMemberNicknameMutation = () => {
  return useMutation({
    mutationFn: putMemberNickname,
    onError: (error) => {
      console.error(error);
    },
  });
};
