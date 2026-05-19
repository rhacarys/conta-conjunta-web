"use client";

export default function PartyPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Party {params.id}</h1>
      <p>Welcome to the party page.</p>
    </div>
  );
}

export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return [];
}
