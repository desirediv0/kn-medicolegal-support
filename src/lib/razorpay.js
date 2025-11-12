import Razorpay from "razorpay";

const { NEXT_PUBLIC_RAZORPAY_KEY_ID, NEXT_PUBLIC_RAZORPAY_KEY_SECRET } = process.env;

let razorpayInstance;

export function getRazorpayInstance() {
  if (!NEXT_PUBLIC_RAZORPAY_KEY_ID || !NEXT_PUBLIC_RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay keys are not configured");
  }

  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
    });
  }

  return razorpayInstance;
}
