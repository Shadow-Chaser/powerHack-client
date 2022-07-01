import { useContext, useEffect, useState } from "react";
import { BillContext } from "../App";
import '../styles/TableLayout.css'
import {
    InputGroup, InputRightAddon, Input, Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    useToast,

} from '@chakra-ui/react'
import BillForm from "./BillForm";
import axios from "axios";

const TableLayout = () => {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [bills, setBills] = useContext(BillContext);
    const [billData, setBillData] = useState({});

    const handleInput = (e) => {
        e.preventDefault()
        const info = { ...billData }
        if (e.target.name === 'paidAmount') {
            info[e.target.name] = parseInt(e.target.value);
        }
        else {
            info[e.target.name] = e.target.value;
        }
        setBillData(info)
    }
    const handleBillAdding = async () => {

        setBills([...bills, { ...billData, "_id": "Generating ID..." }])


        await axios.post('https://fierce-refuge-99891.herokuapp.com/add-billing', billData)
            .then(function (response) {
                let updatedBills = [...bills, { ...billData, "_id": response.data.id }]
                console.log(updatedBills);
                setBills(updatedBills)
                toast({
                    title: `Bill inserted successfully! `,
                    status: "success",
                    position: "top",
                    isClosable: true,
                })

            })
            .catch(function (error) {
                const poppedBills = bills.filter(b => b._id !== "Generating ID...");
                setBills(poppedBills)
                toast({
                    title: `Bill not inserted. Reason: ${error.message}`,
                    status: "error",
                    position: "top",
                    isClosable: true,
                })
                console.log(error);
            });
    };

    return (
        <div>
            <div className="search-bar d-flex justify-content-around mb-4">
                <div className="d-flex">
                    <h5>Billings</h5>
                    <div>
                        <InputGroup size='sm'>
                            <Input type='text' placeholder='Search bill by' />
                            <InputRightAddon children='Search' />
                        </InputGroup>
                    </div>

                </div>
                <Button onClick={onOpen} size='sm' colorScheme='blue'>Add New Bill</Button>
            </div>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Bill</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="fullName" isRequired>
                            <FormLabel>  Full Name</FormLabel>
                            <Input onChange={handleInput} name='fullName' size="lg" type="text" placeholder="Enter full name" />
                        </FormControl>

                        <FormControl id="email" isRequired>
                            <FormLabel>  Email</FormLabel>
                            <Input onChange={handleInput} name='email' size="lg" type="email" placeholder="Enter email address" />
                        </FormControl>

                        <FormControl id="phone" isRequired>
                            <FormLabel> Phone</FormLabel>
                            <Input onChange={handleInput} name='phone' size="lg" type="text" placeholder="Enter phone number" />
                        </FormControl>

                        <FormControl id="paidAmount" isRequired>
                            <FormLabel>  Paid Amount</FormLabel>
                            <Input onChange={handleInput} name='paidAmount' size="lg" type="number" placeholder="Enter paid amount" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => { handleBillAdding(); onClose() }} colorScheme='blue'> Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Table */}
            <table class="table table-bordered" style={{ "width": "95%", "margin": "0 auto" }}>
                <thead>
                    <tr>
                        <th scope="col">Billing ID</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Paid Amount</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        bills.map(b =>
                            <tr>
                                <td>{b._id}</td>
                                <td>{b.fullName}</td>
                                <td>{b.email}</td>
                                <td>{b.phone}</td>
                                <td>${b.paidAmount}</td>
                                <td>
                                    <span className="editBtn">Edit</span> | <span className="deleteBtn">Delete</span>
                                </td>
                            </tr>
                        )
                    }


                </tbody>
            </table>


        </div >
    )
};
export default TableLayout;