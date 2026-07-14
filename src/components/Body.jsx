import "./Body.css";
import { useEffect, useState } from "react";
import { getFoodItems } from "../services/foodItemsService.js";
import { toast } from "react-toastify";
import {addToCart} from "../services/foodItemsService.js"

const Body = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [quantities, setQuantities] = useState({}); // { [foodId]: number }

  const [page, setPage] = useState(0);
  const size = 8;

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await getFoodItems(page, size);
        if (response.data.success) {
          // setFoodItems(response.data.data); wrong
          setFoodItems(response.data.data.content);

          // Initialize quantity = 1 for every food item on this page
          const initialQuantities = {};
          response.data.data.content.forEach((food) => {
            initialQuantities[food.foodId] = 1;
          });
          setQuantities(initialQuantities);
        }
      } catch (error) {
         console.log(error.message);
         toast.error(error.response?.data?.message );      }
    };

    fetchFoodItems();
  }, [page]);

  // Quantity stepper handlers — pure UI state, no API calls
 const handleIncrement = (foodId) => {
  setQuantities((prev) => ({
    ...prev,
    [foodId]: (prev[foodId] || 1) + 1,
  }));
};

 const handleDecrement = (foodId) => {
  setQuantities((prev) => {
    const currentQuantity = prev[foodId] || 1;

    return {
      ...prev,
      [foodId]: currentQuantity > 1 ? currentQuantity - 1 : 1,
    };
  });
};

  // TODO: Add to Cart — call cart service with { foodId, quantity }
 const handleAddToCart = async (food) => {

    try {

        const cartData = {
            foodName: food.foodName,
            foodPrice : food.foodPrice,
            foodId : food.foodId,
            quantity: quantities[food.foodId],  
            imageUrl  : food.imageUrl
        };
        const response = await addToCart(cartData);

        if (response.data.success) {
            toast.success("Item added to cart");
        }

    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to add item");
    }

};

  // TODO: Order Now — likely Add to Cart + redirect to checkout/orders
  const handleOrderNow = () => {
    alert("Order Button is under developement!");
  };

  return (
    <div className="body-container">
      <h1 className="text-center my-4">Welcome to Our Delicious F❤️❤️ds</h1>

      {/* Food Items Grid — 4 per row on desktop, responsive down to 1 on mobile */}
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {foodItems.map((food) => (
            <div key={food.foodId} className="col">
              <div className="food-card card h-100 shadow-sm">
                <img
                  src={food.imageUrl}
                  alt={food.name}
                  className="food-card-img card-img-top"
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{food.foodName}</h5>
                  <p className="card-text text-secondary small food-description">
                    {food.description}
                  </p>
                  <p className="fw-bold food-price mb-3">
                    ₹{food.foodPrice}
                  </p>

                  {/* Quantity Stepper */}
                  <div className="d-flex align-items-center justify-content-center mb-3 quantity-stepper">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleDecrement(food.foodId)}
                    >
                      −
                    </button>
                    <span className="mx-3 fw-semibold">
                      {quantities[food.foodId] || 1}
                    </span>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleIncrement(food.foodId)}
                    >
                      +
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto d-flex flex-column gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleAddToCart(food)}
                    >
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => handleOrderNow(food)}
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          {" "}
          Back{" "}
        </button>
        <span> Page {page + 1} </span>
        <button onClick={() => setPage(page + 1)}> Next </button>
      </div>
    </div>
  );
};

export default Body;
