import React, { useState, useCallback, FormEvent } from 'react';

import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import TeacherIcon, { Teacher } from '../../components/TeacherItem';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';

const TeacherList: React.FC = () => {

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeahers] = useState([]);

  const searchTeachers = useCallback((e: FormEvent) => {
    e.preventDefault();
    async function getTeachers() {
      const response = await api.get('/classes', {
        params: {
          subject,
          week_day,
          time,
        },
      });

      setTeahers(response.data);
    }

    try {
      getTeachers();
    } catch (error) {
      console.log(error)
    }
  }, [subject, week_day, time]);

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader
        title="Estes são os proffys disponíveis."
      >
        <form id="search-teachers" onSubmit={searchTeachers}>

          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={e => { setSubject(e.target.value) }}
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
            value={week_day}
            onChange={e => { setWeekDay(e.target.value) }}
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
          <Input 
            name="time" 
            label="Hora" 
            type="time" 
            value={time}
            onChange={e => { setTime(e.target.value) }}
          />

          <button type="submit">
            Buscar
          </button>

        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherIcon key={teacher.id} teacher={teacher} />
        })}
      </main>
    </div>
  )
}

export default TeacherList;