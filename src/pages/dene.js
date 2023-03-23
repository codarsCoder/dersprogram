import { useState } from 'react';

export default function FormPage() {
  const [inputs, setInputs] = useState([{ name: '', surname: '', email: '' }]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedInputs = [...inputs];
    updatedInputs[index] = { ...updatedInputs[index], [name]: value };
    setInputs(updatedInputs);
  };

  const handleAddInput = () => {
    setInputs([...inputs, { name: '', surname: '', email: '' }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input, index) => (
        <div key={index}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={(event) => handleInputChange(index, event)}
            />
          </label>
          <label>
            Surname:
            <input
              type="text"
              name="surname"
              value={input.surname}
              onChange={(event) => handleInputChange(index, event)}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={(event) => handleInputChange(index, event)}
            />
          </label>
        </div>
      ))}
      <button type="button" onClick={handleAddInput}>
        Add input
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}
