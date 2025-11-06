'use client';

import DataTable from "@/components/custom/DataTable/DataTable";
import { Edit2, Settings, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const delegates = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'assistant',
    permissions: '4/6 permissions',
    status: 'active',
    lastAccess: 'Oct 8, 2024'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    role: 'manager',
    permissions: '6/6 permissions',
    status: 'active',
    lastAccess: 'Oct 7, 2024'
  }
];

const requests = [
  {
    id: 1,
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    requestedRole: 'manager',
    dateRequested: 'Oct 5, 2024'
  },
  {
    id: 2,
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    requestedRole: 'assistant',
    dateRequested: 'Oct 6, 2024'
  }
];

// Reusable tab button
const TabButton = ({ active, onClick, label, badgeColor, badgeText }: any) => (
  <button
    onClick={onClick}
    className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
      active
        ? 'border-indigo-600 text-indigo-600'
        : 'border-transparent text-gray-500 hover:text-gray-700'
    }`}
  >
    {label}
    {badgeText && (
      <Badge variant="secondary" className={`ml-2 ${badgeColor}`}>{badgeText}</Badge>
    )}
  </button>
);

// Badge component for role/status
const RoleBadge = ({ role }: { role: string }) => (
  <Badge
    variant="secondary"
    className={role === 'manager' ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-100'}
  >
    {role}
  </Badge>
);

const StatusBadge = ({ status }: { status: string }) => (
  <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
    {status}
  </Badge>
);

// Table columns
const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }: any) => (
      <div>
        <div className="text-sm font-medium text-gray-900">{row.name}</div>
        <div className="text-sm text-gray-500">{row.email}</div>
      </div>
    )
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ value }: any) => <RoleBadge role={value} />
  },
  {
    accessorKey: 'permissions',
    header: 'Permissions',
    cell: ({ value }: any) => <span className="text-sm text-gray-900">{value}</span>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ value }: any) => <StatusBadge status={value} />
  },
  {
    accessorKey: 'lastAccess',
    header: 'Last Access',
    cell: ({ value }: any) => <span className="text-sm text-gray-500">{value}</span>
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    sortable: false,
    cell: () => (
      <div className="flex items-center gap-2">
        {[Edit2, Trash2].map((Icon, i) => (
          <button key={i} className="p-1 hover:bg-gray-100 rounded">
            <Icon className="w-4 h-4 text-gray-400" />
          </button>
        ))}
      </div>
    )
  }
];

const DelegationTable = () => {
  const [activeTab, setActiveTab] = useState('current');

  return (
    <div className="p-4">
      <div className="flex items-center gap-6 px-4 border-b border-gray-200 mb-4">
        <TabButton
          active={activeTab === 'current'}
          onClick={() => setActiveTab('current')}
          label="Current Delegates"
          badgeColor="bg-gray-100 text-gray-900"
          badgeText={`${delegates.length}`}
        />
        <TabButton
          active={activeTab === 'requests'}
          onClick={() => setActiveTab('requests')}
          label="Delegation Requests"
          badgeColor="bg-pink-100 text-pink-700"
          badgeText={`${requests.length}`}
        />
        <button className="ml-auto py-3 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>

      {activeTab === 'current' ? (
        <DataTable
          globalSearchable
          columns={columns as any}
          data={delegates}
          withBorder={false}
          withExtraPadding={false}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((req) => (
            <div key={req.id} className="border p-4 rounded-lg shadow-sm flex flex-col gap-2">
              <div className="text-sm font-medium text-gray-900">{req.name}</div>
              <div className="text-sm text-gray-500">{req.email}</div>
              <RoleBadge role={req.requestedRole} />
              <div className="text-sm text-gray-400">Requested on: {req.dateRequested}</div>
              <div className="flex gap-2 mt-2">
                <button className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200">Approve</button>
                <button className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DelegationTable;
