import { useGetUsers } from "../../bll/Hooks/UsersHooks/useGetUsers";
import type { UsersProps } from "../../bll/types/usersTypes";
import { Paginator } from "../paginator/Paginator";
import styles from "./Users.module.css";
import { UsersElement } from "./usersElement/UsersElement";

function Users({ userData }: UsersProps) {
  if (!userData) {
    return null;
  }
  const { users, totalUsersCount, onPageChanged } = useGetUsers();
  return (
    <div>
      <div className={styles.userList}>
        {users.map((u, i) => (
          <div key={i + 1}>
            <UsersElement loginUserId={userData.userId} user={u} loginUserFriends={userData.friends} />
          </div>
        ))}
      </div>
      <Paginator totalItemsCount={totalUsersCount} pageSize={5} onPageChanged={onPageChanged} />
    </div>
  );
}
export default Users;
