import React, { useEffect, useState } from 'react';
import './style.css';

import { Card, CardProps } from '../../Components/Card';

type ProfileResponse = {
  name: string;
  avatar_url: string;
};

type User = {
  name: string;
  avatar: string;
};

export function Home() {
  const [studentName, setStudentName] = useState<string>('');
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User);
  const [showNameError, setShowNameError] = useState(false);

  function clearError() {
    setShowNameError(false);
    document.getElementById('demo')?.style.setProperty('border', 'none');
  }

  function handleAddStudent() {
    if (studentName) {
      const newStudent = {
        name: studentName,
        time: new Date().toLocaleTimeString('pt-br', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      };

      setStudents(previousState => [...previousState, newStudent]);
    } else {
      setShowNameError(true);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/viktoramorim');
      const data = (await response.json()) as ProfileResponse;

      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>

        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>
      <input
        className="demo"
        type="text"
        placeholder="Digite o nome..."
        onChange={event => setStudentName(event.target.value)}
      />

      {showNameError && <p className="colorError">Campo Obrigatório.</p>}

      <h2>Nome: {studentName} </h2>

      <button type="button" onClick={clearError}>
        Limpar erro
      </button>

      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {students.map(student => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}
    </div>
  );
}
