interface ReceiverInfo {
    firstName: string,
    lastName: string,
    zipCode: string,
    errorMessage: string
}

export const ReciverInfoError: ReceiverInfo[] = [
    {
        firstName: "",
        lastName: "",
        zipCode: "",
        errorMessage: "Error: First Name is required"
    },
    {
        firstName: "",
        lastName: "Pink",
        zipCode: "",
        errorMessage: "Error: First Name is required"
    },
    {
        firstName: "",
        lastName: "Pink",
        zipCode: "1234",
        errorMessage: "Error: First Name is required"
    },
    {
        firstName: "",
        lastName: "",
        zipCode: "1234",
        errorMessage: "Error: First Name is required"
    },
    {
        firstName: "Black",
        lastName: "",
        zipCode: "",
        errorMessage: "Error: Last Name is required"
    },
    {
        firstName: "Black",
        lastName: "",
        zipCode: "1234",
        errorMessage: "Error: Last Name is required"
    },
    {
        firstName: "Black",
        lastName: "Pink",
        zipCode: "",
        errorMessage: "Error: Postal Code is required"
    }
]