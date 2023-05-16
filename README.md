<img src="./readme/title1.svg"/>

<div align="center">

> Hello world! Here's a concise summary of the project that describes the project plain and simple, limited to the space available. **[PROJECT PHILOSOPHY](https://github.com/rasha-massoud/PillPall#project-philosophy) • [PROTOTYPE](https://github.com/rasha-massoud/PillPall#prototyping) • [IMPLEMENTATION](https://github.com/rasha-massoud/PillPall#implementation) • [TECH STACK](https://github.com/rasha-massoud/PillPall#stacks) • [HOW TO RUN?](https://github.com/rasha-massoud/PillPall#installation)**

</div>

<br><br>

<!-- project philosophy -->
<img src="./readme/title2.svg" id="project-philosophy"/>

> Empowering patients, connecting doctors, and revolutionizing healthcare management.
>
> A mobile application providing patients the ease to manage their meds, track budgets, and access a personal assistant for guidance. Besides, patients can conveniently add their medical laboratory results, and connect with approved doctors to strengthen the patient-doctor relationship, all while ensuring privacy and convenience.

### Patient Stories
- As a patient, I want to have a detailed medical report, so that I can easily share my medical information with healthcare providers to avoid the repetitive task of recounting my medical history.
- As a patient, I want to search for and connect with doctors, so that I allow them to access my medications and report.
- As a patient, I want to have an AI personal medical assistant, so that I can receive reliable guidance, support, and information about my health and medications.
- As a patient, I want to be reminded for my prescription intake through a buzzer, so that I can maintain a consistent and effective treatment regimen.

### Doctor Stories
- As a doctor, I want to have the ability to create and update a profile, so that I can showcase my professional expertise, qualifications, and experience.
- As a doctor, I want to have access to my patients’ medical report and medication online, so that I can follow my patients’ health easily, quickly and effectively.

### Admin Stories
- As an admin, I want to have the ability to access all users' reports and profiles, so that I can maintain data integrity, and monitor the overall system's performance.
- As an admin, I want to be able to approve doctors, so that I can provide them the access to the platform's specialized features and facilitate seamless collaboration between doctors and patients.

### User Stories
- As a user, I want to have the ability to reset my password in case I forget it, so that I can regain access to my account and ensure the security of my personal information.
- As a user, I want to have the ability to change my password, so that I can ensure the security of my account and protect my personal information.

<br><br>

<!-- Prototyping -->
<img src="./readme/title3.svg" id="prototyping"/>

> PillPall's design was meticulously crafted, starting with wireframes and mockups. Through a process of iteration and refinement, the layout was fine-tuned to prioritize easy navigation and deliver a seamless user experience.

### Wireframes
| Forgot Password | Delete Medicine | Personal Assistant | Add File Number | Medication Schedule |
| ---| ---| ---| ---| ---|
| ![ForgotPassword](/readme/wireframes/forgotPassword.png )| ![DeleteMedicine](/readme/wireframes/deleteMedicine.png)| ![PersonalAssistant](/readme/wireframes/personalAssistant.png)| ![AddFileNumber](/readme/wireframes/addFileNumber.png)| ![MedicationSchedule](/readme/wireframes/medicationSchedule.png)|

### Mockups
| Login | Doctor Search | Delete Medicine | File Numbers | Add Medical Result |
| ---| ---| ---| ---| ---|
| ![Login](/readme/mockups/login.png )| ![DoctorSearch](/readme/mockups/doctorsearch.png)| ![DeleteMedicine](/readme/mockups/deletemedicine.png)| ![FileNumbers](/readme/mockups/filenum.png)| ![AddMedicalResult](/readme/mockups/addmedicalresult.png)|

<br><br>

<!-- Implementation -->
<img src="./readme/title4.svg" id="implementation"/>

> Using the wireframes and mockups as a guide, we implemented the PillPall app with the following features:

