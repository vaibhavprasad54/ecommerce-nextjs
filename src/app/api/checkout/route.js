import { NextResponse, NextRequest } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


//=========== Filtering and fetching only "Active" products from stripe dashboard ==========
const getActiveProducts = async () => {
    const checkProducts = await stripe.products.list();
    const availableProducts = checkProducts?.data?.filter((item) => item.active == true);
    return availableProducts;
}

export const POST = async(request) => {
    const { products } = await request.json();
    const data = products;

    let activeProducts = await getActiveProducts();

    try {
        for(const product of data){
            const existingProduct = activeProducts?.find((stripeProduct) => stripeProduct?.name?.toLowerCase() == product?.title?.toLowerCase());
            if(existingProduct == undefined){
                const newProduct = await stripe.products.create({
                    name: product.title,
                    default_price_data: {
                        unit_amount: product.price * 100,        // Converting dollar to cent
                        currency: "usd"      
                    },
                });
                // activeProducts.push(newProduct);
            }
        }


    } catch (error) {
        console.log("Error occured:", error);
    }

    activeProducts = await getActiveProducts();
    let stripeItems = [];
    

    for(const product of data){ 
        const stripeProduct = activeProducts?.find((prod) => prod?.name?.toLowerCase() == product?.title?.toLowerCase());
        if(stripeProduct){
            stripeItems.push({
                price: stripeProduct?.default_price,
                quantity: 1,
            })
        }
    console.log("Stripe Items:", stripeProduct);
    }


    const session = await stripe.checkout.sessions.create({
        line_items: stripeItems,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    })

    return NextResponse.json({ url: session?.url });
}