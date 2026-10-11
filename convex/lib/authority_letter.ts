import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { authorityFont } from "./authority_font";
import { authorityLine } from "../../lib/chase";

export async function makeAuthorityLetter(details: {
  code: string;
  name: string;
  mobile: string;
  email: string;
  company: string;
  pnr: string;
  authorisedAt: number;
}) {
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  const font = await pdf.embedFont(Buffer.from(authorityFont, "base64"), {
    subset: true,
  });
  let page = pdf.addPage([595, 842]),
    y = 790;
  for (const paragraph of [
    "Letter of authority",
    `Case: ${details.code}`,
    `Passenger: ${details.name}`,
    `Mobile: ${details.mobile}`,
    `Email: ${details.email}`,
    authorityLine(details.company, details.pnr),
    `Authorised: ${new Date(details.authorisedAt).toISOString()}`,
  ]) {
    let line = "";
    for (const word of paragraph.split(" ")) {
      if (font.widthOfTextAtSize(line + word, 12) > 480) {
        page.drawText(line, { x: 50, y, size: 12, font });
        y -= 20;
        line = "";
      }
      line += word + " ";
    }
    page.drawText(line, { x: 50, y, size: 12, font });
    y -= 30;
    if (y < 80) {
      page = pdf.addPage([595, 842]);
      y = 790;
    }
  }
  return pdf.save();
}
