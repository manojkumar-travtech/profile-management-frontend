export interface FieldConfig {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
}

export interface SavedDataType {
  topCards: Array<{ title: string; status: string }>;
  departments: Array<{
    name: string;
    desc: string;
    time: string;
    phone: string;
    email: string;
  }>;
  holidays: Array<{ holiday: string; date: string }>;
  timeZones: Array<{ zone: string; tz: string }>;
  liveChat: {
    availability: string;
    waitTime: string;
    languages: string;
  };
  notice: {
    text: string;
    phone: string;
  };
}

export interface ActiveSectionsType {
  topCards: boolean;
  departments: boolean;
  holidays: boolean;
  timeZones: boolean;
  liveChat: boolean;
  notice: boolean;
}

export interface OpenAccordionsType {
  [key: string]: number[];
}

export interface DeleteConfirmType {
  isOpen: boolean;
  sectionName: string;
  onConfirm: () => void;
}

export const defaultData: SavedDataType = {
  topCards: [],
  departments: [],
  holidays: [],
  timeZones: [],
  liveChat: {
    availability: "",
    waitTime: "",
    languages: "",
  },
  notice: {
    text: "",
    phone: "",
  },
};
