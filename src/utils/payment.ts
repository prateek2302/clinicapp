
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

type UPIApp = 'gpay' | 'phonepe' | 'paytm';

const UPI_APP_DETAILS: Record<
  UPIApp,
  { scheme: string; packageName: string; label: string }
> = {
  gpay: {
    scheme: 'gpay',
    packageName: 'com.google.android.apps.nbu.paisa.user',
    label: 'Google Pay',
  },
  phonepe: {
    scheme: 'phonepe',
    packageName: 'com.phonepe.app',
    label: 'PhonePe',
  },
  paytm: {
    scheme: 'paytmmp',
    packageName: 'net.one97.paytm',
    label: 'Paytm',
  },
};

export const payWithUPIApp = async (
  app: UPIApp,
  amount: number,
  upiId: string = 'clinic@upi',
  name: string = 'ClinicApp',
) => {
  const details = UPI_APP_DETAILS[app];
  const query = `pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    name,
  )}&am=${amount}&cu=INR&tn=Clinic%20Bill%20Payment`;
  const appUrl = `${details.scheme}://upi/pay?${query}`;

  try {
    if (await Linking.canOpenURL(appUrl)) {
      await Linking.openURL(appUrl);
      return;
    }

    Alert.alert(
      `${details.label} is not installed`,
      `Install ${details.label} to continue with this payment.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Install',
          onPress: () =>
            Linking.openURL(
              `https://play.google.com/store/apps/details?id=${details.packageName}`,
            ).catch(() =>
              Alert.alert('Unable to open store', 'Please install the app manually.'),
            ),
        },
      ],
    );
  } catch {
    Alert.alert('Payment app unavailable', `Unable to open ${details.label}.`);
  }
};

export const generateUPIQRData = (amount:number, upiId:string='clinic@upi') => {
  return `upi://pay?pa=${upiId}&pn=ClinicApp&am=${amount}&cu=INR`;
};
