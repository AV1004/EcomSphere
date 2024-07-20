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

// Get delete token from backend
export const getDeleteTokenForCloud = async (public_id, authHeader) => {
  const tokenRes = await fetch(
    `${server}/shop/generate-delete-token?public_id=${public_id}`,
    {
      headers: {
        Authorization: authHeader,
      },
    }
  );
  const tokenData = await tokenRes.json();

  return tokenData;
};

// Delete image from CLOUDINARY
export const deleteImageFromCloud = async (api, data) => {
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

// Get User Products
export const getuserProducts = async (authHeader) => {
  const res = await fetch(server + "/shop/userProds", {
    method: "GET",
    headers: {
      Authorization: authHeader,
    },
  });

  const resData = res.json();

  return resData;
};

// Updated Product
export const updatedUserProd = async (
  prodId,
  prodName,
  price,
  description,
  category,
  imageUrl,
  authHeader
) => {
  const res = await fetch(server + "/shop/editProd", {
    method: "PUT",
    headers: {
      Authorization: authHeader,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      prodId: prodId,
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
