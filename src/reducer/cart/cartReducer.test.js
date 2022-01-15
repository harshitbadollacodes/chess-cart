import { cartReducer } from "./cartReducer";

describe("testing cart", () => {
    it("should add items to cart", () => {
        
        const initialState = {
            cart: []
        };

        const payload1 = {
            _id: "1234",
            name: "Chess Board",
            price: 500,
        };

        const action = {
            type: "ADD_TO_CART",
            payload: payload1
        };

        let state = cartReducer(initialState, action);

        expect(state).toEqual({
            cart: [
                {
                    quantity: 1,
                    _id: "1234",
                    name: "Chess Board",
                    price: 500,
                }
            ]
        })

    })
})