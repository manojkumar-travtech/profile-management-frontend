"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InfoFieldProps, InfoGrid } from "./InfoGrid";

export interface ProfileHeaderProps {
  avatar?: string;
  name: string;
  fields: InfoFieldProps[];
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  avatar,
  name,
  fields,
}) => {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <div className="flex flex-col items-start gap-3">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 rounded-lg">
            <AvatarImage src={avatar} />
            <AvatarFallback className="bg-primary text-white text-xl rounded-b-full">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium text-gray-800">{name}</p>
            <p className="text-sm text-gray-500">Profile Picture</p>
          </div>
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      <InfoGrid fields={fields} columns={4} />
    </>
  );
};