### Common Screens (Mobile)
| Login | Register | Forgot Password | Reset Password | Reset Password (Cancel) |
| ---| ---| ---| ---| ---|
| ![Login](/readme/gif/login.gif)| ![Register](/readme/gif/register.gif)| ![ForgetPassword](/readme/gif/forgotpassword.gif)| ![ResetPassword](/readme/gif/resetpassword1.gif)| ![ResetPassword](/readme/gif/resetpassword.gif)|

### Patient Screens (Mobile)
| Welcome Patient (First Login) | Contact Info | Anthrometric Measurements | Emergency Contact Info |
| ---| ---| ---| ---|
| ![WelcomePatient](/readme/gif/welcome.gif)| ![ContactInfo](/readme/implementation/contactinfo.png)| ![ContactInfo](/readme/implementation/measurements.png)| ![EmergencyContactInfo](/readme/implementation/emergencycontactinfo.png)|

| Vital Signs | Medical History | Medications and Habits | Report |
| ---| ---| ---| ---|
| ![VitalSigns](/readme/implementation/vitalsigns.png)| ![MedicalHistory](/readme/implementation/medicalhistory.png)| ![MedicationsAndHabits](/readme/gif/medicationsandhabits.gif)| ![Report](/readme/gif/report.gif)|

| Edit Report | Medication Schedule | Add Medicine | Delete Medicine |
| ---| ---| ---| ---|
| ![EditReport](/readme/implementation/editreport.png)| ![MedicationSchedule](/readme/gif/medicationschedule.gif)| ![AddMedicine](/readme/gif/addmedicine.gif)| ![DeleteMedicine](/readme/implementation/deletemedicine.png)|

| Nearby Pharmacies | Budget Tracker | Patient Search | File Numbers (Empty State)|
| ---| ---| ---| ---|
| ![NearbyPharmacies](/readme/gif/map.gif)| ![BudgetTracker](/readme/gif/budgettraker.gif)| ![PatientSearch](/readme/gif/patientsearch.gif)| ![EmptyFileNumbers](/readme/gif/filenumberempty.gif)|

| Add File Number | File Numbers | Medical Results (Empty) | Add Medical Result |
| ---| ---| ---| ---|
| ![AddFileNumber](/readme/implementation/addfilenumber.png)| ![FileNumbers](/readme/implementation/filenumbers.png)| ![EmptyMedicalResults](/readme/implementation/emptymedicalresult.png)| ![AddMedicalResult](/readme/gif/addmedicalresult.gif)|

| Medical Results | Personal Assistant (Replacement) | Personal Assistant (Question) | Change Password |
| ---| ---| ---| ---|
| ![MedicalResults](/readme/gif/medicalresult.gif)| ![Replacement](/readme/gif/assistant.gif)| ![Question](/readme/implementation/question.png)| ![ChangePassword](/readme/implementation/changepassword.png)|

### Doctor Screens (Mobile)
| Fill Profile (First Login) | Profile | Doctor Search (Not Connected/Approved) | Change Password |
| ---| ---| ---| ---|
| ![FillProfile](/readme/implementation/fillprofile.png)| ![Profile](/readme/implementation/profile.png)| ![DoctorSearch](/readme/implementation/doctorsearchnotconnected.png)| ![ChanePassword](/readme/implementation/changepassworddoctor.png)|

| Patient Report (Seen by Doctor) | Patient Results (Seen by Doctor) | Doctor Search (Patient Result) | Doctor Search (Patient Report) |
| ---| ---| ---| ---|
| ![PatientReport](/readme/implementation/patientreport.png)| ![PatientResult](/readme/implementation/patientresult.png)| ![EditProfile](/readme/gif/patientresult.gif)| ![DoctorSearch](/readme/gif/patientreport.gif)|

### Admin Screens (Mobile)
| Approved Doctors | Approved Doctor Report | Approved Doctor Report (Empty) | Patients |
| ---| ---| ---| ---|
| ![ApprovedDoctors](/readme/implementation/approveddoctors.png)| ![ApprovedDoctorReport](/readme/implementation/approveddoctorreport.png)| ![ApprovedDoctorReportEmpty](/readme/implementation/approveddoctorreportempty.png)| ![Patients](/readme/implementation/patients.png)|

