// DocumentCard.tsx
import React from "react";
import { FileText, Calendar, Hash, Globe, FileCheck } from "lucide-react";
import { DocumentCardProps } from "./types";
import { documentTypes } from "../../_constants/constants";
import { PersonalInfoField } from "../PersonalInfo/PersonalInfoFieldGroup";
import ActionsCell from "@/components/custom/ActionsCell";

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onEdit,
  onDelete,
}) => {
  const getDocumentLabel = (value: string): string => {
    const docType = documentTypes.find((type) => type.value === value);
    return docType ? docType.label : value;
  };

  const getStatusBadge = (status?: string) => {
    if (!status || status === "unknown") {
      return (
        <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
          Unknown
        </span>
      );
    }
    if (status === "expired") {
      return (
        <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-600">
          Expired
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-600">
        Active
      </span>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 bg-gray-50 rounded-lg">
            <FileText className="w-5 h-5 text-gray-600" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-base font-semibold text-gray-900">
                {getDocumentLabel(document.type || "")}
              </h3>
              {getStatusBadge(document.status)}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <PersonalInfoField
                label="Document Number"
                value={document.document_number}
                icon={<Hash className="w-4 h-4" />}
              />

              <PersonalInfoField
                label="Issuing Country"
                value={document.issuing_country}
                icon={<Globe className="w-4 h-4" />}
              />

              {document.issue_date && (
                <PersonalInfoField
                  label="Issue Date"
                  value={document.issue_date}
                  icon={<Calendar className="w-4 h-4" />}
                />
              )}

              {document.expiry_date && (
                <PersonalInfoField
                  label="Expiry Date"
                  value={document.expiry_date}
                  icon={<Calendar className="w-4 h-4" />}
                />
              )}
            </div>

            {document.notes && (
              <div className="mt-4">
                <PersonalInfoField
                  label="Notes"
                  value={document.notes}
                  icon={<FileCheck className="w-4 h-4" />}
                  className="col-span-2"
                />
              </div>
            )}
          </div>
        </div>

        <div className="ml-4">
          <ActionsCell
            row={document}
            onEdit={(doc) => onEdit(doc.id)}
            onDelete={(doc) => onDelete(doc.id)}
            showEdit={true}
            showDelete={true}
          />
        </div>
      </div>
    </div>
  );
};