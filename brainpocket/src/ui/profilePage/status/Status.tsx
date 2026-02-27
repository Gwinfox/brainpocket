import styles from "./Status.module.css";
import type { StatusProps } from "../../../bll/types/profileTypes";
import { useChangeStatus } from "../../../bll/Hooks/ProfilePageHooks/useChangeStatus";
import { EditStatus } from "./EditStatus";

export function Status({ status, loginUserId, userId }: StatusProps) {
  const { handleDoubleClick, handleChangeStatus, setNewStatus, editMode, statusText } = useChangeStatus(
    loginUserId,
    userId,
    status
  );
  return (
    <>
      {editMode ? (
        <EditStatus setNewStatus={setNewStatus} handleChangeStatus={handleChangeStatus} statusText={statusText} />
      ) : (
        <div className={styles.status}>
          <span onDoubleClick={handleDoubleClick}>{statusText}</span>
        </div>
      )}
    </>
  );
}
