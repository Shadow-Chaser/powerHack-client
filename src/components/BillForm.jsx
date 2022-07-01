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
import { useState } from "react";

const BillForm = () => {

    const [billData, setBillData] = useState({});

    const handleInput = (e) => {
        e.preventDefault()
        const info = { ...billData }
        info[e.target.name] = e.target.value;
        setBillData(info)
    }
    // const handleSubmit = () => {
    //     console.log(billData);
    // };

    return (
        <div>
            <FormControl id="fullName" isRequired>
                <FormLabel>  Full Name</FormLabel>
                <Input onChange={handleInput} name='fullName' size="lg" type="text" placeholder="Enter full name" />
            </FormControl>

            <FormControl id="email" isRequired>
                <FormLabel>  Email</FormLabel>
                <Input onChange={handleInput} name='email' size="lg" type="email" placeholder="Enter email address" />
            </FormControl>

            <FormControl id="phone" isRequired>
                <FormLabel>  Phone</FormLabel>
                <Input onChange={handleInput} name='Phone' size="lg" type="number" placeholder="Enter phone number" />
            </FormControl>

            <FormControl id="paidAmount" isRequired>
                <FormLabel>  Paid Amount</FormLabel>
                <Input onChange={handleInput} name='paidAmount' size="lg" type="number" placeholder="Enter paid amount" />
            </FormControl>


        </div>
    )
};
export default BillForm;