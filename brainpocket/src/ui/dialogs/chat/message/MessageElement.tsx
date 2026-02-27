import type { MessageElementProps } from "../../../../bll/types/DialogsTypes";
import styles from "./MessageElement.module.css";

export function MessageElement({ text, avatar, userLastName, sender, loginUserAvatar }: MessageElementProps) {
  if (sender === "me") {
    return (
      <div className={styles.myMessage}>
        <div className={styles.myText}>{text}</div>
        <img className={styles.avatar} src={loginUserAvatar} alt="me"></img>
      </div>
    );
  } else {
    return (
      <div className={styles.companionMessage}>
        <img className={styles.avatar} src={avatar} alt={userLastName}></img>
        <div className={styles.opText}>{text}</div>
      </div>
    );
  }
}
