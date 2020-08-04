import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">

      <header>
        <img src="https://avatars2.githubusercontent.com/u/12703922?s=460&u=4582a31bb4e0b4bfa2ef84536d731aff286bdb1c&v=4" alt="Fernando Frascino" />
        <div>
          <strong>Fernando Frascino</strong>
          <span>Química</span>
        </div>
      </header>

      <p>
        Entusiaste Das melhores tecnologias de química avançada.
        <br /> <br />
        Apaixonado poe explodir coisas em laboratórios e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 120,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>

    </article>
  )
}

export default TeacherItem;