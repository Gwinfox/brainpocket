import type { EditStatusProps } from "../../../bll/types/profileTypes";
import styles from "./Status.module.css";

export function EditStatus({ setNewStatus, handleChangeStatus, statusText }: EditStatusProps) {
  return (
    <div>
      <input
        className={styles.newStatus}
        onBlur={setNewStatus}
        autoFocus={true}
        onChange={handleChangeStatus}
        value={statusText}
      />
    </div>
  );
}
