import { useGetContacts } from "../../../bll/Hooks/ProfilePageHooks/useGetContacts";
import type { ContactsProps } from "../../../bll/types/profileTypes";
import { ContactsForm } from "./contact/ContactsForm";
import styles from "./Contacts.module.css";

export function Contacts({ loginUserId, userId, contacts }: ContactsProps) {
  const {contactsList, editMode, openSettings, closeSettings} = useGetContacts(contacts);
  return (
    <>
      {editMode ? (
        <div className={styles.contacts}>
          <div className={styles.c_head}>контакты</div>{" "}
          <ContactsForm contacts={contacts} loginUserId={loginUserId} closeSettings={closeSettings} />
        </div>
      ) : (
        <div className={styles.contacts}>
          <div className={styles.c_head}>
            контакты
            {loginUserId === userId && (
              <button className={styles.gear_button} onClick={openSettings}>
                ⚙️
              </button>
            )}
          </div>
          {contactsList}
        </div>
      )}
    </>
  );
}
