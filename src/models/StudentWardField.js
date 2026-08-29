export const studentWardFieldMetadata = {
  FullName: {
    label: "First Name",
    type: "text",
    placeholder: "Search for a student",
    isRequired: true,
    lookup: {
      entity: "Students",
      displayAttribute: "fullName",
    },
  },

  ward: {
    label: "Ward",
    type: "text",
    placeholder: "Enter ward",
    isRequired: true,
  },

  in: {
    label: "In",
    type: "time",
    isRequired: true,
  },

  out: {
    label: "Out",
    type: "time",
    isRequired: false,
  },
};
