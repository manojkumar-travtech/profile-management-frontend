"use client";

import React from "react";
import { Pencil, Trash2, Star, Calendar, Award } from "lucide-react";
import {
  PROVIDER_CONFIG,
  getTierColor,
  formatBalance,
  formatDate,
} from "./constants";
import { LoyaltyProgram } from "../../../_types/profileManagement";

interface ProgramCardProps {
  program: LoyaltyProgram;
  onEdit: (program: LoyaltyProgram) => void;
  onDelete: (id: string) => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  onEdit,
  onDelete,
}) => {
  const balance = formatBalance(program);
  const memberSince = formatDate(program.member_since);
  const tierExpiry = formatDate(program.tier_expiry_date);
  const config =
    PROVIDER_CONFIG[program.provider_type as keyof typeof PROVIDER_CONFIG];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl flex items-center justify-center text-2xl shadow-sm">
            {config?.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {program.program_name}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {program.provider_name}
            </p>

            <div className="flex flex-wrap gap-2">
              {program.tier_status && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTierColor(
                    program.tier_status
                  )}`}
                >
                  <Star className="w-3 h-3 inline mr-1" />
                  {program.tier_status}
                </span>
              )}
              {config?.label && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {config.label}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(program)}
            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(program.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-500 mb-1">Member Number</p>
          <p className="text-sm font-semibold text-gray-900 font-mono">
            {program.member_number}
          </p>
        </div>

        {balance && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Balance</p>
            <p className="text-sm font-semibold text-gray-900">{balance}</p>
          </div>
        )}

        {memberSince && (
          <div>
            <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Member Since
            </p>
            <p className="text-sm font-medium text-gray-700">{memberSince}</p>
          </div>
        )}

        {tierExpiry && (
          <div>
            <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <Award className="w-3 h-3" /> Tier Expires
            </p>
            <p className="text-sm font-medium text-gray-700">{tierExpiry}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramCard;
