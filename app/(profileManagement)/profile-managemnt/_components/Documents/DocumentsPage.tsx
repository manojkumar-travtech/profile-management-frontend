"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ProfileManagementMainPageLayout from "@/app/(profileManagement)/_components/ProfileManagementMainPageLayout";
import { FileText, Loader2 } from "lucide-react";
import { DocumentData } from "./types";
import { DocumentCard } from "./DocumentCard";
import { DocumentFormModal } from "./DocumentFormModal";
import {
  addDocument,
  deleteDocument,
  getTravelDocuments,
  updateDocument,
} from "../../_actions/profileManagementApi";
import { transformAPIDataToFormData } from "./utils";
import { ConfirmationModal } from "@/components/custom/ConfirmationModal";

export default function DocumentsPage() {
  const [showForm, setShowForm] = useState(false);
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingDocument, setEditingDocument] = useState<
    DocumentData | undefined
  >();
  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    id: string | null;
  }>({
    open: false,
    id: null,
  });

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTravelDocuments();
      const formattedData = (data.data || []).map((ele: any) =>
        transformAPIDataToFormData(ele)
      );
      setDocuments(formattedData);
    } catch (err) {
      setError("Failed to load documents. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddDocument = async (data: DocumentData) => {
    try {
      setActionLoading(true);
      if (editingDocument) {
        await updateDocument(editingDocument.id, data);
      } else {
        await addDocument(data);
      }
      setShowForm(false);
      setEditingDocument(undefined);
      await loadDocuments();
    } catch (err) {
      console.error("Failed to save document:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    const doc = documents.find((d) => d.id === id);
    if (doc) {
      setEditingDocument(doc);
      setShowForm(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirm({ open: true, id });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.id) return;

    try {
      setActionLoading(true);
      await deleteDocument(deleteConfirm.id);
      setDeleteConfirm({ open: false, id: null });
      await loadDocuments();
    } catch (err) {
      console.error("Failed to delete document:", err);
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingDocument(undefined);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Loader2 className="w-8 h-8 text-gray-400 mx-auto mb-3 animate-spin" />
          <p className="text-gray-600">Loading documents...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12 bg-red-50 rounded-lg">
          <p className="text-red-600 mb-2">{error}</p>
          <Button onClick={loadDocuments} variant="secondary-gray" size="sm">
            Retry
          </Button>
        </div>
      );
    }

    if (documents.length === 0) {
      return (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No documents added yet.</p>
          <p className="text-sm text-gray-500 mt-1">
            Click "Add Document" to get started
          </p>
        </div>
      );
    }

    return documents.map((doc) => (
      <DocumentCard
        key={doc.id}
        document={doc}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />
    ));
  };

  return (
    <ProfileManagementMainPageLayout
      rightSection={
        <Button onClick={() => setShowForm(true)}>Add Document</Button>
      }
      title="Travel Documents"
      subtitle="Manage your passports, visas, and other travel documents"
    >
      <div className="space-y-4">{renderContent()}</div>

      <DocumentFormModal
        isLoading={actionLoading}
        open={showForm}
        onClose={handleCloseForm}
        onSubmit={handleAddDocument}
        editData={editingDocument}
      />

      <ConfirmationModal
        isOpen={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
        onConfirm={handleDeleteConfirm}
        loading={actionLoading}
        title="Delete Document"
        description="Are you sure you want to delete this document? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        loadingText="Deleting..."
      />
    </ProfileManagementMainPageLayout>
  );
}
