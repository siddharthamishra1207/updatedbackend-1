import React,{useState} from 'react'

const Raise = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      const [step, setStep] = useState(1);
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // Do something with formData, like send it to an API or store it in a database
        console.log("Form submitted with data:", formData);
      };
    
      const renderStepOne = () => {
        return (
          <div>
            <h2>Step 1: Personal Information</h2>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button onClick={() => setStep(step + 1)}>Next</button>
          </div>
        );
      };
    
      const renderStepTwo = () => {
        return (
          <div>
            <h2>Step 2: Account Information</h2>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button onClick={() => setStep(step - 1)}>Back</button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        );
      };
    
      switch (step) {
        case 1:
          return renderStepOne();
        case 2:
          return renderStepTwo();
        default:
          return null;
      }
    };

export default Raise