| Patient Report | Patient Report (Empty) | Unapproved Doctors | Unapproved Doctor Report |
| ---| ---| ---| ---|
| ![PatientReport](/readme/implementation/patientreportbyadmin.png)| ![PatientReportEmpty](/readme/implementation/patientreportempty.png)| ![UnapprovedDoctors](/readme/implementation/unapproveddoctors.png)| ![UnapprovedDoctorReport](/readme/implementation/unapproveddoctorsreport.png)|

| Approve Doctor |
| ---|
| ![ApproveDoctor](/readme/gif/approve.gif)|

<br><br>

<!-- Tech stack -->
<img src="./readme/title5.svg" id="stacks"/>

###  PillPall is built using the following technologies:
- Employed [Laravel](https://laravel.com/), a powerful PHP framework for the backend of PillPall. Laravel provides a solid foundation for building secure and scalable backend systems. 
- Developed the frontend using [TypeScript with React Native](https://reactnative.dev/docs/typescript); this combination offers a more robust development experience by early error detection, and code maintainability.
- Leveraged the capabilities of [MySQL](https://dev.mysql.com/doc/) to securely store and retrieve user data. 
- Integrated the [ChatGPT API](https://openai.com/) for the personal assistant screen to get helpful guidance and assistance.
- Combined the power of [Arduino](https://www.arduino.cc/) with PillPall to create a more interactive and effective medication reminder system.
- Utilized the ["Open Sans"](https://fonts.google.com/specimen/Open+Sans) font as the main app font, and the design of the app adheres to the material design guidelines.
- 🚨 Please note that the functionality to find nearby pharmacies is currently unavailable due to maintenance of the underlying [HERE API](https://developer.here.com/)


<br><br>

<!-- How to run -->
<img src="./readme/title6.svg" id="installation"/>

> To set up PillPall locally, follow these steps:

### Prerequisites

1. Download Node.js installer from [https://nodejs.org/en/download]

2. Install Expo CLI 
    ```sh
    npm install -g expo-cli
    ```
    
3. Download XAMPP from [https://www.apachefriends.org/download.html]

4. Download Composer from [https://getcomposer.org/download/]

5. Download VS Code from [https://code.visualstudio.com/download]


### Installation

1. Get an Key for OpenAPI at [https://openai.com/] 

2. Launch MySQL and Apache from XAMPP

3. Open the terminal and navigate to the desired project directory

4. Clone the repository to your local machine
    ```sh
    git clone https://github.com/rasha-massoud/PillPall.git
    ```

5. Run the following command to install the Laravel app dependencies
    ```sh
    composer install
    ```

6. Open the folder
    ```sh
    code .
    ```

8. Install the official Node.js Library for OpenAi
    ```sh
    npm install openai
    ```

7. Copy the .env.example file to .env
    * Configure the database settings in the .env file
    * Add the OPENAI_API_KEY

8. Navigate to pillpall-backend 
    * Generate a Secret Key to handle token encryption
    ```sh
    php artisan jwt:secret
    ```

    * Create the database tables
    ```sh
    php artisan migrate
    ```

    * Create a symbolic link 
    ```sh
    php artisan storage:link
    ```

     * Execute the scheduled tasks
    ```sh
    php artisan schedule:run
    ```

    * Start the Laravel app
    ```sh
    php artisan serve
    ```

9. Open a new terminal window, and navigate to pillpall-mobile
    * Install the React Native app dependencies
    ```sh
    npm install
    ```

    * Start the Expo Server
    ```sh
    expo start
    ```
10. Download Expo Go on your Iphones

11. Scan the barcode in the terminal to launch the app on a physical device (Design based on Iphone)  

Now, you should be able to run PillPall locally and explore its features.