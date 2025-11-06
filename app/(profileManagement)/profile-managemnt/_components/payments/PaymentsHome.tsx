"use client";
import React, { useState, useCallback, useMemo } from "react";
import { CreditCard, Star, Eye, Pencil, Trash2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DrawerFormDialog } from "@/app/(profileManagement)/_components/DrawerFormDialog";
import ProfileManagementMainPageLayout from "@/app/(profileManagement)/_components/ProfileManagementMainPageLayout";
import { paymentFormConfig, PaymentFormFields } from "./paymentFormConfig";

// --- Softer, lower-contrast gradients ---
const gradients: Record<string, string> = {
  visa: "from-blue-200 to-blue-400",
  mastercard: "from-yellow-200 to-red-300",
  amex: "from-cyan-200 to-indigo-300",
  discover: "from-orange-200 to-amber-300",
  unknown: "from-gray-200 to-gray-400",
};


// Combined brand detection and naming utility
const getCardBrandInfo = (number: string) => {
  const cleanNumber = number.replace(/\s/g, "");
  const patterns: Record<string, RegExp> = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
  };
  for (const brand in patterns) {
    if (patterns[brand].test(cleanNumber)) {
      const names: Record<string, string> = {
        visa: "Visa",
        mastercard: "Mastercard",
        amex: "American Express",
        discover: "Discover",
      };
      return { brand, brandName: names[brand] };
    }
  }
  return { brand: "unknown", brandName: "Unknown" };
};

// Mask card number utility
const maskCardNumber = (number: string) => {
  return number
    .replace(/\s/g, "")
    .replace(/\d(?=\d{4})/g, "*")
    .match(/.{1,4}/g)
    ?.join(" ") ?? number;
};

