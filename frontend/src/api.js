const API_URL = "http://localhost:8000"; // Định nghĩa URL chung

export const fetchProducts = async () => {
  return fetchData(`${API_URL}/phone`);
};

export const fetchProductById = async (id) => {
  return fetchData(`${API_URL}/phone/${id}`);
};

export const fetchCartCount = async () => {
  return fetchData(`${API_URL}/cart-count`);
};

export const fetchCart = async () => {
  return fetchData(`${API_URL}/cart/`);
};

export const addToCart = async (cartId, phoneId) => {
  return fetchWithMethod(`${API_URL}/card/${cartId}/add`, "PUT", { phoneId });
};

export const removeFromCart = async (cartId, phoneId) => {
  return fetchWithMethod(`${API_URL}/card/${cartId}/remove`, "DELETE", { phoneId });
};

// Hàm dùng chung để fetch API và xử lý lỗi JSON
const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    console.log(`Fetching from: ${url}, Status: ${res.status}`);

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} - ${res.statusText}`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Invalid JSON response from ${url}`);
    }

    const data = await res.json();
    console.log(`Fetched Data from ${url}:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    return null;
  }
};

// Hàm dùng chung để fetch với phương thức khác (PUT, DELETE)
const fetchWithMethod = async (url, method, body = {}) => {
  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log(`Request to ${url} | Method: ${method} | Status: ${res.status}`);

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    console.log(`Response from ${url}:`, data);
    return data;
  } catch (error) {
    console.error(`Error in ${method} request to ${url}:`, error);
    return null;
  }
};
