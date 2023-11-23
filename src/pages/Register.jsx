import { useState } from "react";
import { register } from "../config/firebase";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import * as Yup from 'yup';

import { Link } from "react-router-dom";

import { Box } from '@mui/system';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Avatar, Button, TextField, Typography } from '@mui/material'
import { LoadingButton } from "@mui/lab";

const Register = () => {

    const { user } = useUserContext();
    useRedirectActiveUser(user, '/dashboard');


    const onSubmit = async (
        { email, password },
        { setSubmitting, setErrors, resetForm }
      ) => {
        try {
          await register({ email, password });
          console.log("user registered");
          resetForm();
        } catch (error) {
          console.log(error.code);
          console.log(error.message);
          if (error.code === "auth/email-already-in-use") {
            setErrors({ email: "El email especificado ya está en uso" });
          }
        } finally {
          setSubmitting(false);
        }
      };

      const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email no válido').required('Email requerido'),
        password: Yup.string().trim().min(6, 'Mínimo 6 carácteres').required('Password requerido')
      });

    return (
        <Box sx={{ mt: 8, maxWidth:'400px', mx:'auto', textAlign:'center'}}>
            <Avatar sx={{ mx:'auto', bgcolor:'#da74da' }}>
                <AppRegistrationIcon/>
            </Avatar>
            <Typography variant="h5" component='h1'>Registrate</Typography>
            <Formik 
                initialValues={{email:'', password:''}}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {
                    ({ values, handleSubmit, handleChange, handleBlur, errors, touched, isSubmitting }) => (
                        <Box sx={{ mt: 4 }} component='form' onSubmit={handleSubmit}>
                            <TextField
                                type='email'
                                placeholder="example@example.com" 
                                value={values.email} 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="email"
                                label='Ingrese el correo electrónico...'
                                fullWidth
                                sx={{ mb: 3 }}
                                error={errors.email && touched.email}
                                helperText={errors.email && touched.email && errors.email}
                            />
                            
                            <TextField 
                                type="password" 
                                placeholder="abc123" 
                                value={values.password} 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="password"
                                label='Ingrese la contraseña...'
                                fullWidth
                                sx={{ mb: 3 }}
                                error={errors.password && touched.password}
                                helperText={errors.password && touched.password && errors.password}
                            />
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ mb: 3 }}
                                loading={isSubmitting}
                                disabled={isSubmitting}
                            >
                                Registrarse
                            </LoadingButton>
                            <Button 
                                type='submit'
                                fullWidth
                                component={Link}
                                to='/'
                            >
                                ¿Ya tienes una cuenta? Inicia Sesión.
                            </Button>
                        </Box>
                    )
                }
            </Formik>           
        </Box>
    );
};

export default Register;
