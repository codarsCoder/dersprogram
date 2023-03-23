import { useState } from 'react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Form() {

  const [formData, setFormData] = useState({
    Monday: [{ option1: '', option2: '' }],
    Tuesday: [{ option1: '', option2: '' }],
    Wednesday: [{ option1: '', option2: '' }],
    Thursday: [{ option1: '', option2: '' }],
    Friday: [{ option1: '', option2: '' }],
    Saturday: [{ option1: '', option2: '' }],
    Sunday: [{ option1: '', option2: '' }],
  });

  const handleOption1Change = (dayIndex, index, e) => {
    const { value } = e.target;
    const newFormData = { ...formData };
    newFormData[days[dayIndex]][index].option1 = value;
    setFormData(newFormData);
  };

  const handleOption2Change = (dayIndex, index, e) => {
    const { value } = e.target;
    const newFormData = { ...formData };
    newFormData[days[dayIndex]][index].option2 = value;
    setFormData(newFormData);
  };

  const handleAdd1 = (dayIndex) => {
    const newFormData = { ...formData };
    newFormData[days[dayIndex]].push({ option1: '', option2: '' });
    setFormData(newFormData);
  };

  const handleAdd2 = (dayIndex) => {
    const newFormData = { ...formData };
    newFormData[days[dayIndex]].push({ option1: '', option2: '' });
    setFormData(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };


  return (
    <form onSubmit={handleSubmit}>
      {days.map((day, dayIndex) => (
        <div key={day}>
          <h3>{day}</h3>
          {formData[day].map((data, index) => (
            <div key={index}>
              <div>
                <select
                  name="option"
                  value={data.option}
                  onChange={(e) => handleOptionChange(dayIndex, index, e)}
                >
                  <option value="">Choose an option</option>
                  <option value="Option 1">Option 1</option>
                  <option value="Option 2">Option 2</option>
                  <option value="Option 3">Option 3</option>
                </select>
                <input
                  type="text"
                  name="value"
                  value={data.value}
                  onChange={(e) => handleValueChange(dayIndex, index, e)}
                />
              </div>
              {index === formData[day].length - 1 && (
                <button type="button" onClick={() => handleAdd(dayIndex)}>
                  Add
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
