import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFormik } from 'formik';
import { formikValidateUsingJoi } from '../utils/formikValidateUsingJio';
import Input from './Input';
import joi from 'joi';

import { Link } from 'react-router-dom';
const YourProfile = () => {
  const { myProfile, user, updateUser } = useAuth();
  const [userCard, setUserCard] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await myProfile(user._id);
      setUserCard(data);
    };
    getMyProfile();
  }, [myProfile]);

  useEffect(() => {
    if (!userCard) return;
    const { age, _id, vip, createdAt, __v,favorites, ...rest } = userCard;
    form.setValues({
      ...rest,
    });
  }, [userCard]);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: '',
      email: '',

      image: '',
      gender: '',
      password: '',
      confirmedPassword: '',
    },
    validate: formikValidateUsingJoi({
      name: joi.string().min(3).max(255).required(),
      email: joi
        .string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      password: joi.string().min(6).max(1024).required().label('password'),
      confirmedPassword: joi.any().required().equal(joi.ref('password')),

      gender: joi.string(),

      image: joi.string().allow(''),
    }),

    async onSubmit(values) {
      let { confirmedPassword, image, ...body } = values;
      const userImage =
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
      if (!image) {
        image = userImage;
      }
      try {
        await updateUser(user._id, { ...body, image });

        navigate(`/chat-room/${user._id}`);
      } catch ({ response }) {
        console.log(response.data);
      }
    },
  });

  return (
    <>
      <form noValidate onSubmit={form.handleSubmit}>
        <div className="container">
          {' '}
          <Input
            label={'Name'}
            type="text"
            id="name"
            labelClass={'label'}
            inputClass={'input'}
            {...form.getFieldProps('name')}
            error={form.touched.name && form.errors.name}
          />
        </div>
        <div className="container">
          <Input
            readOnly={true}
            label={'Email'}
            type="email"
            id="email"
            value={form.email}
            labelClass={'label'}
            inputClass={'input'}
            disabled
            {...form.getFieldProps('email')}
            error={form.touched.email && form.errors.email}
          />
        </div>
        <div className="container">
          {' '}
          <Input
            {...form.getFieldProps('password')}
            label={'Password'}
            type="password"
            id="password"
            value={form.password}
            placeholder="Choose Password"
            labelClass={'label'}
            inputClass={'input'}
            error={form.touched.password && form.errors.password}
          />
        </div>
        <div className="container">
          {' '}
          <Input
            {...form.getFieldProps('confirmedPassword')}
            label={'Confirm Password'}
            type="password"
            id="confirm-password"
            value={form.confirmedPassword}
            placeholder="Confirm Password"
            labelClass={'label'}
            inputClass={'input'}
            error={
              form.touched.confirmedPassword && form.errors.confirmedPassword
            }
          />
        </div>
        <div className="flex-row">
          <div className="container">
            <Input
              {...form.getFieldProps('gender')}
              label={'Male'}
              type="radio"
              value={'male'}
              labelClass={'label'}
              inputClass={'input'}
              error={form.touched.gender && form.errors.gender}
              name="gender"
            />
          </div>
          <div className="container">
            <Input
              {...form.getFieldProps('gender')}
              label={'Female'}
              type="radio"
              value={'female'}
              labelClass={'label'}
              inputClass={'input'}
              error={form.touched.gender && form.errors.gender}
              name="gender"
            />
          </div>
          <div className="container">
            <Input
              {...form.getFieldProps('gender')}
              label={'Non Binary'}
              type="radio"
              value={'non-binary'}
              labelClass={'label'}
              inputClass={'input'}
              error={form.touched.gender && form.errors.gender}
              name="gender"
            />
          </div>
        </div>

        {/* <div className="container">
          <Input
            {...form.getFieldProps('age')}
            label={'Date of birth'}
            type="date"
            id="age"
            labelClass={'label'}
            inputClass={'input w-25 fs-4'}
            error={form.touched.age && form.errors.age}
          />
        </div> */}

        <div className="container">
          <Input
            {...form.getFieldProps('image')}
            label={'Image'}
            type="text"
            id="image"
            labelClass={'label'}
            inputClass={'input fs-5'}
            error={form.touched.image && form.errors.image}
          />
          <button type="submit" className="sign-up-btn">
            Save changes
          </button>
        </div>
      </form>
      <Link className="link text-danger fs-3 m-auto" to={`/delete/${user._id}`}>
        <i className="bi bi-trash3-fill "></i> Delete your account
      </Link>
    </>
  );
};

export default YourProfile;
