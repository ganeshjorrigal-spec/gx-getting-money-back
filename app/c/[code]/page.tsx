import CaseView from "../case-view";

export default async function CasePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <CaseView code={code} />;
}
