import { Link } from "react-router-dom";
import { useAddressContext } from "../../context/AddressContext"

export function OrderConfirmation() {

    const { addressState: {shippingAddress} } = useAddressContext();

    return (
        <div className="container">
            <h1>Thank you for placing the order :)</h1>
            <h3 className="my-1">Your order will be shipped to the below mentioned address - </h3>

            {shippingAddress && 
                <address className="flex-grow-1 cursor-pointer border radius-5 width-full m1 p1">
                    <h3>{shippingAddress.fullName}</h3>
                    <p>Door No. : {shippingAddress.flatNo}, </p>
                    <p>{shippingAddress.streetName},</p>
                    <p> {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode} </p>
                </address>
            }

            <Link 
                to="/products"
                className="btn btn-primary my-1"
            >
                Shop More
            </Link>
        </div>
    )
}