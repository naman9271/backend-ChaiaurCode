import mongoose from 'mongoose';
import { Hospital } from './hospital.models';

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      reuired: true,
    },
    Qualification: {
      type: String,
      reuired: true,
    },
    experienceInYears: {
      type: Number,
      reuired: true,
      default: 0,
    },
    workInHospitals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Hospital,
      },
    ],
  },
  { timestamps: true }
);

export const Doctor = mongoose.model('Doctor', doctorSchema);
