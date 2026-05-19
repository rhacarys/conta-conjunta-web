import { api } from "@/core/http/api";
import {
    ExpenseRequest,
    ExpenseResponse,
    JoinPartyRequest,
    PartyBalanceResponse,
    PartyRequest,
    PartyResponse,
} from "../types";

export const partyService = {
  // --- PARTIES ---
  getUserParties: async (): Promise<PartyResponse[]> => {
    const { data } = await api.get<PartyResponse[]>("/parties");
    return data;
  },

  createParty: async (request: PartyRequest): Promise<PartyResponse> => {
    const { data } = await api.post<PartyResponse>("/parties", request);
    return data;
  },

  updateParty: async (partyId: string, request: PartyRequest): Promise<PartyResponse> => {
    const { data } = await api.put<PartyResponse>(`/parties/${partyId}`, request);
    return data;
  },

  joinParty: async (request: JoinPartyRequest): Promise<PartyResponse> => {
    const { data } = await api.post<PartyResponse>("/parties/join", request);
    return data;
  },

  // --- MEMBERSHIP ---
  leaveParty: async (partyId: string): Promise<void> => {
    await api.delete(`/parties/${partyId}/members/me`);
  },

  kickMember: async (partyId: string, membershipId: string): Promise<void> => {
    await api.delete(`/parties/${partyId}/members/${membershipId}`);
  },

  // --- BALANCES ---
  getPartyBalances: async (partyId: string): Promise<PartyBalanceResponse> => {
    const { data } = await api.get<PartyBalanceResponse>(`/parties/${partyId}/balances`);
    return data;
  },

  // --- EXPENSES ---
  getPartyExpenses: async (partyId: string): Promise<ExpenseResponse[]> => {
    const { data } = await api.get<ExpenseResponse[]>(`/parties/${partyId}/expenses`);
    return data;
  },

  createExpense: async (partyId: string, request: ExpenseRequest): Promise<ExpenseResponse> => {
    const { data } = await api.post<ExpenseResponse>(`/parties/${partyId}/expenses`, request);
    return data;
  },

  deleteExpense: async (partyId: string, expenseId: string): Promise<void> => {
    await api.delete(`/parties/${partyId}/expenses/${expenseId}`);
  },
};
