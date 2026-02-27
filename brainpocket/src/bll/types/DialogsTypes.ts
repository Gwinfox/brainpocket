import type { UserData } from "./appTypes";

//Пропсы
export type DialogsProps = {
  userData: UserData | null;
};
export type SenderProps = {
  id: number;
  avatar: string;
  name: string;
};
export type ChatProps = {
  dialog: Array<Message>;
  avatar: string;
  userLastName: string;
  dialogId: number;
  loginUserAvatar: string;
};
export type MessageElementProps = {
  text: string;
  avatar: string;
  userLastName: string;
  sender: string;
  loginUserAvatar: string;
};
export type SendMessageProps = {
  addMessage: (message:string) => void;
};

export type Dialogs = Array<Dialog>;
export type Dialog = {
  id: number;
  sender1: number;
  sender2: number;
  senderData: SenderData;
  dialog: Array<Message>;
};
type SenderData = {
  firstName: string;
  lastName: string;
  avatar: string;
};
export type Message = {
  id: number;
  text: string;
  sender: string;
};
export type addMessageForm = {
    newMessage: string
}
