import { useState } from 'react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function Form() {
  const [formFields, setFormFields] = useState([]);
  
  const handleAddField = (day) => {
    const fieldIndex = formFields.findIndex(field => field.day === day);
    const newFields = [...formFields];
    newFields[fieldIndex].selects.push('');
    newFields[fieldIndex].inputs.push('');
    setFormFields(newFields);
  };
  
  const handleChange = (dayIndex, fieldIndex, field, value) => {
    const newFields = [...formFields];
    newFields[dayIndex][field][fieldIndex] = value;
    setFormFields(newFields);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formFields);
  };
  
  // Initialize formFields array
  useState(() => {
    const initialFields = daysOfWeek.map(day => ({
      day,
      selects: [''],
      inputs: ['']
    }));
    setFormFields(initialFields);
  }, []);
  
  return (
    <form onSubmit={handleSubmit}>
      {formFields.map((field, dayIndex) => (
        <div key={field.day}>
          <label>{field.day}</label>
          {field.selects.map((select, selectIndex) => (
            <select key={`select-${dayIndex}-${selectIndex}`} value={select} onChange={(event) => handleChange(dayIndex, selectIndex, 'selects', event.target.value)}>
              <option value="">Choose an option</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          ))}
          {field.inputs.map((input, inputIndex) => (
            <input key={`input-${dayIndex}-${inputIndex}`} type="text" value={input} onChange={(event) => handleChange(dayIndex, inputIndex, 'inputs', event.target.value)} />
          ))}
          <button type="button" onClick={() => handleAddField(field.day)}>Add field</button>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
