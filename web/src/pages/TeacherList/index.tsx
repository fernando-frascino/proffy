import React from 'react';

import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import TeacherIcon from '../../components/TeacherItem';

import './styles.css';
import Select from '../../components/Select';

const TeacherList: React.FC = () => {
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader
        title="Estes são os proffys disponíveis."
      >
        <form id="search-teachers">

          <Select
            name="subject"
            label="Matéria"
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Física', label: 'Física' },
              { value: 'Química', label: 'Química' },
              { value: 'Inglês', label: 'Inglês' },
              { value: 'Português', label: 'Português' },
              { value: 'Redação', label: 'Redação' },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input name="time" label="Hora" type="time" />

        </form>
      </PageHeader>

      <main>
        <TeacherIcon />
        <TeacherIcon />
        <TeacherIcon />
      </main>
    </div>
  )
}

export default TeacherList;