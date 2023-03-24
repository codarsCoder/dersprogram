import { useState } from 'react';

const daysOfWeek = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

export default function Form() {
  const [dayInputs, setDayInputs] = useState({});

  const addInput = (day) => {
    setDayInputs({
      ...dayInputs,
      [day]: [...(dayInputs[day] || []), { select: '', input: '' }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dayInputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      {daysOfWeek.map((day) => (
        <div key={day}>
          <h2>{day}</h2>
          {dayInputs[day]?.map((input, index) => (
            <div key={index}>
              <select
                value={input.select}
                onChange={(e) =>
                  setDayInputs({
                    ...dayInputs,
                    [day]: [
                      ...dayInputs[day].slice(0, index),
                      { ...input, select: e.target.value },
                      ...dayInputs[day].slice(index + 1)
                    ]
                  })
                }
              >
                <option value="">Seçiniz</option>
                <option value="Kahvaltı">Kahvaltı</option>
                <option value="Öğle Yemeği">Öğle Yemeği</option>
                <option value="Akşam Yemeği">Akşam Yemeği</option>
              </select>
              <input
                type="text"
                placeholder="Yemek İsmi"
                value={input.input}
                onChange={(e) =>
                  setDayInputs({
                    ...dayInputs,
                    [day]: [
                      ...dayInputs[day].slice(0, index),
                      { ...input, input: e.target.value },
                      ...dayInputs[day].slice(index + 1)
                    ]
                  })
                }
              />
            </div>
          ))}
          <button onClick={() => addInput(day)}>Ekle</button>
        </div>
      ))}
      <button type="submit">Gönder</button>
    </form>
  );
}
