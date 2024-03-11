// import { useEffect } from "react";
// import Razorpay from "razorpay";

const Payment = () => {
  //   useEffect(() => {
  //     const options = {
  //       key: "YOUR_RAZORPAY_API_KEY",
  //       amount: 10000, // Amount in paise (100 paise = 1 INR)
  //       currency: "INR",
  //       name: "Your Charity Name",
  //       description: "Donation for a Cause",
  //       image: "your_logo_url",
  //       order_id: "order_id_from_backend",
  //       handler: function (response) {
  //         // Handle successful payment response
  //         console.log(response);
  //       },
  //       prefill: {
  //         name: "Donor Name",
  //         email: "donor@example.com",
  //         contact: "1234567890",
  //       },
  //       notes: {
  //         donation_id: "your_donation_id",
  //       },
  //       theme: {
  //         color: "#3399cc",
  //       },
  //     };

  //     const rzp = new Razorpay(options);
  //     rzp.open();
  //   }, []);

  return (
    <div>
      <h2>Processing Payment...</h2>
    </div>
  );
};

export default Payment;
