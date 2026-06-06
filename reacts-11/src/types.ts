// Define the shape of a single Hook object
export type Hook = {
  id: string;
  name: string;
  hook: string;
  role: string;
  traits: string[];
  usedFor: string;
  icon: string;
  featured: boolean;
  level: number
};
export interface Traits {
  regions?: string[];
  languages?: string[];
  backgrounds?: string[];
  martialArts?: string[];
  fieldRoles?: string[];
};

export type Agent = {
  id: string,
  name: string,
  specialty: string,
  status: "Untrained" | "Trained" | "Active" | "Retired" | "InTraining", // Union literal type restricts values
  assignedBy: string,
  mode: string,
  icon: string,
  traits?: Traits // Optional property
}
export type ArchitectAgent = {
  id: string,
  name: string,
  specialty: string,
  status: string,
  assignedBy: string,
  mode: string,
  icon: string,
  traits?: Traits // Optional property
}

type SorterAgent = {
  id: number,
  name: string,
  status: "Trained",
  mode: "mission",
  icon: string,
  traits?: SorterTraits
}

type SorterTraits = {
  fieldRoles: {
    role: string;
    coreTraits: string[];
    optionalTraits: string[]
  },
  sharedTraits: {
    softskills: string[];
    martialArts: string[];
    psychotype: string[]
  }

};

export type Action =
  | { type: 'TOGGLE_SCROL_SELECT'; payload: { category: string, value: string, checked: boolean } }
  | { type: 'SELECT_RADIO'; payload: { category: string, value: string } }
  | { type: 'ADD_TRAITS'; }
  | { type: 'CLEAR_TRAITS'; }


export interface Country {
  countryId: string,
  countryName: string,
  countryLanguage: string,
  countryDescription: string,
  countryThemeColor: string
}
export interface Region {
  regionName: string,
  regionTheme: string,
  regionDescription: string,
  regionHistoryAndEconomy: string,
  firstNames: string[],
  lastStart: string[],
  lastEnd: string[],
  countries: Country[]
}