/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-console */
import { useState, useEffect, useCallback } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { END_POINT } from '@/constants/api';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { axiosInstance } from '@/api/interceptor';
import { NotificationMessage } from '@/types/notification';

const baseURL =
  process.env.NODE_ENV === 'production' ? process.env.API_URL : '/api';

export const postNotification = async (Id: number) => {
  const response = await axiosInstance.post(END_POINT.READ_NOTIFICATION(Id));
  return response;
};

export const useFetchSSE = () => {
  const [messages, setMessages] = useState<NotificationMessage[]>([]);

  const accessToken = useNewSelector(selectAccessToken);

  useEffect(() => {
    if (!accessToken) return;

    const EventSource = EventSourcePolyfill || NativeEventSource;

    const eventSource = new EventSource(`${baseURL}${END_POINT.NOTIFICATON}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    console.log('EventSource가 초기화되었습니다:', eventSource);

    eventSource.onmessage = (event) => {
      try {
        console.log('SSE 메시지를 수신했습니다:', event);
        // TODO: 타입 단언에서 타입 가드로 수정
        const newMessage = JSON.parse(event.data) as NotificationMessage;
        setMessages((prev) => [newMessage, ...prev]);
      } catch (err) {
        console.error('SSE 데이터 파싱에 실패했습니다:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('EventSource 에러:', err);
      eventSource.close();
    };

    return () => {
      console.log('EventSource를 종료합니다.');
      eventSource.close();
    };
  }, []);

  const handleMarkAsRead = useCallback(async (notificationId: number) => {
    try {
      await postNotification(notificationId);
      setMessages((prevMessages) =>
        prevMessages.map((message) => {
          if (message.id !== notificationId) return message;
          return { ...message, isNew: false };
        }),
      );
    } catch (error) {
      console.error('알림 읽음 처리 중 오류 발생:', error);
    }
  }, []);

  return {
    messages,
    handleMarkAsRead,
  };
};
