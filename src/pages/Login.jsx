import React, { useContext, useState } from 'react';
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
import '../styles/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import axios, { Axios } from 'axios';
import authFunctions from '../authentication/authFunctions';
import { UserContext } from '../App';

const Login = () => {
    const toast = useToast()
    const [show, setShow] = useState(false)
    const [loginInfo, setLoginInfo] = useState({});
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const handleClick = () => setShow(!show)


    const handleInput = (e) => {
        e.preventDefault()
        const info = { ...loginInfo }
        info[e.target.name] = e.target.value;
        setLoginInfo(info)
    }
    // console.log(loginInfo);

    const handleSignIn = async (e) => {
        e.preventDefault();
        const res = await authFunctions.loginUser(loginInfo);
        if (res) {
            setUser({
                "email": loginInfo.email
            })
            localStorage.setItem("user", JSON.stringify({
                "email": loginInfo.email
            }));

            navigate('/');
        }
        else {
            console.log("auth fail");
        }
    }

    return (
        <>
            <div className='row '>
                <div className="col-md-6 col-sm-12 shadow-sm rounded-3 border p-5 login_div">
                    <Heading className='mb-3' as="h1" size="xl" isTruncated> Enter Your Credential </Heading>
                    <FormControl id="email" isRequired>
                        <FormLabel> <i class="bi bi-envelope-fill" /> Email</FormLabel>
                        <Input onChange={handleInput} name='email' size="lg" type="email" placeholder="Enter email address" />
                    </FormControl>

                    <FormControl id="password" isRequired>
                        <FormLabel> <i class="bi bi-key-fill" /> Password</FormLabel>
                        <InputGroup size="lg">
                            <Input
                                onChange={handleInput}
                                name='password'
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
                    </FormControl>
                    <Button onClick={handleSignIn} colorScheme="teal" size="md" className='mt-4 '> Log In </Button>
                    <p>Don't have an account? Please
                        <Link to='/registration'>
                            <Button className='ms-2' colorScheme="teal" variant="outline"> Register </Button>
                        </Link>
                    </p>
                </div>

                <div className="col-md-6 col-sm-12">
                    <img src={login} alt="" srcSet="" />
                </div>
            </div>
        </>
    );
};

export default Login;