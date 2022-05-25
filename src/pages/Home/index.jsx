import React, { useState, useEffect } from 'react'
import './style.css'
import { Card } from '../../components/Card'

export function Home() {
  const [studentName, setStudentName] = useState()
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({ name: '', avatar: '' })

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setStudents(prevState => [...prevState, newStudent])

    const input = document.querySelector("#input")
    input.value = ""
  }

  useEffect(() => {
    fetch('https://api.github.com/users/tpessoaaraujo')
      .then(response => response.json())
      .then(data => {
        setUser({
          name: data.name,
          avatar: data.avatar_url
        })
      })
  }, [])

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
        type="text"
        id="input"
        placeholder="Digite o nome..."
        onChange={event => setStudentName(event.target.value)}
      />
      <button
        type="button"
        id="btn"
        onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        students.map(student => (
          <Card
            key={student.time}
            name={student.name}
            time={student.time}
          />
        ))
      }

      {
        document.addEventListener("keypress", function (e) {
          if (e.defaultPrevented) {
            return;
          }
          switch (e.key) {
            case "Enter":
              var btn = document.querySelector("#btn")
              btn.click()
              break;
            default:
              return
          }
          e.preventDefault();
        }, true)
      }
    </div>
  )
}