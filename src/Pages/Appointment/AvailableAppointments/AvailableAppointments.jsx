import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useState } from "react";
import BookingModal from "../../BookingModal/BookingModal";
import Loading from "../../Shared/Loading/Loading";
import AppointmentOption from "./AppointmentOption";

const AvailableAppointments = ({ selectedDate }) => {
  const [treatment, setTreatment] = useState(null);

  const date = format(selectedDate, 'PP');

  const {data: appointmentOptions = [], refetch, isLoading} = useQuery({
    queryKey: ['appointmentOptions', date],
    queryFn: async () => {
      const res = await fetch(`https://doctors-portal-server-lemon.vercel.app/appointmentOptions?date=${date}`);
      const data = await res.json();
      return data;
    }
  });

  if(isLoading){
    return <Loading></Loading>
  }

  return (
    <section className="mt-16">
      <p className="text-center font-bold text-secondary">
        Available Appointments on {format(selectedDate, "PP")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {
            appointmentOptions.map(option => <AppointmentOption
                key={option._id}
                appointmentOption={option}
                setTreatment={setTreatment}
            ></AppointmentOption>)
        }
      </div>
      {
        treatment &&
        <BookingModal
            setTreatment={setTreatment}
            selectedDate={selectedDate}
            treatment={treatment}
            refetch={refetch}
      ></BookingModal>
      }
    </section>
  );
};

export default AvailableAppointments;
