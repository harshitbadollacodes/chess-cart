import axios from "axios";
import { API } from "../config/constants";

export async function getProductsData() {
    try {
        const { data: { products } } = await axios.get(`${API}/products`);
            return products;
    } catch(error) {
        console.error(error);
    }
};

export async function updateCart(productId) {
    try {
        const { status } = await axios.post(`${API}/cart`, {
            productId,
            quantity: 1
        });
        
        return status;

    } catch (error) {
        console.log(error);
    }
}

export async function updateWishlist(productId) {
    try {
        const { status } = await axios.post(`${API}/wishlist`, {
            productId
        });

        return status;
        
    } catch (error) {
        console.log(error);
    }
};

export async function removeItemFromWishlist(productId) {
    try {
        const { status } = await axios.delete(`${API}/wishlist/${productId}`);

        return status;

    } catch (error) {
        console.log({error});
    }
}

export async function updateQuantity(itemId, quantity) {
    try {
        const { status } = await axios.post(`${API}/cart/${itemId}`, {
            updateQuantity: quantity
        });

        return status;
    }catch(error) {
        console.log({error});
    }
}

export async function removeItemFromCart(itemId) {
    try {
        console.log(itemId);
        const { status } = await axios.delete(`${API}/cart/${itemId}`)

        return status;

    } catch (error) {
        console.log({error});
    }
}

