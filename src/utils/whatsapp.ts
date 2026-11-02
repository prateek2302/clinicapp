
import { Linking, Alert } from 'react-native';
import RNFS from 'react-native-fs';

export const sendWhatsAppMessage = (phone:string, message:string) => {
  const clean = phone.replace(/[^0-9]/g,'');
  const finalPhone = clean.length===10 ? `91${clean}` : clean;
  const url = `whatsapp://send?phone=${finalPhone}&text=${encodeURIComponent(message)}`;
  Linking.canOpenURL(url).then(supported=>{
    if(supported) Linking.openURL(url);
    else Alert.alert('WhatsApp not installed','Please install WhatsApp');
  });
};

export const sendPrescriptionOnWhatsApp = async (phone:string, patientName:string, pdfPath:string, diagnosis:string) => {
  try {
    // Copy PDF to cache for sharing if needed
    const message = `🏥 *ClinicApp - Prescription*\n\nHi ${patientName},\nYour prescription is ready.\n\n*Diagnosis:* ${diagnosis}\n*Date:* ${new Date().toLocaleDateString()}\n*Clinic:* Jaipur Clinic, +91 98765 43210\n\nPlease follow the advice and visit if needed.\nGet well soon! 🙏`;
    
    // Try direct whatsapp with file - on Android we can share file
    // For now, open WhatsApp with message, user can attach PDF manually or via share
    sendWhatsAppMessage(phone, message);
    return true;
  } catch(e){ 
    console.log(e);
    return false;
  }
};

export const sendBillOnWhatsApp = (phone:string, invoiceId:string, amount:number) => {
  const msg = `🏥 *ClinicApp - Bill*\n\nHi,\nYour bill ${invoiceId} of *₹${amount}* is pending.\n\nPlease pay via UPI: clinic@upi or click to pay.\nThank you!`;
  sendWhatsAppMessage(phone, msg);
};
