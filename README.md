## RIDE-X :  RIDE MANAGEMENT APP

##### Live Frontend Link : 

##### Live Backend Link : 

##### Backend Repository Link : 




### Project overview

**RIDE-X** is a full-stack ride booking platform built for Riders, Drivers, and Admins, offering a seamless and secure experience similar to Uber or Pathao. Riders can request rides, track them in real-time, view ride history, and receive PDF invoices via email, ask any query in real time, can see details ride summary report with expenses, can send SOS while driving with real time location. Drivers can manage availability, accept or reject ride requests, update ride statuses, and monitor earnings dashboards, while Admins have full oversight of users and rides, including analytics and user management, driver management, query management. The platform integrates secure payments via SSLCommerz, email notifications via Nodemailer, PDF invoice generation with PDFKit, and real-time updates in map. It is built with a modern tech stack including React, shadcn ui, Redux Toolkit, RTK Query, Tailwind CSS, Node.js, Express, MongoDB, Mongoose, JWT authentication, and Cloudinary for file storage, ensuring a responsive, role-based ui and realtime location tracking and visually showing.

##### Special Notes
- Don't Forget to turn on map in your device as realtime location is used
- Don't forget to allow third party cookie in your browser the token is stored in cookie
- If You are willing to register as driver wait for approval and if approved logout and then login again to grab the features ofr driver

#### Logical cores

- Driver only can see rider within 1 km radius of his current location
- Riders can see only the Drivers who are within 1km radius of the Rider
- Base Fare is taken 100 tk per km
- 80% of the fare money will taken by rider and 10% money will be added to admin account

#### Credentials 

##### Admin login 
- *Admin Email* : admin@gmail.com
- *Admin password* : Admin123@

##### Driver login 
- *Driver Email* : driver@gmail.com
- *Driver password* : Driver123@

##### Rider login 
- *Rider Email* : rider@gmail.com
- *Rider password* : Rider123@


### Technology Stack

#### Frontend

- **Framework & Language**: React, TypeScript
- **State Management**: Redux Toolkit, RTK Query
- **Routing**: React Router
- **Styling & UI**: Tailwind CSS, Radix UI, ShadCN/UI, clsx, tailwind-merge
- **Maps & Geolocation**: React-Leaflet, Leaflet, Leaflet Routing Machine
- **Forms & Validation**: React Hook Form, Zod, @hookform/resolvers
- **Charts & Data Visualization**: Recharts, react-countup
- **Animations & UX Enhancements**: React Fast Marquee, Sonner, tw-animate-css
- **Other Utilities**: Axios, date-fns, Lucide React icons

#### Backend

- **Framework & Runtime**: Node.js, Express
- **Database & ORM**: MongoDB, Mongoose
- **Authentication & Security**: JWT, bcryptjs, passport, passport-local, passport-google-oauth20
- **File & Media Storage**: Cloudinary via multer-storage-cloudinary
- **PDF Generation**: PDFKit
- **Email & Notifications**: Nodemailer
- **Payment Integration**: SSLCommerz API
- **Validation & Utilities**: Zod, axios, http-status-codes, haversine-distance, dotenv, cookie-parser, cors

#### Dev Tools & Build

- **Module Bundler & Compiler**: Vite, TypeScript
- **Linting & Code Quality**: ESLint, @eslint/js, eslint-plugin-react-hooks
- **Development Utilities**: ts-node-dev, Node.js types, TypeScript ESLint
- **Testing & Debugging**: Built-in Node.js debugging, console logging

#### Deployment & Hosting

- **Frontend**: Vercel
- **Backend**: Vercel
- **Database**: MongoDB Atlas
- **Storage**: Cloudinary

### Project Features

#### **1. Public Pages**

- Responsive and accessible homepage with hero section, how-it-works overview, service highlights, call-to-action, reviews(coming-from ride review) sections.
- About Us page showcasing company background, mission, and team profiles.
- Features page highlighting Rider and Driver Features
- Contact page with validated form for inquiries.
- FAQ page with searchable list of common questions.

#### **2. Authentication**

- JWT-based login and registration with role selection (`Rider`, `Driver`, `Admin`).
- Registration form with role-specific fields for Riders and Drivers.
- Role-based landing pages upon login (nav links will change dashboard will change and ui contents will be changed).
- suspended drivers redirected to a dedicated contact page.
- Blocked User can not login to his account
- Logout functionality.

#### **3. Rider Features**

- Rider Can request a ride by selecting in map. fare and location will be shown.
- Rider can cancel rides if the ride has not started yet. A rider can cancel maximum 3 rides in a day.
- Rider can see the available drivers around him within 1km radius.
- Rider can see real time location of driver and current location and ride status.
- Live Ride Tracking with real-time map updates.
- While Ride ahs started A SOS button will appear and clicking this will send the current location and a message to home for help.
- Rider can request to be a driver.
- Rider can see his analytics page (generated ride reports and all detailed history so far can observe daily monthly and weekly stats in graph)
- Rider can observe his ride history from here he can see invoice pdf can see detailed page of specific ride history. (paginate search sort, filter allowed)
- Rider can manage his profile (name, password, photo, phone)
- If Rider willing to pay online he can pay from his device utilizing SSLComerz after successful completion of payment a invoice pdf will be sent to email.
- If a rider is willing to pay offline he have to give money to driver and driver will mark the ride completed this will generate a pdf and send to rider email.
- 80% of the fare money will taken by rider and 10% money will be added to admin account
- User can give rider rating and feedback to the rider after ride completion.

#### **4. Driver Features**

- Driver can go online and offline (if online he can see the rides around him)
- Can accept or reject ride offers(If rejected it will not show to him).
- Can manage ride status(pickup, start ride, mark as arrived, or complete) that will update realtime location
- If a rider is willing to pay offline he have to give money to driver and driver will mark the ride completed this will generate a pdf and send to rider email
- 80% of the fare money will taken by rider and 10% money will be added to admin account
- Driver can update his profile (change driving license, vehicle number vehicle type, name, password phone)
- Driver can see detailed report of the profile (daily monthly, weekly income stats)
- Driver can observe ride history from here he can see invoice pdf can see detailed page of specific ride history. (paginate search sort, filter allowed)

#### **5. Admin Features**

- Admin can manage his own profile
- Admin can manage users (block/unblock) - paginate, search sort filter is allowed in this page as well
- Admin can manage Drivers (Suspend/approve) - paginate, search sort filter is allowed in this page as well
- Admin can manage the asked question reply(will email to the user with the asked question and the answer and this will be added in faq pages) - paginate, search sort filter is allowed in this page as well
- Admin can see all users ride history search sort filter paginate and all can be done her, can see invoice, can see the detailed page of the ride.
- Can see detailed report over income all transactions and curves of all detailed incomes and expenses.

