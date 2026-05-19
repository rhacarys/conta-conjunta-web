// --- PARTIES ---
export interface PartyRequest {
  name: string;
  description?: string;
  currencyCode: string;
}

export interface PartyResponse {
  id: string; // uuid
  code: string;
  name: string;
  description?: string;
  currencyCode: string;
}

export interface JoinPartyRequest {
  code: string;
  alias: string;
}

// --- BALANCES & MEMBERS ---
export interface MemberBalance {
  membershipId: string; // uuid
  alias: string;
  balance: number;
}

export interface PartyBalanceResponse {
  partyId: string; // uuid
  balances: MemberBalance[];
}

// --- EXPENSES ---
export interface SplitRequest {
  debtorId: string; // uuid
  amount: number;
}

export interface SplitResponse {
  debtorId: string; // uuid
  amount: number;
}

export interface ExpenseRequest {
  description: string;
  amount: number;
  date: string; // date-time
  payerId: string; // uuid
  type: "PURCHASE" | "TRANSFER";
  splits: SplitRequest[];
}

export interface ExpenseResponse {
  id: string; // uuid
  description: string;
  amount: number;
  date: string; // date-time
  payerId: string; // uuid
  type: "PURCHASE" | "TRANSFER";
  splits: SplitResponse[];
}
