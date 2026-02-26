import { useEffect, useState, type JSX } from "react";
import type { Contacts } from "../types/profileTypes";
import { Contact } from "../../ui/profilePage/contacts/contact/Contact";

export function useGetContacts(contacts: Contacts) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [localStateContacts, setLocalStateContacts] = useState<Contacts>(contacts)
  const [contactsList, setContactsList] = useState<JSX.Element[] | null>(null);
  const openSettings = () => {
    setEditMode(true);
  };
  const closeSettings = (data:Contacts) => {
    setEditMode(false);
    setLocalStateContacts(data)
  };
  useEffect(() => {
    const contactItems = Object.entries(localStateContacts).map(([key, value], i) => (
      <div key={i + 1}>
        <Contact contact={key} value={value} />
      </div>
    ));
    setContactsList(contactItems);
  }, [localStateContacts]);
  return { contactsList, editMode, openSettings, closeSettings };
}
