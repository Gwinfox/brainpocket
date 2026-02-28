import { Route, Routes } from "react-router-dom";
import { useGetDialogs } from "../../bll/Hooks/DialogsHooks/useGetDialogs";
import type { DialogsProps } from "../../bll/types/dialogsTypes";
import styles from "./Dialogs.module.css";
import { Sender } from "./sender/Sender";
import { Chat } from "./chat/Chat";

function Dialogs({ userData }: DialogsProps) {
  const { dialogs } = useGetDialogs(userData?.userId);
  if (!userData) {
    return null;
  }
  return (
    <div className={styles.dialogs}>
      <div className={styles.senders}>
        {dialogs &&
          dialogs.map((d, i) => (
            <div key={i}>
              <Sender
                id={d.id}
                avatar={d.senderData.avatar}
                name={d.senderData.firstName + " " + d.senderData.lastName}
              />
            </div>
          ))}
      </div>
      <div className={styles.chat}>
        <Routes>
          {dialogs &&
            dialogs.map((d, i) => (
              <Route
                path={"/" + (i + 1)}
                element={
                  <Chat
                    dialog={d.dialog}
                    avatar={d.senderData.avatar}
                    userLastName={d.senderData.lastName}
                    dialogId={d.id}
                    loginUserAvatar={userData.avatar}
                  />
                }
              />
            ))}
        </Routes>
      </div>
    </div>
  );
}
export default Dialogs;
