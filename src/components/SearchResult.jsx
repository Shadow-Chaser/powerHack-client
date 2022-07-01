import { useContext, useEffect, useState } from "react";
import { BillContext } from "../App";

const SearchResult = ({ searchText }) => {
    console.log(searchText);

    const [bills, setBills] = useContext(BillContext)
    const [filteredBills, setFilteredBills] = useState(null);
    console.log(filteredBills);

    useEffect(() => {
        if (searchText) {

            const newData = bills.filter(
                function (item) {
                    const itemData = item.fullName
                        ? item.fullName.toUpperCase()
                        : ''.toUpperCase();
                    const textData = searchText.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setFilteredBills(newData);
        }
        else {
            setFilteredBills(null)
        }
    }, [searchText]);


    return (
        <div className="mb-5">
            {
                filteredBills &&
                <>
                    <h1>Search Result: </h1>
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
                                filteredBills?.map(b =>
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
                </>

            }

        </div>
    )
};
export default SearchResult;