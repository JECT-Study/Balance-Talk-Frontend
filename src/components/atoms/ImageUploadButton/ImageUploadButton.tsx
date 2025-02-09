import React, { useRef } from 'react';
import { Camera } from '@/assets';
import { useFileUploadMutation } from '@/hooks/api/file/useFileUploadMutation';
import * as S from './ImageUploadButton.style';
import { iconStyle } from './ImageUploadButton.style';

interface ImageUploadButtonProps {
  imageCount: number;
  setImgUrls: React.Dispatch<React.SetStateAction<string[]>>;
  fileIds: number[];
  setFileIds: (name: string, fileIds: number[]) => void;
  setIsUploadingImage: React.Dispatch<React.SetStateAction<boolean>>;
  setNewFileIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const ImageUploadButton = ({
  imageCount,
  setImgUrls,
  fileIds,
  setFileIds,
  setIsUploadingImage,
  setNewFileIds,
}: ImageUploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadFiles } = useFileUploadMutation(setIsUploadingImage);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImageFiles = Array.from(event.target.files);
      const remainCount = 10 - imageCount;

      const limitedNewFiles = newImageFiles.slice(0, remainCount);
      const imageFormData = new FormData();
      limitedNewFiles.forEach((file) => imageFormData.append('file', file));

      uploadFiles(
        { formData: imageFormData, params: { type: 'TALK_PICK' } },
        {
          onSuccess: (res) => {
            const updatedFileIds = [...fileIds, ...res.fileIds];

            setImgUrls((prev) => [...prev, ...res.imgUrls]);
            setNewFileIds((prev) => [...prev, ...res.fileIds]);

            setFileIds('fileIds', updatedFileIds);
            setIsUploadingImage(false);
          },
          onError: () => {
            setIsUploadingImage(false);
          },
        },
      );
    }
  };

  const handleButtonClick = () => {
    if (imageCount === 10) return;

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <button
      type="button"
      css={S.buttonStyle(imageCount)}
      onClick={handleButtonClick}
    >
      <div css={S.contentStyle}>
        <Camera css={S.iconStyle} />
        <div css={S.countWrapStyle}>{imageCount}/10</div>
      </div>
      <input
        ref={fileInputRef}
        css={S.inputStyle}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
    </button>
  );
};

export default ImageUploadButton;
