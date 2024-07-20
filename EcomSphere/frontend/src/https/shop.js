import { server } from "./auth";

// Upload file on CLOUDINARY
export const uploadImageOnClound = async (api, data) => {
  const res = await fetch(api, {
    method: "POST",
    body: data,
  });

  const resData = await res.json();

  return resData;
};

// Add Product
export const addProduct = async (
  prodName,
  price,
  description,
  category,
  imageUrl,
  authHeader
) => {
  const res = await fetch(server + "/shop/addProd", {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      prodName: prodName,
      price: price,
      description: description,
      category: category,
      imageUrl: imageUrl,
    }),
  });

  const resData = res.json();

  return resData;
};
