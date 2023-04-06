// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Forminput from './Forminput';
import Pages from './Pages';
import './Home.css';

const Home = () => {
  // const navigate = useNavigate();

  // const onSubmit = () => navigate('/posts');

  // return (
  //   <main>
  //     <div className="bg-light p-5 mb-5">
  //       <h1>React + Bootstrap v4 </h1>
  //       <p>React template with Bootstrap version v4</p>
  //       <p>
  //         <Button variant="primary">Learn more</Button>
  //       </p>
  //     </div>
  //     <Container>
  //       <Form>
  //         <Button onClick={onSubmit}>Goto Posts</Button>
  //       </Form>
  //     </Container>
  //   </main>
  // );
  const [values, setValues] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    address: '',
    countryCode: '',
    phoneNumber: '',
  });
  const [focused, setFocused] = useState(false);
  const [step, setStep] = useState(1);
  const [required, setrequired] = useState(false);
  const navigate = useNavigate();
  console.log(step);
  const inputs = [
    {
      id: 1,
      name: 'email',
      type: 'email',
      placeholder: 'email',
      label: 'Email*',
      errorMessage: 'Must be a valid email ID',
      required: true,
    },
    {
      id: 2,
      name: 'password',
      type: 'password',
      placeholder: 'password',
      label: 'Password*',
      errorMessage:
        'Password Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters',
      required: true,
      // pattern:"^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z][A-Za-z0-9!@#$%^&*()_+]{8,20}$"
      pattern:
        '^(?=.*[a-z].*[a-z].*)(?=.*[A-Z].*[A-Z].*)(?=.*\\d.*\\d.*)(?=.*[-+_!@#$%^&*.,?].*[-+_!@#$%^&*.,?].*).+$',
      // pattern:"^(?=(?:\\D*\\d){2})(?=(?:[^a-z]*[a-z]){2})(?=[^A-Z]*[A-Z])(?=(?:\\w*\\W){2})"
    },
  ];
  const inputs2 = [
    {
      id: 1,
      name: 'firstname',
      type: 'text',
      placeholder: 'firstname',
      label: 'First Name*',
      errorMessage: 'Firstname should  be only alphebets 2-50 characters',
      pattern: '^[A-Za-z]{2,50}$',
      required: true,
    },
    {
      id: 2,
      name: 'lastname',
      type: 'text',
      placeholder: 'lastname',
      label: 'Last Name',
      errorMessage: 'Lastname should be only alphebets',
      pattern: '^[A-Za-z]+$',
    },
    {
      id: 3,
      name: 'address',
      type: 'text',
      placeholder: 'address',
      label: 'Address*',
      errorMessage: 'Address should be atleast 10 characters',
      pattern: '^.{10,}$',
      required: true,
    },
  ];
  const inputs3 = [
    {
      id: 1,
      name: 'countryCode',
      label: 'CountryCode*',
      required: true,
    },
    {
      id: 2,
      name: 'phoneNumber',
      type: 'text',
      placeholder: 'phoneNumber',
      label: 'PhoneNumber*',
      errorMessage: 'Please enter 10 digit numeric phone number',
      pattern: '^[0-9]{10}$',
      required: true,
    },
    {
      id: 3,
      name: 'acceptTermsAndCondition',
      type: 'checkbox',
      label: 'Accept Terms And Conditions',
      errorMessage: '',
      required: true,
    },
  ];
  const handlesubmit = e => {
    e.preventDefault();

    if (step === 3 && (values.countryCode === '' || values.phoneNumber === '')) {
      setrequired(true);
    } else {
      setrequired(false);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      };
      fetch('https://a0329568-71ba-47b1-b1af-8da6856391c7.mock.pstmn.io/submit', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.message) {
            alert(`${data.message}${JSON.stringify(values)}`);
            navigate('/posts');
          } else {
            alert('some error occured.Please check url');
          }
        })
        .catch(error => {
          alert('some error occured');
          console.log(error);
        });

      // alert(JSON.stringify(values))
    }
  };

  const handlenext = e => {
    e.preventDefault();
    if (
      (step === 1 && (values.email === '' || values.password === '')) ||
      (step === 2 && (values.firstname === '' || values.address === ''))
    ) {
      setrequired(true);
    } else {
      setrequired(false);
      setStep(step + 1);
      console.log(step);
    }
  };

  const handleback = e => {
    e.preventDefault();
    setStep(step - 1);
  };

  const onChangefn = e => {
    if (e.target.name !== 'acceptTermsAndCondition') {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  console.log(values);
  return (
    <div className="app">
      <form>
        <Pages setStep={setStep} />
        <h2>Register</h2>
        {step === 1 &&
          inputs.map(input => (
            <Forminput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChangefn={onChangefn}
              setFocused={setFocused}
              focused={focused}
            />
          ))}
        {step === 2 &&
          inputs2.map(input => (
            <Forminput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChangefn={onChangefn}
              setFocused={setFocused}
              focused={focused}
            />
          ))}
        {step === 3 &&
          inputs3.map(input => (
            <Forminput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChangefn={onChangefn}
              setFocused={setFocused}
              focused={focused}
            />
          ))}

        <div className="buttonscontainer">
          {step !== 1 && (
            <button type="button" className="btn btn-primary" onClick={handleback}>
              BACK
            </button>
          )}
          {step !== 3 && (
            <button type="submit" className="btn btn-primary" onClick={handlenext}>
              SAVE&NEXT
            </button>
          )}
          {step === 3 && (
            <button type="submit" className="btn btn-primary" onClick={handlesubmit}>
              SUBMIT
            </button>
          )}
        </div>
        <div>{required && <p className="reqired">Please fill required fields</p>}</div>
      </form>
    </div>
  );
};

export default Home;
