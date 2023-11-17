import { useEffect } from "react";
import { login } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import * as Yup from 'yup';

import { Box } from '@mui/system';
import HttpsIcon from '@mui/icons-material/Https';
import { Avatar, Button, TextField, Typography } from '@mui/material'
import { LoadingButton } from "@mui/lab";

const Login = () => {

    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
        if(user) {
            navigate('/dashboard');
        };
    }, [user]);

    
    const onSubmit = async({ email, password }, { setSubmitting, setErrors, resetForm }) => {
        console.log({ email, password });
        try {
            const credentialUser = await login({email, password});
            console.log(credentialUser);
            resetForm();
        } catch (error) {
            console.log(error);
            console.log(error.code);
            console.log(error.message);
            if(error.code === 'auth/user-not-found'){
                setErrors({email:'Usuario No Registrado'});
            }
            if(error.code === 'auth/wrong-password'){
                setErrors({password:'Contraseña incorrecta'});
            }
        } finally {
            setSubmitting(false);
        };
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email no válido').required('Email requerido'),
        password: Yup.string().trim().min(6,'Mínimo 6 carácteres').required('Password requerido')
    });

    return (
        <Box sx={{ mt: 8, maxWidth:'400px', mx:'auto', textAlign:'center'}}>

            <Avatar sx={{ mx:'auto', bgcolor:'#8d60c0' }}>
                <HttpsIcon/>
            </Avatar>
            <Typography variant="h5" component='h1'>Login</Typography>
            <Formik 
                initialValues={{ email: '', password:'' }}
                onSubmit={onSubmit}   
                validationSchema={validationSchema}         
            >
                {({ values, handleSubmit, handleChange, errors, touched, handleBlur, isSubmitting }) => (
                        <Box sx={{ mt: 4 }} component='form' onSubmit={handleSubmit}>
                            <TextField type='text'
                                placeholder="example@example.com" 
                                value={values.email} 
                                onChange={handleChange}
                                name="email"
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
                                name="password"
                                onBlur={handleBlur}
                                id="password"
                                label='Ingrese la contraseña...'
                                fullWidth
                                sx={{ mb: 3 }}
                                error={errors.password && touched.password}
                                helperText={errors.password && touched.password && errors.password}                                
                            />

                            <LoadingButton 
                                type='submit' 
                                disabled={isSubmitting}
                                loading={isSubmitting}
                                variant="contained"
                                sx={{mb: 3}}
                                fullWidth
                            >
                                Log In
                            </LoadingButton>
                            
                            <Button
                                fullWidth
                                component={Link}
                                to='/register'
                            >
                                ¿No tienes cuenta? Regístrate.
                            </Button>
                        </Box>
                    )
                }
            </Formik>
        </Box>
    );
};

export default Login;