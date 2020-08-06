import React, { useState, useCallback, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../services/api';

interface ScheduleItemProps {
  week_day: number;
  from: string;
  to: string;
}

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState<ScheduleItemProps[]>([{ week_day: 0, from: '', to: '' }]);

  const addNewScheduleItem = useCallback(() => {
    setScheduleItems([
      ...scheduleItems, { week_day: 0, from: '', to: '' }
    ]);
  }, [scheduleItems]);

  const updateScheduleItems = useCallback((position: number, field: string, value: string) => {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }, [scheduleItems])

  const handleCreateClass = useCallback((e: FormEvent) => {
    e.preventDefault();
    
    async function postClasses() {
      await api.post('/classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems
      });
    }

    try {
      postClasses();
      history.push('/');

    } catch (error) {
      console.log(error);
    }

  }, [name, avatar, whatsapp, bio, subject, cost, scheduleItems, history]);

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />

            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => { setAvatar(e.target.value) }}
            />

            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(e) => { setWhatsapp(e.target.value) }}
            />

            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => { setBio(e.target.value) }}
            />

          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(e) => { setSubject(e.target.value) }}
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

            <Input
              name="cost"
              label="Custo de sua hora por aula"
              value={cost}
              onChange={(e) => { setCost(e.target.value) }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button onClick={addNewScheduleItem} type="button">+ Novo horário</button>
            </legend>

            {scheduleItems.map((shceduleItem, index) => {
              return (
                <div key={shceduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    value={shceduleItem.week_day}
                    onChange={e => updateScheduleItems(index, 'week_day', e.target.value)}
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
                    name="from" 
                    label="Das" 
                    type="time" 
                    value={shceduleItem.from}
                    onChange={e => updateScheduleItems(index, 'from', e.target.value)}
                  />

                  <Input 
                    name="to" 
                    label="Até" 
                    type="time" 
                    value={shceduleItem.to}
                    onChange={e => updateScheduleItems(index, 'to', e.target.value)}
                  />
                </div>
              );
            })}

          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm;