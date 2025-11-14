"use client";

import React from "react";
import { Plus, Newspaper } from "lucide-react";
import Image from "next/image";
import { NewsFormValues } from "./news.types";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import ActionsCell from "@/components/custom/ActionsCell";
import { Typography } from "@/components/custom/Typography";
import { Badge } from "@/components/ui/badge";

interface NewsListViewProps {
  newsList: NewsFormValues[];
  onAddNew: () => void;
  onEdit: (index: string) => void;
  onDelete: (index: string) => void;
}

export const NewsListView: React.FC<NewsListViewProps> = ({
  newsList,
  onAddNew,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      {newsList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed rounded-lg bg-muted/10">
          <div className="bg-muted p-4 rounded-full mb-4">
            <Newspaper size={36} className="text-muted-foreground" />
          </div>
          <Typography weight="semibold" className="text-lg mb-2">
            No news alerts yet
          </Typography>
          <Typography size="sm" className="text-muted-foreground mb-4 max-w-sm">
            You haven't created any alerts. Start by adding your first one to
            notify users about updates or announcements.
          </Typography>
          <Button onClick={onAddNew} className="flex items-center gap-2">
            <Plus size={16} />
            Create your first alert
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {newsList.map((item, i) => (
            <div
              key={i}
              className="border rounded-xl p-4 md:p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-slate-50/50 hover:border-slate-300 group"
            >
              <div className="flex flex-col md:grid md:grid-cols-[200px_1fr_auto] gap-4 items-start">
                {/* Image */}
                <div className="w-full md:w-[200px] h-32 relative rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Newspaper size={32} className="text-slate-400" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center min-w-0">
                  <Typography
                    as="h3"
                    weight="bold"
                    className="text-lg md:text-xl mb-1"
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    size="sm"
                    className="text-blue-600 font-medium mb-1"
                  >
                    {item.category}
                  </Typography>

                  <Typography
                    size="sm"
                    className="text-muted-foreground line-clamp-2 mb-3"
                  >
                    {item.summary}
                  </Typography>

                  <div className="flex justify-center md:justify-start items-center gap-2 flex-wrap">
                    {item.is_published && (
                      <Badge
                        variant="outline"
                        className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200 font-medium px-3 py-1"
                      >
                        Published
                      </Badge>
                    )}
                    {item.is_featured && (
                      <Badge
                        variant="outline"
                        className="bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 border-amber-200 font-medium px-3 py-1"
                      >
                        Featured
                      </Badge>
                    )}
                    {!item.is_active && (
                      <Badge
                        variant="outline"
                        className="bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 border-slate-200 font-medium px-3 py-1"
                      >
                        Inactive
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end md:items-start pt-2 md:pt-0">
                  <ActionsCell
                    row={String(item.id) as any}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    showEdit
                    showDelete
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
