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

  const resData = await res.json();

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

  const resData = await res.json();

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

  const resData = await res.json();

  return resData;
};

// Delete Product
export const deleteProduct = async (prodId, authHeader) => {
  const res = await fetch(server + "/shop/deleteProd/" + prodId, {
    method: "DELETE",
    headers: {
      Authorization: authHeader,
    },
  });

  const resData = await res.json();

  return resData;
};

// Get All Products
export const getAllProducts = async (authHeader) => {
  const res = await fetch(server + "/shop/getProds", {
    headers: {
      Authorization: authHeader,
    },
  });

  const resData = await res.json();

  return resData;
};

// Add Product to cart
export const addProductToCart = async (prodId, authHeader) => {
  const res = await fetch(server + "/shop/addToCart", {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ prodId: prodId }),
  });

  const resData = await res.json();

  return resData;
};

// Get Cart Items
export const getCartItems = async (authHeader) => {
  const res = await fetch(server + "/shop/getCartItems", {
    headers: {
      Authorization: authHeader,
    },
  });

  const resData = await res.json();

  return resData;
};

// Decrease Product quantity from cart
export const decreaseFromCart = async (prodId, authHeader) => {
  const res = await fetch(server + "/shop/decreaseQtyOfProd", {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ prodId: prodId }),
  });

  const resData = await res.json();

  return resData;
};

// Remove Product quantity from cart
export const reomveProdFromCart = async (prodId, authHeader) => {
  const res = await fetch(server + "/shop/removeProdFromTheCart", {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ prodId: prodId }),
  });

  const resData = await res.json();

  return resData;
};

// Fetch User for profile
export const fetchUser = async (authHeader) => {
  const res = await fetch(server + "/shop/fetchUserDetails", {
    headers: {
      Authorization: authHeader,
    },
  });

  const resData = await res.json();

  return resData;
};

// Add?Change Mobile of user
export const updateMobileAndName = async (mobile, name, authHeader) => {
  const res = await fetch(server + "/shop/updateUserMobileAndName", {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ mobile: mobile, name: name }),
  });

  const resData = await res.json();

  return resData;
};

// Add/Change Address
export const changeAddress = async (address, authHeader) => {
  const res = await fetch(server + "/shop/updateAddress", {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ address: address }),
  });

  const resData = await res.json();

  return resData;
};

// Clear Cart and add order
export const clearCartAndCreateOrder = async (authHeader) => {
  const res = await fetch(server + "/shop/clearCartAndMadeOrder", {
    headers: {
      Authorization: authHeader,
    },
  });

  const resData = await res.json();

  return resData;
};

// Fetch Orders
export const getUserOrders = async (authHeader) => {
  const res = await fetch(server + "/shop/getOrders", {
    headers: {
      Authorization: authHeader,
    },
  });

  const resData = await res.json();

  return resData;
};

// Get Invoice
// export const getInvoiveForOrder = async (orderId, authHeader) => {
//   const res = await fetch(server + "/shop/getInvoice/" + orderId, {
//     headers: {
//       Authorization: authHeader,
//     },
//   });

//   if (!res.ok) {
//     console.error("Failed to fetch invoice");
//     return;
//   }

//   const blob = await res.blob();
//   const url = window.URL.createObjectURL(blob);
//   window.open(url);
// };
