'use client'

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Save, ChevronDown, ChevronUp, AlertCircle, RotateCcw, Loader2, Eye, EyeOff, Link as LinkIcon } from "lucide-react";
import { DynamicForm, DynamicFormRef } from "@/components/custom/Form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ConfirmationModal } from "@/components/custom/ConfirmationModal";
import { informationCategories } from "@/app/(root)/general-information/helper";

// Default data structure matching your information categories

const defaultData:any = {
  categories:informationCategories
};

const iconOptions = [
  { label: "Shield", value: "Shield" },
  { label: "Building", value: "Building" },
  { label: "Plane", value: "Plane" },
  { label: "DollarSign", value: "DollarSign" },
  { label: "MapPin", value: "MapPin" },
  { label: "Globe", value: "Globe" },
  { label: "Briefcase", value: "Briefcase" },
  { label: "FileText", value: "FileText" },
];

const updateTypeOptions = [
  { label: "Info", value: "info" },
  { label: "Warning", value: "warning" },
  { label: "Urgent", value: "urgent" },
];

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  hasError?: boolean;
}

function CollapsibleSection({ title, children, isOpen, onToggle, hasError = false }: CollapsibleSectionProps) {
  return (
    <div className={`border rounded-lg ${hasError ? 'border-red-300 bg-red-50' : ''}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{title}</span>
          {hasError && (
            <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> Error
            </span>
          )}
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {isOpen && <div className="p-4 pt-0">{children}</div>}
    </div>
  );
}

interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  links: Array<{ title: string; url: string }>;
  updates: Array<{ text: string; type: string }>;
}

interface DeleteConfirmType {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
}

interface OpenAccordionsType {
  categories: number[];
  [key: string]: number[];
}

export default function InformationCategoriesAdmin() {
  // ---------- State ----------
  const [categoriesData, setCategoriesData] = useState<Category[]>(defaultData.categories);
  const [saveStatus, setSaveStatus] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [errorSections, setErrorSections] = useState<string[]>([]);
  const [openAccordions, setOpenAccordions] = useState<OpenAccordionsType>({ categories: [] });
  
  // Nested accordion state for links and updates
  const [openLinks, setOpenLinks] = useState<{ [key: number]: number[] }>({});
  const [openUpdates, setOpenUpdates] = useState<{ [key: number]: number[] }>({});

  // Saved data for reset functionality
  const [savedData, setSavedData] = useState<{ categories: Category[] }>({
    categories: defaultData.categories,
  });

  // Confirmation modals
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirmType>({ 
    isOpen: false, 
    message: "", 
    onConfirm: () => {} 
  });
  const [resetConfirm, setResetConfirm] = useState<boolean>(false);

  // Active state
  const [isActive, setIsActive] = useState<boolean>(true);

  // ---------- Refs for DynamicForms ----------
  const categoryRefs = useRef<(DynamicFormRef<any> | null)[]>([]);
  const linkRefs = useRef<{ [categoryIndex: number]: (DynamicFormRef<any> | null)[] }>({});
  const updateRefs = useRef<{ [categoryIndex: number]: (DynamicFormRef<any> | null)[] }>({});

  // Track changes
  useEffect(() => {
    const currentData = JSON.stringify({ categories: categoriesData, isActive });
    const savedDataStr = JSON.stringify({ ...savedData, isActive: true });
    setHasUnsavedChanges(currentData !== savedDataStr);
  }, [categoriesData, isActive, savedData]);

  // Warn before leaving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveAll();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasUnsavedChanges]);

  const handleSaveAll = async () => {
    setIsSaving(true);
    setErrorSections([]);
    
    try {
      // Validate all category forms
      const categoryValidations = await Promise.all(
        categoryRefs.current.map(ref => ref?.submit() ?? Promise.resolve(true))
      );
      console.log('categoryValidations',categoryValidations)
      const hasErrors = categoryValidations.some(v => !v);
      
      if (hasErrors) {
        setErrorSections(["Categories"]);
        setSaveStatus("error");
        setTimeout(() => setSaveStatus(""), 5000);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const allData = { categories: categoriesData };
      
      console.log("Saving information categories:", allData);
      setSavedData(allData);
      setSaveStatus("success");
      setHasUnsavedChanges(false);
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(""), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (!hasUnsavedChanges) return;
    setResetConfirm(true);
  };

  const confirmReset = () => {
    setCategoriesData(savedData.categories);
    setIsActive(true);
    setHasUnsavedChanges(false);
    setSaveStatus("");
    setResetConfirm(false);
  };

  const handleDelete = (message: string, onConfirm: () => void) => {
    setDeleteConfirm({
      isOpen: true,
      message,
      onConfirm: () => {
        onConfirm();
        setDeleteConfirm({ isOpen: false, message: "", onConfirm: () => {} });
      }
    });
  };

  // Add/Delete handlers
  const addCategory = () => {
    const newCategory: Category = {
      id: `category-${Date.now()}`,
      title: "",
      description: "",
      icon: "Shield",
      links: [],
      updates: [],
    };
    const newData = [...categoriesData, newCategory];
    setCategoriesData(newData);
    setOpenAccordions({ ...openAccordions, categories: [newData.length - 1] });
  };

  const deleteCategory = (index: number) => {
    handleDelete(
      `Are you sure you want to delete "${categoriesData[index].title || 'this category'}"? All links and updates will be lost.`,
      () => setCategoriesData(categoriesData.filter((_, i) => i !== index))
    );
  };

  const addLink = (categoryIndex: number) => {
    const newLink = { title: "", url: "" };
    const updated = [...categoriesData];
    updated[categoryIndex].links = [...updated[categoryIndex].links, newLink];
    setCategoriesData(updated);
    
    // Open the newly added link
    const currentOpen = openLinks[categoryIndex] || [];
    setOpenLinks({
      ...openLinks,
      [categoryIndex]: [updated[categoryIndex].links.length - 1]
    });
  };

  const deleteLink = (categoryIndex: number, linkIndex: number) => {
    handleDelete(
      "Are you sure you want to delete this link?",
      () => {
        const updated = [...categoriesData];
        updated[categoryIndex].links = updated[categoryIndex].links.filter((_, i) => i !== linkIndex);
        setCategoriesData(updated);
      }
    );
  };

  const addUpdate = (categoryIndex: number) => {
    const newUpdate = { text: "", type: "info" };
    const updated = [...categoriesData];
    updated[categoryIndex].updates = [...updated[categoryIndex].updates, newUpdate];
    setCategoriesData(updated);
    
    // Open the newly added update
    const currentOpen = openUpdates[categoryIndex] || [];
    setOpenUpdates({
      ...openUpdates,
      [categoryIndex]: [updated[categoryIndex].updates.length - 1]
    });
  };

  const deleteUpdate = (categoryIndex: number, updateIndex: number) => {
    handleDelete(
      "Are you sure you want to delete this update?",
      () => {
        const updated = [...categoriesData];
        updated[categoryIndex].updates = updated[categoryIndex].updates.filter((_, i) => i !== updateIndex);
        setCategoriesData(updated);
      }
    );
  };

  const toggleCategoryAccordion = (index: number) => {
    const currentOpen = openAccordions.categories;
    setOpenAccordions({
      ...openAccordions,
      categories: currentOpen.includes(index) 
        ? currentOpen.filter(i => i !== index)
        : [...currentOpen, index]
    });
  };

  const toggleLinkAccordion = (categoryIndex: number, linkIndex: number) => {
    const currentOpen = openLinks[categoryIndex] || [];
    setOpenLinks({
      ...openLinks,
      [categoryIndex]: currentOpen.includes(linkIndex)
        ? currentOpen.filter(i => i !== linkIndex)
        : [...currentOpen, linkIndex]
    });
  };

  const toggleUpdateAccordion = (categoryIndex: number, updateIndex: number) => {
    const currentOpen = openUpdates[categoryIndex] || [];
    setOpenUpdates({
      ...openUpdates,
      [categoryIndex]: currentOpen.includes(updateIndex)
        ? currentOpen.filter(i => i !== updateIndex)
        : [...currentOpen, updateIndex]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Information Categories Admin</h1>
            <p className="text-gray-600 mt-1">
              Manage information categories, links, and updates
              {hasUnsavedChanges && <span className="text-orange-600 ml-2">• Unsaved changes</span>}
            </p>
          </div>
          <div className="flex gap-2">
            {hasUnsavedChanges && (
              <Button onClick={handleReset} variant="tertiary" size="lg" className="gap-2">
                <RotateCcw className="h-4 w-4" /> Reset Changes
              </Button>
            )}
            <Button 
              onClick={handleSaveAll} 
              size="lg" 
              className="gap-2"
              disabled={isSaving || !hasUnsavedChanges}
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" /> Save All Changes
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Status Messages */}
        {saveStatus === "success" && (
          <Alert className="bg-green-50 border-green-200 text-green-800">
            <AlertDescription>✓ All changes saved successfully!</AlertDescription>
          </Alert>
        )}
        
        {saveStatus === "error" && (
          <Alert className="bg-red-50 border-red-200 text-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please fix errors before saving.
            </AlertDescription>
          </Alert>
        )}

        {/* Keyboard Hint */}
        <div className="text-xs text-gray-500 text-center">
          💡 Tip: Press <kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl+S</kbd> to save changes
        </div>

        {/* Categories Section */}
        <Card className={!isActive ? 'opacity-50' : ''}>
          <CardHeader className="flex flex-row justify-between items-center">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsActive(!isActive)}
                className="h-8 px-2"
              >
                {isActive ? (
                  <Eye className="h-4 w-4 text-blue-600" />
                ) : (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                )}
              </Button>
              <div>
                <CardTitle className="flex items-center gap-2">
                  Information Categories
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                    {categoriesData.length}
                  </span>
                  {!isActive && (
                    <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                      Hidden
                    </span>
                  )}
                </CardTitle>
              </div>
            </div>
            {isActive && (
              <Button onClick={addCategory} size="sm" className="gap-2">
                <Plus className="h-4 w-4" /> Add Category
              </Button>
            )}
          </CardHeader>
          
          {isActive && (
            <CardContent className="space-y-4">
              {categoriesData.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-2">No categories yet</p>
                  <Button onClick={addCategory} size="sm" variant="tertiary" className="gap-2">
                    <Plus className="h-4 w-4" /> Add First Category
                  </Button>
                </div>
              ) : (
                categoriesData.map((category, catIdx) => (
                  <CollapsibleSection
                    key={catIdx}
                    title={category.title || `Category ${catIdx + 1}`}
                    isOpen={openAccordions.categories.includes(catIdx)}
                    onToggle={() => toggleCategoryAccordion(catIdx)}
                  >
                    <div className="space-y-4">
                      {/* Category Basic Info */}
                      <DynamicForm
                        ref={(el) => (categoryRefs.current[catIdx] = el) as any}
                        formConfig={{
                          fields: [
                            { name: "id", label: "ID", type: "text" },
                            { name: "title", label: "Title", type: "text" },
                            { name: "description", label: "Description", type: "textarea" },
                            { name: "icon", label: "Icon", type: "select", options: iconOptions },
                          ],
                          gridCols: 2,
                        }}
                        defaultValues={category}
                        externalSubmit
                        onChange={(vals) => {
                          const updated = [...categoriesData];
                          updated[catIdx] = { ...updated[catIdx], ...vals };
                          setCategoriesData(updated);
                        }}
                      />

                      {/* Links Section */}
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-sm flex items-center gap-2">
                            <LinkIcon className="h-4 w-4" />
                            Links ({category.links.length})
                          </h4>
                          <Button 
                            onClick={() => addLink(catIdx)} 
                            size="sm" 
                            variant="tertiary"
                            className="gap-2"
                          >
                            <Plus className="h-3 w-3" /> Add Link
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          {category.links.map((link, linkIdx) => (
                            <CollapsibleSection
                              key={linkIdx}
                              title={link.title || `Link ${linkIdx + 1}`}
                              isOpen={(openLinks[catIdx] || []).includes(linkIdx)}
                              onToggle={() => toggleLinkAccordion(catIdx, linkIdx)}
                            >
                              <DynamicForm
                                ref={(el) => {
                                  if (!linkRefs.current[catIdx]) linkRefs.current[catIdx] = [];
                                  linkRefs.current[catIdx][linkIdx] = el;
                                }}
                                formConfig={{
                                  fields: [
                                    { name: "title", label: "Link Title", type: "text" },
                                    { name: "url", label: "URL", type: "text" },
                                  ],
                                  gridCols: 1,
                                }}
                                defaultValues={link}
                                externalSubmit
                                onChange={(vals) => {
                                  const updated = [...categoriesData];
                                  updated[catIdx].links[linkIdx] = vals;
                                  setCategoriesData(updated);
                                }}
                              />
                              <div className="flex justify-end mt-2">
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="gap-2"
                                  onClick={() => deleteLink(catIdx, linkIdx)}
                                >
                                  <Trash2 className="h-3 w-3" /> Delete
                                </Button>
                              </div>
                            </CollapsibleSection>
                          ))}
                        </div>
                      </div>

                      {/* Updates Section */}
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-sm flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            Updates ({category.updates.length})
                          </h4>
                          <Button 
                            onClick={() => addUpdate(catIdx)} 
                            size="sm" 
                            variant="tertiary"
                            className="gap-2"
                          >
                            <Plus className="h-3 w-3" /> Add Update
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          {category.updates.map((update, updateIdx) => (
                            <CollapsibleSection
                              key={updateIdx}
                              title={`${update.type.toUpperCase()}: ${update.text.substring(0, 40)}...` || `Update ${updateIdx + 1}`}
                              isOpen={(openUpdates[catIdx] || []).includes(updateIdx)}
                              onToggle={() => toggleUpdateAccordion(catIdx, updateIdx)}
                            >
                              <DynamicForm
                                ref={(el) => {
                                  if (!updateRefs.current[catIdx]) updateRefs.current[catIdx] = [];
                                  updateRefs.current[catIdx][updateIdx] = el;
                                }}
                                formConfig={{
                                  fields: [
                                    { name: "text", label: "Update Text", type: "textarea" },
                                    { name: "type", label: "Type", type: "select", options: updateTypeOptions },
                                  ],
                                  gridCols: 1,
                                }}
                                defaultValues={update}
                                externalSubmit
                                onChange={(vals) => {
                                  const updated = [...categoriesData];
                                  updated[catIdx].updates[updateIdx] = vals;
                                  setCategoriesData(updated);
                                }}
                              />
                              <div className="flex justify-end mt-2">
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="gap-2"
                                  onClick={() => deleteUpdate(catIdx, updateIdx)}
                                >
                                  <Trash2 className="h-3 w-3" /> Delete
                                </Button>
                              </div>
                            </CollapsibleSection>
                          ))}
                        </div>
                      </div>

                      {/* Delete Category Button */}
                      <div className="flex justify-end pt-4 border-t">
                        <Button
                          variant="destructive"
                          size="sm"
                          className="gap-2"
                          onClick={() => deleteCategory(catIdx)}
                        >
                          <Trash2 className="h-4 w-4" /> Delete Category
                        </Button>
                      </div>
                    </div>
                  </CollapsibleSection>
                ))
              )}
            </CardContent>
          )}
        </Card>

        {/* Bottom Actions */}
        <div className="flex justify-end gap-2">
          {hasUnsavedChanges && (
            <Button onClick={handleReset} variant="outline" size="lg" className="gap-2">
              <RotateCcw className="h-4 w-4" /> Reset Changes
            </Button>
          )}
          <Button 
            onClick={handleSaveAll} 
            size="lg" 
            className="gap-2"
            disabled={isSaving || !hasUnsavedChanges}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Save All Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, message: "", onConfirm: () => {} })}
        onConfirm={deleteConfirm.onConfirm}
        title="Delete Item"
        description={deleteConfirm.message}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />

      {/* Reset Confirmation Modal */}
      <ConfirmationModal
        isOpen={resetConfirm}
        onClose={() => setResetConfirm(false)}
        onConfirm={confirmReset}
        title="Reset All Changes"
        description="Are you sure you want to discard all unsaved changes? This action cannot be undone."
        confirmText="Reset"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}