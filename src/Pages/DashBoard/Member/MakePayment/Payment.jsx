import Divider from "../../../../Component/Shared/Divider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import bgImg from "../../../../assets/HomeBanner/pro.jpg";
import { useParams } from "react-router-dom";
import useBookedRoom from "../../../../Hooks/useBookedRoom/useBookedRoom";

// ✅ Use publishable key (NOT secret key)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = () => {
  const { id } = useParams();
  const [bookedRoom] = useBookedRoom();
  const forPayment = bookedRoom?.find((item) => item?._id === id);

  return (
    <div
     
      className="bg-cover  bg-gradient-to-br from-blue-900 to-purple-800  w-full min-h-screen"
    >
      <div className="bg-cover w-full min-h-screen bg-[#21212180]">
        <div className="pt-20 text-white">
          <Divider header={"Payment For Your Room"} />
        </div>

        <div className="mx-3">
          <div className="max-w-lg mx-auto   bg-white rounded-xl shadow-lg ">
          <Elements stripe={stripePromise}>
            <CheckoutForm payment={forPayment} />
          </Elements>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
