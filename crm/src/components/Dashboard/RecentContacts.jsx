import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import contactsService from '../../services/contacts';

const RecentContacts = () => {
  const { token } = useAuth();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await contactsService.getContacts(token);
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, [token]);

  return (
    <div className="contacts-table">
      <h2>Lista de Contactos Recientes</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Mensaje</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td><strong>{contact.nombre}</strong></td>
              <td>{contact.email}</td>
              <td>{contact.telefono}</td>
              <td>{contact.mensaje}</td>
              <td>{new Date(contact.fecha).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentContacts;