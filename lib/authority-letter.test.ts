import { it, expect } from "vitest";
import { PDFDocument } from "pdf-lib";
import { makeAuthorityLetter } from "../convex/lib/authority_letter";
it("makes a short authority PDF with the typed English or Hindi name", async () => {
  for (const name of ["Demo Passenger", "नमूना यात्री"]) {
    const bytes = await makeAuthorityLetter({
      code: "RG-SAMPLE",
      name,
      mobile: "0000000000",
      email: "test@example.invalid",
      company: "Demo Air and DemoTrips",
      pnr: "SAMPLE",
      authorisedAt: 0,
    });
    expect((await PDFDocument.load(bytes)).getPageCount()).toBe(1);
    expect(bytes.length).toBeGreaterThan(1000);
  }
});
