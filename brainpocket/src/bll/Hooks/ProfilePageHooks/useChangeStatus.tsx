import { useEffect, useState } from "react";
import { profileAPI } from "../../../dal/api";
import { useGetError } from "../useGetError";

export function useChangeStatus(loginUserId: number, userId: number, status: string) {
  const { setGlobalError } = useGetError();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>(status);
  const handleDoubleClick = () => {
    loginUserId === userId && setEditMode(true);
  };
  const handleChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatusText(e.currentTarget.value);
  };
  const setNewStatus = () => {
    profileAPI.updateStatus(statusText, loginUserId).catch((err) => setGlobalError(err));
    setEditMode(false);
  };
  useEffect(() => {
    setStatusText(status);
  }, [status]);
  return { handleDoubleClick, handleChangeStatus, setNewStatus, editMode, statusText };
}
