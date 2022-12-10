import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useNavigation } from "react-day-picker";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_LOCAL);

const Payment = () => {
  const booking = useLoaderData();
  const navigation = useNavigation();
  // const navigation = useNavigation();

  const { treatment, price, appointmentDate, slot } = booking;

  if(navigation.state === 'loading'){
    return <div className="flex justify-center my-96">
    <button className="btn btn-square loading"></button>
  </div>
  }
  return (
    <div>
      <h3 className="text-3xl">Payment for {treatment}</h3>
      <p className="text-3xl">
        Please payment <strong>${price}</strong> for your appointment on{" "}
        {appointmentDate} at {slot}
      </p>
      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckoutForm 
                booking={booking}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
