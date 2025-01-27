import { getMember } from '@/api/member';
import { Member } from '@/types/member';
import { useQuery } from '@tanstack/react-query';

export const useMemberQuery = () => {
  const {
    data: member,
    isLoading,
    isError,
  } = useQuery<Member>({
    queryKey: ['members'],
    queryFn: () => getMember(),
  });
  return { member, isLoading, isError };
};

