import { FormConfig } from "@/components/custom/Form";

// Payment Form Fields Interface
export interface PaymentFormFields {
  type: string;
  cardNumber: string;
  cvv: string;
  holderName: string;
  expiryMonth: string;
  expiryYear: string;
  isCorporate: boolean;
  dailyLimit?: number;
  monthlyLimit?: number;
  perTripLimit?: number;
  isDefault: boolean;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Payment Form Configuration using your existing structure
export const paymentFormConfig: FormConfig<PaymentFormFields> = {
  title: "",
  description: "",
  gridCols: 2,
  sections: [
    {
      title: "",
      fields: [
        {
          name: "type",
          label: "Payment Type",
          type: "select",
          placeholder: "Select Payment Type",
          colSpan: 2,
          validation: { required: "Payment type is required" },
          options: [
            { value: "credit-card", label: "💳 Credit Card" },
            { value: "debit-card", label: "💳 Debit Card" },
            { value: "prepaid-card", label: "💳 Prepaid Card" },
            { value: "digital-wallet", label: "👛 Digital Wallet (PayPal, Apple Pay, Google Pay)" },
            { value: "bank-account", label: "🏦 Bank Account" },
            { value: "corporate-account", label: "🏢 Corporate Account" },
            { value: "gift-card", label: "🎁 Gift Card" },
            { value: "ach", label: "🏦 ACH / Direct Debit" },
            { value: "wire-transfer", label: "💸 Wire Transfer" }
          ]
        }
      ]
    },
    {
      title: "Card Details",
      fields: [
        {
          name: "cardNumber",
          label: "Card Number",
          type: "text",
          placeholder: "1234 5678 9012 3456",
          colSpan: 2,
          validation: { 
            required: "Card number is required",
            minLength: 13,
            maxLength: 19,
            pattern: {
              value: /^[0-9\s]+$/,
              message: "Card number must contain only digits"
            }
          }
        },
        {
          name: "holderName",
          label: "Card Holder Name",
          type: "text",
          placeholder: "John Doe",
          colSpan: 2,
          validation: { 
            required: "Card holder name is required",
            minLength: 3
          }
        },
        {
          name: "cvv",
          label: "CVV / CVC",
          type: "password",
          placeholder: "123",
          colSpan: 1,
          validation: { 
            required: "CVV is required",
            minLength: 3,
            maxLength: 4
          },
          helpText: "3 digits (4 for Amex) - never stored"
        }
      ]
    },
    {
      title: "Expiry Date",
      fields: [
        {
          name: "expiryMonth",
          label: "Expiry Month",
          type: "select",
          placeholder: "Month",
          colSpan: 1,
          validation: { required: "Expiry month is required" },
          options: Array.from({ length: 12 }, (_, i) => ({
            value: (i + 1).toString().padStart(2, '0'),
            label: (i + 1).toString().padStart(2, '0')
          }))
        },
        {
          name: "expiryYear",
          label: "Expiry Year",
          type: "select",
          placeholder: "Year",
          colSpan: 1,
          validation: { required: "Expiry year is required" },
          options: Array.from({ length: 15 }, (_, i) => {
            const year = new Date().getFullYear() + i;
            return { value: year.toString(), label: year.toString() };
          })
        }
      ]
    },
    {
      title: "Additional Options",
      fields: [
        {
          name: "isCorporate",
          label: "Corporate Card",
          type: "checkbox",
          colSpan: 2,
          description: "Check if this is a corporate card with spending limits"
        },
        {
          name: "dailyLimit",
          label: "Daily Limit ($)",
          type: "number",
          placeholder: "1000",
          colSpan: 1,
          conditional: {
            field: "isCorporate",
            value: [true]
          }
        },
        {
          name: "monthlyLimit",
          label: "Monthly Limit ($)",
          type: "number",
          placeholder: "10000",
          colSpan: 1,
          conditional: {
            field: "isCorporate",
            value: [true]
          }
        },
        {
          name: "perTripLimit",
          label: "Per Trip Limit ($)",
          type: "number",
          placeholder: "5000",
          colSpan: 2,
          conditional: {
            field: "isCorporate",
            value: [true]
          }
        },
        {
          name: "isDefault",
          label: "Set as Default Payment Method",
          type: "checkbox",
          colSpan: 2,
          description: "Use this payment method by default for all bookings"
        }
      ]
    },
    {
      title: "Billing Address",
      fields: [
        {
          name: "street",
          label: "Street Address",
          type: "text",
          placeholder: "123 Main St",
          colSpan: 2,
          validation: { required: "Street address is required" }
        },
        {
          name: "city",
          label: "City",
          type: "text",
          placeholder: "New York",
          colSpan: 1,
          validation: { required: "City is required" }
        },
        {
          name: "state",
          label: "State/Province",
          type: "text",
          placeholder: "NY",
          colSpan: 1,
          validation: { required: "State is required" }
        },
        {
          name: "postalCode",
          label: "Postal Code",
          type: "text",
          placeholder: "10001",
          colSpan: 1,
          validation: { required: "Postal code is required" }
        },
        {
          name: "country",
          label: "Country",
          type: "text",
          placeholder: "United States",
          colSpan: 1,
          validation: { required: "Country is required" }
        }
      ]
    }
  ]
};