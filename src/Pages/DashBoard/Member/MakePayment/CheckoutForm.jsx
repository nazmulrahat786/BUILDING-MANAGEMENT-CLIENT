import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import useAxiosSecure from "../../../../Hooks/AxiosSecure/useAxiosSecure";
import useCupon from "../../../../Hooks/useCupon/useCupon";

// ✅ Load Stripe outside render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ payment }) => {
  const axiosSecure = useAxiosSecure();
  const [cupon] = useCupon();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const amount = payment?.rent || 0;
  const [totalPay, setTotalPay] = useState(amount);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [monthValue, setMonthValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCoupon = (e) => {
    e.preventDefault();
    const applyCoupon = e.target.coupon.value.trim();
    const findCoupon = cupon.find((item) => item.cuponCode === applyCoupon);

    if (findCoupon) {
      const discount = parseInt(findCoupon?.discount);
      const newPrice = amount - (discount * amount) / 100;
      setTotalPay(newPrice);
      Swal.fire("Success", "Coupon applied successfully!", "success");
    } else {
      Swal.fire("Invalid", "Enter a valid coupon", "warning");
    }
    e.target.reset();
  };

  useEffect(() => {
    if (totalPay > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPay })
        .then((res) => setClientSecret(res?.data?.clientSecret))
        .catch((err) => console.error("Payment intent error:", err));
    }
  }, [axiosSecure, totalPay]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    if (!monthValue) {
      Swal.fire("Missing Month", "Please select the month of payment.", "warning");
      return;
    }

    setLoading(true);
    const card = elements.getElement(CardElement);
    if (!card) {
      setLoading(false);
      return;
    }

    const { error: pmError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (pmError) {
      setError(pmError.message);
      setLoading(false);
      return;
    } else setError("");

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: payment?.userName || "Anonymous",
          email: payment?.userEmail || "unknown",
        },
      },
    });

    if (confirmError) {
      Swal.fire("Payment Failed", confirmError.message, "error");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      setPaymentId(paymentIntent.id);
      const paymentInfo = {
        userName: payment?.userName,
        userEmail: payment?.userEmail,
        requestId: payment?.requestId,
        floorNo: payment?.floorNo,
        blockName: payment?.blockName,
        apartmentNo: payment?.apartmentNo,
        RoomNo: payment?.RoomNo,
        amount: paymentIntent.amount / 100,
        month: monthValue,
        date: new Date().toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }),
      };

      try {
        const res = await axiosSecure.post("/paymentHistory", paymentInfo);
        if (res?.data?.insertedId) {
          Swal.fire("Success", "Thank you for your payment!", "success");
          navigate("/dashboard/paymentHistory");
        }
      } catch (err) {
        console.error("Error saving payment:", err);
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center   bg-gradient-to-br from-indigo-900 via-purple-900 to-black ">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Amount */}
        <h1 className="text-xl sm:text-2xl font-bold text-white text-center mb-6">
          Your Payment Amount:{" "}
          <span className="bg-indigo-700 text-white rounded-lg py-1 px-3">
            ${totalPay}
          </span>
        </h1>

        {/* Coupon */}
        <form onSubmit={handleCoupon} className="flex flex-col sm:flex-row items-center justify-center mb-6 gap-2">
          <input
            type="text"
            name="coupon"
            className="flex-1 p-3 rounded-lg text-black w-full sm:w-auto"
            placeholder="Enter Coupon Code"
          />
          <button
            type="submit"
            className="py-3 px-5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition w-full sm:w-auto"
          >
            Apply
          </button>
        </form>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white mb-2 text-sm font-medium">Payment Month</label>
            <select
              className="w-full p-3 rounded-lg border border-gray-300 text-black"
              onChange={(e) => setMonthValue(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Select Month</option>
              {[
                "January","February","March","April","May","June",
                "July","August","September","October","November","December"
              ].map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white mb-2 text-sm font-medium">Card Details</label>
            <div className="p-3 rounded-lg border border-gray-300 bg-white">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#1a202c",
                      "::placeholder": { color: "#a0aec0" },
                    },
                    invalid: { color: "#e53e3e" },
                  },
                }}
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={!stripe || !clientSecret || loading}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>

          {paymentId && (
            <p className="text-green-400 text-center font-medium mt-4">
              ✅ Payment successful. Transaction ID: <span className="font-mono">{paymentId}</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

CheckoutForm.propTypes = {
  payment: PropTypes.shape({
    userName: PropTypes.string,
    userEmail: PropTypes.string,
    requestId: PropTypes.string,
    floorNo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    blockName: PropTypes.string,
    apartmentNo: PropTypes.string,
    RoomNo: PropTypes.string,
    rent: PropTypes.number,
  }),
};

const PaymentPage = ({ payment }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm payment={payment} />
  </Elements>
);

PaymentPage.propTypes = {
  payment: PropTypes.shape({
    userName: PropTypes.string,
    userEmail: PropTypes.string,
    requestId: PropTypes.string,
    floorNo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    blockName: PropTypes.string,
    apartmentNo: PropTypes.string,
    RoomNo: PropTypes.string,
    rent: PropTypes.number,
  }),
};

export default PaymentPage;
