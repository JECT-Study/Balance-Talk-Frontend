import { OptionKeys } from '@/constants/optionSets';
import { ProfileIconProps, ProfileLabelProps, SelectGroupItem } from './atoms';
import { InfoBoxProps, MyContentBoxProps, SideBoxProps } from './molecules';

export interface SideBarProps extends ProfileLabelProps, SideBoxProps {
  nickname: string;
  profileImageUrl?: ProfileIconProps['imgUrl'];
}

export interface OptionBarProps {
  selectGroupItems: SelectGroupItem[];
  initialSelectedGroupValue?: OptionKeys;
}

export interface InfoItem extends InfoBoxProps {
  editedAt: string;
}

export interface InfoListProps {
  items: InfoItem[];
}

export interface MyContentItem extends MyContentBoxProps {
  editedAt: string;
}

export interface MyContentListProps {
  items: MyContentItem[];
}
