# ClinicApp - React Native CLI

Full-stack clinic management app with a React Native client and a small Node.js
API for authentication, patients, and appointments.

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

### Run the API

The API uses the JSON file at `server/data.json` as a local development
database, so no database service is required to get started:

```bash
npm run api
```

It listens on `http://localhost:4000`. The mobile app uses `localhost` on iOS
and `10.0.2.2` on the Android emulator. For a physical device, update
`API_BASE_URL` in `src/utils/api.ts` to the computer's LAN IP address.

Available endpoints:

- `GET /health`
- `POST /api/auth/login`
- `GET /api/patients?q=...`
- `POST /api/patients`
- `GET /api/appointments`
- `POST /api/appointments`

The demo account is `demo@clinicapp.com` / `Clinic@123`. Replace the local
JSON store with a real database and hash passwords before production use.

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
