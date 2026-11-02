
import RazorpayCheckout from 'react-native-razorpay';
import { Alert, Linking } from 'react-native';

// Replace with your Razorpay Key ID
const RAZORPAY_KEY = 'rzp_test_1DP5mmOlF5G5ag';

export const payWithRazorpay = async (amount:number, patientName:string, description:string) => {
  const options = {
    description,
    image: 'https://your-clinic-logo.png',
    currency: 'INR',
    key: RAZORPAY_KEY,
    amount: amount * 100, // paise
    name: 'ClinicApp',
    prefill: { email: 'patient@example.com', contact: '9876543210', name: patientName },
    theme: { color: '#2563EB' }
  };
  try {
    const data = await RazorpayCheckout.open(options);
    return { success:true, paymentId: data.razorpay_payment_id };
  } catch (e:any) {
    return { success:false, error: e.description || 'Payment failed' };
  }
};

export const payWithUPI = (amount:number, upiId:string='clinic@upi', name:string='ClinicApp') => {
  // UPI Intent - works with GPay, PhonePe, Paytm
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=Clinic%20Bill%20Payment`;
  Linking.openURL(upiUrl).catch(()=> Alert.alert('UPI app not found','Please install GPay / PhonePe / Paytm'));
};

export const generateUPIQRData = (amount:number, upiId:string='clinic@upi') => {
  return `upi://pay?pa=${upiId}&pn=ClinicApp&am=${amount}&cu=INR`;
};
