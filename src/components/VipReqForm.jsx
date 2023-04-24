import React from 'react';
import joi from 'joi';
import { formikValidateUsingJoi } from '../utils/formikValidateUsingJio';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const VipReq = () => {
  const {
    createVipReq,
    setVipReq,
    error,
    setError,
    activeUser,
    setIsInMainPage,
    isDark,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
  }, []);

  useEffect(() => {
    if (!activeUser) return;

    const { email, ...rest } = activeUser;
    form.setValues({
      email: email,
    });
  }, [activeUser]);
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: '',
      cardNumber: '',
    },
    async onSubmit(values) {
      try {
        const { data } = await createVipReq(values);

        setVipReq((req) => [...req, data]);

        toast(
          ` VIP req has been sent  
      Email: ${data.email}

        Card Number: ${data.cardNumber}
           `
        );
        navigate('/thank-you');
      } catch ({ response }) {
        setError(response.data);
      }
    },
    validate: formikValidateUsingJoi({
      email: joi
        .string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      cardNumber: joi.string().min(6).max(8).required(),
    }),
  });

  return (
    <>
      <form noValidate onSubmit={form.handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <Link
          style={{ color: isDark ? 'white' : 'black' }}
          className="my-card-link fs-3 "
          onClick={() => setIsInMainPage(true)}
          to={`/chat-room/${activeUser._id}`}
        >
          Go back
        </Link>

        <div className="container">
          <Input
            label={'Email'}
            type="email"
            id="email"
            value={form.email}
            placeholder="Enter email"
            labelClass={'label'}
            inputClass={'input'}
            {...form.getFieldProps('email')}
            error={form.touched.email && form.errors.email}
          />
        </div>
        <div className="container">
          {' '}
          <Input
            {...form.getFieldProps('cardNumber')}
            label={'Card Number'}
            type="text"
            id="cardNumber"
            value={form.cardNumber}
            placeholder="Enter valid Card Number "
            labelClass={'label'}
            inputClass={'input'}
            error={form.touched.cardNumber && form.errors.cardNumber}
          />
        </div>

        <div className="container">
          <button type="submit" className="sign-up-btn">
            Become VIP
          </button>
        </div>
      </form>
    </>
  );
};

export default VipReq;
