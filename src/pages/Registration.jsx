import React, { useState } from 'react';
import login from '../assets/login.svg'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    InputGroup,
    Input,
    InputRightElement,
    Button,
    Heading,
    useToast
} from "@chakra-ui/react"
import '../styles/Register.css'
import { emailRegex, passRegex } from '../utils/RegEx'
import { Link, useNavigate } from "react-router-dom";
import authFunctions from '../authentication/authFunctions'
import axios from 'axios';


const Registration = () => {
    const toast = useToast();
    const [show, setShow] = useState(false)
    const [regInfo, setRegInfo] = useState({})
    const [inputError, setInputError] = useState({})
    const navigate = useNavigate();

    const handleClick = () => setShow(!show)

    const handleInputValidation = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        const info = { ...regInfo };
        if (inputName === 'email') {
            if (!emailRegex.test(inputValue)) {
                setInputError({ ...inputError, email: "Invalid Email" })
                info[inputName] = null;
                setRegInfo(info)
            } else {
                setInputError({ ...inputError, email: "" });
                info[inputName] = inputValue;
                setRegInfo(info)
            };
        };
        if (inputName === 'password') {
            if (!passRegex.test(inputValue)) {
                setInputError({ ...inputError, password: "Password must be more than 8 chars combine with uppercase and lowercase, and at least one number" })
                info[inputName] = null;
                setRegInfo(info)
            }
            else {
                setInputError({ ...inputError, password: "" })
                info[inputName] = inputValue;
                setRegInfo(info)
            }
        };
        if (inputName === 'name') {
            info[inputName] = inputValue;
            setRegInfo(info)
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const res = await authFunctions.registerUser(regInfo);
        console.log(res);
        if (res) {
            navigate('/login')
        }


    };


    return (
        <>
            <div className='row '>
                <div className="col-md-6">
                    <img src={login} alt="" srcSet="" />
                </div>

                <div className="col-md-6 shadow-sm rounded-3 border p-5 register_div">
                    <Heading className='mb-3' as="h1" size="xl" isTruncated> Create Your Account! </Heading>
                    <FormControl id="name" isRequired>
                        <FormLabel> <i class="bi bi-type" /> Name</FormLabel>
                        <Input onChange={handleInputValidation} size="lg" name='name' type="text" placeholder="Enter your Name" />
                    </FormControl>
                    <FormControl id="email" isRequired>
                        <FormLabel> <i class="bi bi-envelope-fill" /> Email</FormLabel>
                        <Input onChange={handleInputValidation} size="lg" name='email' type="email" placeholder="Enter email address" />
                        {
                            inputError?.email &&
                            <p>{inputError?.email}</p>
                        }
                    </FormControl>

                    <FormControl id="password" isRequired>
                        <FormLabel ><i class="bi bi-key-fill" /> Password</FormLabel>
                        <InputGroup size="lg">
                            <Input
                                name='password'
                                onChange={handleInputValidation}
                                pr="4.5rem"
                                type={show ? "text" : "password"}
                                placeholder="Enter password"
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        {
                            inputError?.password &&
                            <p>{inputError?.password}</p>
                        }
                    </FormControl>
                    <Button onClick={handleRegister} colorScheme="teal" size="md" className='mt-4 '> Register </Button>
                    <p>Already have an account? Please
                        <Link to='/login'>
                            <Button className='ms-2' colorScheme="teal" variant="outline"> Log In </Button>
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Registration;