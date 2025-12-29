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
  languages?: string[];
  backgrounds?: string[];
  martialArts?: string[];
  fieldRoles?: string[];
};

export type Agent = {
  id: number,
  name: string,
  specialty: string,
  status: "Untrained" | "Trained" | "Active" | "Retired" | "InTraining", // Union literal type restricts values
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

interface Action {
  type: "handleCheckBoxChange" | "handleRadioChange" | "addTraits" | "clearList"
  payload?: {
    traits?: SorterTraits
  }
}
