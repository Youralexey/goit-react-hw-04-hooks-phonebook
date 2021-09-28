import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  Title,
  SectionTitle,
} from "./Container/Container.styled.jsx";
import Form from "./Form/Form.jsx";
import ContactList from "./ContactList/ContactList.jsx";
import Input from "./Input/Input.jsx";
// [
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ]
export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem("contactList")) ?? []
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contactList", JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandle = ({ name, number }) => {
    const contact = { name, number, id: uuidv4() };
    contacts.find(
      (savedContact) => savedContact.name.toLowerCase() === name.toLowerCase()
    )
      ? alert(`${name} is already in contacts`)
      : setContacts((prevContacts) => [...prevContacts, contact]);
  };

  const handleDelete = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const normaliseFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normaliseFilter)
  );

  return (
    <Container>
      <Title>Phonebook</Title>
      <Form handleSubmit={formSubmitHandle} />
      {contacts.length !== 0 && <SectionTitle>Contacts</SectionTitle>}
      {contacts.length !== 0 && (
        <Input
          name="Find contacts by name"
          type="text"
          value={filter}
          onChange={changeFilter}
        />
      )}
      <ContactList contacts={filteredContacts} onDeleteContact={handleDelete} />
    </Container>
  );
}
