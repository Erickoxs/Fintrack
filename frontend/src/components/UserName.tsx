import React, { useEffect, useState } from 'react';

const UserName = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Si el objeto tiene una propiedad `name`, úsala
        setUsername(parsedUser.name || parsedUser.username || parsedUser);
      } catch (error) {
        // Si no es un JSON válido, usarlo directamente
        setUsername(storedUser);
      }
    }
  }, []);

  return <h1>Hola {username ? username : 'Usuario'}!</h1>;
};

export default UserName;
