import { format } from "date-fns";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider";

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
  const { name: treatmentName, slots,price } = treatment;
  const {user} = useContext(AuthContext);
  const date = format(selectedDate, 'PP');

  const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const booking = {
            appointmentDate: date,
            treatment: treatmentName,
            patient: name,
            slot,
            name,
            email,
            phone,
            price,
        }
        console.log(booking);
        fetch('https://doctors-portal-server-lemon.vercel.app/bookings', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if(data.acknowledged){
            setTreatment(null);
            toast.success("Booking confirmed");
            refetch();
          }
          else{
            toast.error(data.message)
          }
          
        })
        
  }

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{treatmentName}</h3>
          <form onSubmit={handleBooking} className="grid grid-cols-1 gap-3 mt-10">
            <input
              type="text"
              value={date}
              disabled
              className="input w-full input-bordered"
            />
            <select name="slot" className="select select-bordered w-full">
              {
                slots.map((slot, index) => <option key={index} value={slot}>{slot}</option>)
              }
            </select>
            <input
              type="name"
              name="name"
              defaultValue={user?.displayName}
              readOnly
              placeholder="Your Name"
              className="input w-full input-bordered"
            />
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              readOnly
              placeholder="Email address"
              className="input w-full input-bordered"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="input w-full input-bordered"
            />
            <br />
            <input
              className="btn btn-accent w-full"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