// Memoized CardItem component to avoid unnecessary re-renders
const CardItem = React.memo(
  ({
    card,
    onView,
    onEdit,
    onDelete,
  }: {
    card: PaymentFormFields;
    onView: (card: PaymentFormFields) => void;
    onEdit: () => void;
    onDelete: () => void;
  }) => {
    const { brand, brandName } = useMemo(
      () => getCardBrandInfo(card.cardNumber),
      [card.cardNumber]
    );
    const maskedNumber = useMemo(() => maskCardNumber(card.cardNumber), [
      card.cardNumber,
    ]);

    return (
      <div
        className={`relative overflow-hidden rounded-xl text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br ${gradients[brand]}`}
      >
        <div className="p-5 flex flex-col justify-between h-52">
          {/* Top Row */}
          <div className="flex items-start justify-between">
            {/* Badges */}
            <div className="flex flex-col gap-1">
              {card.isCorporate && (
                <span className="flex items-center bg-white/20 px-2 py-0.5 text-xs rounded-md w-fit">
                  <Briefcase className="w-3 h-3 mr-1" /> Corporate
                </span>
              )}
              {card.isDefault && (
                <span className="flex items-center bg-white/20 px-2 py-0.5 text-xs rounded-md w-fit">
                  <Star className="w-3 h-3 mr-1 fill-yellow-300 text-yellow-300" />
                  Default
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => onView(card)}
                className="bg-blue-500 hover:bg-blue-600 p-1.5 rounded-full transition"
                title="View"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={onEdit}
                className="bg-yellow-400 hover:bg-yellow-500 p-1.5 rounded-full transition"
                title="Edit"
              >
                <Pencil className="w-4 h-4 text-black" />
              </button>
              <button
                onClick={onDelete}
                className="bg-red-500 hover:bg-red-600 p-1.5 rounded-full transition"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card Number and Brand */}
          <div>
            <p className="text-lg tracking-widest font-semibold mb-1">
              {maskedNumber}
            </p>
            <div className="flex items-center justify-between text-sm text-white/90">
              <span>{brandName}</span>
              <span>
                {card.expiryMonth}/{card.expiryYear}
              </span>
            </div>
          </div>

          {/* Card Holder & Limits */}
          <div className="flex justify-between items-end text-xs text-white/80">
            <div>
              <p className="font-medium uppercase tracking-wider">
                {card.holderName}
              </p>
              <p>{card.city}</p>
            </div>
            <div className="text-right">
              <p>Daily: ${card.dailyLimit}</p>
              <p>Monthly: ${card.monthlyLimit}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default function PaymentsDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCard, setSelectedCard] = useState<PaymentFormFields | null>(
    null
  );

  const [cards, setCards] = useState<PaymentFormFields[]>([
    {
      type: "credit-card",
      cardNumber: "4111 1111 1111 1111",
      cvv: "123",
      holderName: "John Doe",
      expiryMonth: "12",
      expiryYear: (new Date().getFullYear() + 2).toString(),
      isCorporate: true,
      dailyLimit: 500,
      monthlyLimit: 5000,
      perTripLimit: 1000,
      isDefault: true,
      street: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
    },
    {
      type: "credit-card",
      cardNumber: "5555 5555 5555 4444",
      cvv: "456",
      holderName: "Jane Smith",
      expiryMonth: "08",
      expiryYear: (new Date().getFullYear() + 3).toString(),
      isCorporate: false,
      dailyLimit: 1000,
      monthlyLimit: 8000,
      perTripLimit: 2000,
      isDefault: false,
      street: "456 Park Ave",
      city: "Los Angeles",
      state: "CA",
      postalCode: "90001",
      country: "United States",
    },
    {
      type: "credit-card",
      cardNumber: "3782 822463 10005",
      cvv: "789",
      holderName: "Michael Johnson",
      expiryMonth: "06",
      expiryYear: (new Date().getFullYear() + 1).toString(),
      isCorporate: false,
      dailyLimit: 700,
      monthlyLimit: 6000,
      perTripLimit: 1200,
      isDefault: false,
      street: "22 Baker Street",
      city: "Chicago",
      state: "IL",
      postalCode: "60601",
      country: "United States",
    },
    {
      type: "credit-card",
      cardNumber: "6011 1111 1111 1117",
      cvv: "321",
      holderName: "Emily Davis",
      expiryMonth: "09",
      expiryYear: (new Date().getFullYear() + 4).toString(),
      isCorporate: false,
      dailyLimit: 900,
      monthlyLimit: 7000,
      perTripLimit: 1500,
      isDefault: false,
      street: "789 Elm St",
      city: "Houston",
      state: "TX",
      postalCode: "77001",
      country: "United States",
    },
    {
      type: "corporate-card",
      cardNumber: "4539 4512 0398 7356",
      cvv: "111",
      holderName: "Corporate Travel",
      expiryMonth: "01",
      expiryYear: (new Date().getFullYear() + 5).toString(),
      isCorporate: true,
      dailyLimit: 2000,
      monthlyLimit: 20000,
      perTripLimit: 5000,
      isDefault: false,
      street: "1 Business Plaza",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      country: "United States",
    },
  ]);

  const handleSubmit = useCallback(
    async (data: PaymentFormFields) => {
      setIsProcessing(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCards((prev) => {
        if (selectedCard) {
          return prev.map((card) =>
            card.cardNumber === selectedCard.cardNumber ? data : card
          );
        } else {
          return [...prev, data];
        }
      });
      setIsProcessing(false);
      setIsOpen(false);
      setSelectedCard(null);
    },
    [selectedCard]
  );

  const handleDelete = useCallback((index: number) => {
    setCards((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleEdit = useCallback(
    (index: number) => {
      setSelectedCard(cards[index]);
      setIsOpen(true);
    },
    [cards]
  );

  const handleView = useCallback((card: PaymentFormFields) => {
    alert(
      `Card Details:\nHolder: ${card.holderName}\nNumber: ${card.cardNumber}\nExpires: ${card.expiryMonth}/${card.expiryYear}`
    );
  }, []);

  return (
    <ProfileManagementMainPageLayout
      rightSection={
        <Button
          onClick={() => {
            setSelectedCard(null);
            setIsOpen(true);
          }}
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Add Payment Method
        </Button>
      }
      title="Payment Methods Management"
      subtitle="Manage your payment methods securely for travel bookings"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {cards.map((card, index) => (
            <CardItem
              key={card.cardNumber}
              card={card}
              onView={handleView}
              onEdit={() => handleEdit(index)}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </div>

        <DrawerFormDialog
          open={isOpen}
          onOpenChange={(open) => {
            if (!open) setSelectedCard(null);
            setIsOpen(open);
          }}
          title={selectedCard ? "Edit Payment Method" : "Add Payment Method"}
          formConfig={paymentFormConfig}
          defaultValues={selectedCard ?? undefined}
          onSubmit={handleSubmit}
          submitText="Save"
        />
      </div>
    </ProfileManagementMainPageLayout>
  );
}
