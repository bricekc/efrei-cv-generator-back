import mongoose from 'mongoose';

const EducationalExperienceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
});

const ProfessionalExperienceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
});

const CVSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    educationalExperiences: {
      type: [EducationalExperienceSchema]
    },
    professionalExperiences: {
      type: [ProfessionalExperienceSchema]
    },
    reviews: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Review'
      }
    ]
  },
  { timestamps: true }
);

const Cv = mongoose.model('Cv', CVSchema);

export default Cv;
