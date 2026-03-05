import { useButtonIsPushing } from "../../bll/Hooks/common/useButtonIsPushing";
import { useGetUsers } from "../../bll/Hooks/UsersHooks/useGetUsers";
import type { UsersProps } from "../../bll/types/usersTypes";
import { Paginator } from "../paginator/Paginator";
import styles from "./Users.module.css";
import { UsersElement } from "./usersElement/UsersElement";

function Users({ userData, setFriends }: UsersProps) {
  const { isPushing, isNotPushing, disabledButton } = useButtonIsPushing();
  const { usersList, totalUsersCount, onPageChanged, unfollow, follow } = useGetUsers(
    userData.userId,
    userData.friends,
    setFriends,
    isPushing,
    isNotPushing
  );
  return (
    <div>
      <div className={styles.userList}>
        {usersList &&
          usersList.map((u, i) => (
            <div key={i + 1}>
              <UsersElement
                user={u}
                follow={follow}
                unfollow={unfollow}
                disabledButton={disabledButton}
                loginUserFriends={userData.friends}
              />
            </div>
          ))}
      </div>
      <Paginator totalItemsCount={totalUsersCount} pageSize={5} onPageChanged={onPageChanged} />
    </div>
  );
}
export default Users;
