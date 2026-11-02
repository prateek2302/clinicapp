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
