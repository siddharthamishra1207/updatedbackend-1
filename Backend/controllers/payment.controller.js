import Razorpay from 'razorpay'
// import orders from 'razorpay/dist/types/orders';
import { MongoClient } from 'mongodb';
export const orderCreate = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: 'rzp_test_IG7UyFkck9IH0W',
            key_secret: '0tEWj4yJ7GVesX9suwtwmw4k'
        })

        const { orderId, amount, payment_capture, currency} = req.body;
        const options = {
            amount: parseInt(amount * 100),
            currency: currency,
            receipt: orderId,
            payment_capture: payment_capture
        }
        const order = await instance.orders.create(options);
        if (!order) res.staus(500).send('wrong')
        res.status(200).json({ success: true, data: order })

    } catch (err) {
        console.log(err)
    }
}