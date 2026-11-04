# ClinicApp - React Native CLI

Production-ready clinic management app scaffold.

## Features
- Auth (Login / Role: Doctor, Receptionist, Patient)
- Dashboard with stats
- Patients CRUD + search
- Appointments - calendar, status (upcoming, completed, cancelled)
- Doctors list & availability
- Billing / Invoices stub
- Offline-ready with MMKV store + Zustand
- Firebase Authentication, Firestore, Storage, and Cloud Messaging integration

## Stack
React Native 0.75.4 (CLI), React Navigation 6, Zustand, MMKV, Vector Icons, TypeScript

## Quick Start
```bash
npx react-native@latest init clinicapp --template react-native-template-typescript
# Replace src/ with this src/ folder
npm install
# For iOS
cd ios && pod install && cd ..

npm start
# In another terminal, run one platform:
npm run android
# or
npm run ios
```

## Folder Structure
/src
  /navigation
  /screens (Auth, Dashboard, Patients, Appointments, Doctors, Billing, Profile)
  /components
  /store (zustand)
  /theme
  /utils
  /types

Customize API base in /src/utils/api.ts

## Firebase setup

The Firebase service helpers live in `src/services/firebase.ts`. Add the native
configuration files from your Firebase project before running a native build:

1. Register Android package `com.clinicapp` and place the downloaded
   `google-services.json` at `android/app/google-services.json`.
2. Register the iOS bundle identifier and add `GoogleService-Info.plist` to the
   `ios/clinicapp` Xcode target.
3. Enable Email/Password Authentication, Cloud Firestore, Cloud Storage, and
   Cloud Messaging in the Firebase console.
4. Run `cd ios && pod install && cd ..`, then rebuild the app.

The app intentionally does not include Firebase credentials. Do not commit
service-account keys or other private credentials. Use the exported helpers for
authentication, document writes/listeners, file uploads, and notification token
registration.
