import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import { useParams } from "react-router-dom";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const data = orders && orders.find((item) => item._id === id);
  console.log("data track order", data);

  return (
    <div>
      <>
        {data && data.status === "Processing" ? (
          <div className="w-full h-[80vh] flex justify-center items-center">
            <h1 className="text-[20px]">Your Order is processing in shop</h1>
          </div>
        ) : data.status === "Transferred to delivery partner" ? (
          <h1 className="text-[20px]">
            Your Order is on the way for delivery partner
          </h1>
        ) : data.status === "Shipping" ? (
          <h1 className="text-[20px]">
            Your Order is coming with our delivery partner!
          </h1>
        ) : data.status === "Received" ? (
          <h1 className="text-[20px]">
            Your Order is in your city. Our Delivery man will deliver it.
          </h1>
        ) : data.status === "On the way" ? (
          <h1 className="text-[20px]">
            Our Delivery man going to deliver your order.
          </h1>
        ) : data.status === "Delivered" ? (
          <h1 className="text-[20px]">Your order is delivered!</h1>
        ) : data.status === "Processing refund" ? (
          <h1 className="text-[20px]">Your refund is processing!</h1>
        ) : data.status === "Refund success" ? (
          <h1 className="text-[20px]">Your Refund is success</h1>
        ) : null}
      </>
    </div>
  );
};

export default TrackOrder;
