import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    image: "",
    phone_number: "",
    dob: "",
    address: "",
    gender: "",
    blood_type: "",
    height: "",
    weight: "",
    emergency_name: "",
    emergency_number: "",
    emergency_email: "",
    emergency_contact_relation: "",
    body_temperature: "",
    pulse_rate: "",
    respiration_rate: "",
    systolic_blood_pressure: "",
    chronic_conditions: "",
    past_surgeries: "",
    family_medical_history: "",
    allergies: "",
    life_style_habits: "",
    medications: "",
};

const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setImage: (state, action) => {
            state.image = action.payload;
        },
        setPhoneNumber: (state, action) => {
            state.phone_number = action.payload;
        },
        setDob: (state, action) => {
            state.dob = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        },
        setGender: (state, action) => {
            state.gender = action.payload;
        },
        setBloodType: (state, action) => {
            state.blood_type = action.payload;
        },
        setHeight: (state, action) => {
            state.height = action.payload;
        },
        setWeight: (state, action) => {
            state.weight = action.payload;
        },
        setEmergencyName: (state, action) => {
            state.emergency_name = action.payload;
        },
        setEmergencyNumber: (state, action) => {
            state.emergency_number = action.payload;
        },
        setEmergencyEmail: (state, action) => {
            state.emergency_email = action.payload;
        },
        setEmergencyContactRelation: (state, action) => {
            state.emergency_contact_relation = action.payload;
        },
        setBodyTemperature: (state, action) => {
            state.body_temperature = action.payload;
        },
        setPulseRate: (state, action) => {
            state.pulse_rate = action.payload;
        },
        setRespirationRate: (state, action) => {
            state.respiration_rate = action.payload;
        },
        setSystolicBloodPressure: (state, action) => {
            state.systolic_blood_pressure = action.payload;
        },
        setChronicConditions: (state, action) => {
            state.chronic_conditions = action.payload;
        },
        setPastSurgeries: (state, action) => {
            state.past_surgeries = action.payload;
        },
        setFamilyMedicalHistory: (state, action) => {
            state.family_medical_history = action.payload;
        },
        setAllergies: (state, action) => {
            state.allergies = action.payload;
        },
        setLifeStyleHabits: (state, action) => {
            state.life_style_habits = action.payload;
        },
        setMedications: (state, action) => {
            state.medications = action.payload;
        },
    },
    
});

export const {
    setName,
    setEmail,
    setImage,
    setPhoneNumber,
    setDob,
    setAddress,
    setGender,
    setBloodType,
    setHeight,
    setWeight,
    setEmergencyName,
    setEmergencyNumber,
    setEmergencyEmail,
    setEmergencyContactRelation,
    setBodyTemperature,
    setPulseRate,
    setRespirationRate,
    setSystolicBloodPressure,
    setChronicConditions,
    setPastSurgeries,
    setFamilyMedicalHistory,
    setAllergies,
    setLifeStyleHabits,
    setMedications,
} = reportSlice.actions;

export default reportSlice.reducer;
