"use client";
import React from "react";
import { Trash, Pencil } from "lucide-react";
import TravelerMainPageLayout from "../../_components/TravelerMainPageLayout";
import { createDataTableColumns, DataTableColumn } from "@/components/custom/DataTable/DataTable.types";
import LoyaltySection from "./_components/LoyaltySection";
import ActionsCell from "@/components/custom/ActionsCell";

interface LoyaltyItem {
  id: string;
  name: string;
  loyaltyNumber: string;
  expDate: string;
}

const LoyaltyMemberships: React.FC = () => {
  const loyaltySections = [
    {
      title: "Air Loyalty Numbers",
      nameLabel: "Airline Name",
      data: [
        {
          id: "1",
          name: "Delta Airlines",
          loyaltyNumber: "492048293",
          expDate: "Dec 01, 2025",
        },
        {
          id: "2",
          name: "United Airlines",
          loyaltyNumber: "258439244",
          expDate: "Jan 08, 2026",
        },
        {
          id: "3",
          name: "Southwest Airlines",
          loyaltyNumber: "358475892",
          expDate: "Jul 31, 2024",
        },
        {
          id: "4",
          name: "American Airlines",
          loyaltyNumber: "582948520",
          expDate: "Apr 22, 2025",
        },
      ],
    },
    {
      title: "Hotel Loyalty Numbers",
      nameLabel: "Hotel Name",
      data: [
        {
          id: "5",
          name: "Grand Royale",
          loyaltyNumber: "482028294",
          expDate: "Dec 08, 2025",
        },
        {
          id: "6",
          name: "Ocean View Suites",
          loyaltyNumber: "482028091",
          expDate: "Dec 03, 2025",
        },
        {
          id: "7",
          name: "Mountain Resort Inn",
          loyaltyNumber: "482028091",
          expDate: "Dec 04, 2025",
        },
      ],
    },
    {
      title: "Cafe Loyalty Numbers",
      nameLabel: "Cafe Company Name",
      data: [
        {
          id: "8",
          name: "Sector Cafe",
          loyaltyNumber: "492048294",
          expDate: "Jun 13, 2026",
        },
        {
          id: "9",
          name: "Auvre Teal",
          loyaltyNumber: "492048293",
          expDate: "Feb 20, 2026",
        },
      ],
    },
    {
      title: "Cruise Loyalty Numbers",
      nameLabel: "Cruise Line Name",
      data: [
        {
          id: "10",
          name: "Royal Caribbean",
          loyaltyNumber: "492048294",
          expDate: "Dec 02, 2025",
        },
        {
          id: "11",
          name: "Carnival",
          loyaltyNumber: "492048293",
          expDate: "Dec 03, 2025",
        },
        {
          id: "12",
          name: "Princess Cruises",
          loyaltyNumber: "492048294",
          expDate: "Dec 04, 2025",
        },
        {
          id: "13",
          name: "Celebrity Cruises",
          loyaltyNumber: "492048297",
          expDate: "Dec 05, 2025",
        },
      ],
    },
  ];

  const handleEdit = (item: LoyaltyItem) => console.log("Edit", item);
  const handleDelete = (item: LoyaltyItem) => console.log("Delete", item);

const createColumns = (nameLabel: string): DataTableColumn<LoyaltyItem>[] => [
  createDataTableColumns<LoyaltyItem>({
    header: nameLabel,
    accessorKey: "name",
    searchable: true,
    sortable: true,
  }),
  createDataTableColumns<LoyaltyItem>({
    header: "Loyalty Number",
    accessorKey: "loyaltyNumber",
    searchable: true,
    sortable: true,
  }),
  createDataTableColumns<LoyaltyItem>({
    header: "Exp. Date",
    accessorKey: "expDate",
    sortable: true,
  }),
  createDataTableColumns<LoyaltyItem>({
    header: "Actions",
    accessorKey: "id",
    cell: ({ row }) => (
      <ActionsCell<LoyaltyItem>
        row={row}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={(item) => console.log("View", item)}
        showEdit
        showDelete
        showView={false}
        showMore={false}
      />
    ),
  }),
];


  return (
    <TravelerMainPageLayout
      title="Loyalty & Memberships"
      subtitle="Centrum loyalty numbers and memberships to ensure benefits are applied consistently across bookings and services."
    >
      <div className="space-y-4">
        {loyaltySections.map((section) => (
          <LoyaltySection
            key={section.title}
            title={section.title}
            data={section.data}
            columns={createColumns(section.nameLabel)}
          />
        ))}
      </div>
    </TravelerMainPageLayout>
  );
};

export default LoyaltyMemberships;
