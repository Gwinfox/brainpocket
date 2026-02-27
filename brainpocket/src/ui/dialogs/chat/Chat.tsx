import { useGetDialog } from "../../../bll/Hooks/DialogsHooks/useGetDialog";
import type { ChatProps, Message } from "../../../bll/types/DialogsTypes";
import styles from "./Chat.module.css";
import { MessageElement } from "./message/MessageElement";
import SendMessage from "./sendMessage/SendMessage";

export function Chat({ dialog = [], avatar, userLastName, dialogId, loginUserAvatar }: ChatProps) {
  const { addMessage, actualDialog } = useGetDialog(dialog);
  return (
    <div>
      <div className={styles.messages}>
        {actualDialog.map((m: Message) => (
          <div key={m.id}>
            <MessageElement
              text={m.text}
              avatar={avatar}
              userLastName={userLastName}
              sender={m.sender}
              loginUserAvatar={loginUserAvatar}
            />
          </div>
        ))}
      </div>
      <SendMessage addMessage={addMessage} />
    </div>
  );
}
