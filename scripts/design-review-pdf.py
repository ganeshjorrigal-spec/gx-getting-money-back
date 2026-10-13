from pathlib import Path
import json
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont as ReportFont
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from PIL import Image
import pymupdf as fitz
root=Path('docs/design/logo-candidates')
qa=Path('docs/qa/d045-assets-2026-10-13');qa.mkdir(parents=True,exist_ok=True)
tmp=Path('tmp/pdfs');tmp.mkdir(parents=True,exist_ok=True)
font=TTFont(root/'fraunces-latin.woff2');font.flavor=None
if 'fvar' in font:font=instantiateVariableFont(font,{a.axisTag:(700 if a.axisTag=='wght' else a.defaultValue) for a in font['fvar'].axes},inplace=True)
font.save(tmp/'fraunces.ttf');pdfmetrics.registerFont(ReportFont('Fraunces',str(tmp/'fraunces.ttf')))
path=root/'refund-genie-d045-review.pdf';c=canvas.Canvas(str(path),pagesize=(595,842));c.setTitle('Refund Genie D-045 draft review');c.setAuthor('Refund Genie')
style=ParagraphStyle('body',fontName='Helvetica',fontSize=11,leading=16,textColor=HexColor('#14213d'))
page=0
def paragraph(text,x,y,width=495):
 p=Paragraph(text,style);w,h=p.wrap(width,700);p.drawOn(c,x,y-h);return y-h-18
def base(title,subtitle):
 global page
 page+=1;c.setFillColor(HexColor('#f7f6f1'));c.rect(0,0,595,842,fill=1,stroke=0);c.setFillColor(HexColor('#14213d'));c.setFont('Fraunces',24);c.drawString(50,788,title);paragraph(subtitle,50,760);c.setFont('Helvetica',9);c.drawString(50,24,f'13 Oct 2026 | low-quality drafts only | {page}')
def image(file,x,y,w,h=None):
 im=Image.open(root/file);h=h or w*im.height/im.width;c.drawImage(ImageReader(im),x,y,width=w,height=h,mask='auto')
base('Refund Genie asset review','D-045: Mark 5 refinements, six original genies and revised home scenes. Original candidates are included for comparison.')
paragraph('Ganesh picked original Mark 5 as the direction. The curling smoke-arrow refinements and mascot remain draft candidates. No final, SVG, favicon or product placement is authorised.',50,650)
paragraph('New batch: 12 low-quality images. The spend ledger counts every attempt, including retries, against 40. See the repository ledger for the exact final count; estimated requests are not billed costs.',50,540)
paragraph('Review the mark at 32/48/64px, the mascot full body and its 64px head, and the two home scenes. Everything shown is original draft art from text prompts, not copied reference images.',50,430)
paragraph('Known original-draft issues: broad margins reduce apparent mark size; mark 8 reads as a table lamp; home scenes had airport-style boards. New variants are next in this PDF. No new generation is automatic.',50,320)
c.showPage()
for id,title in [(f'logo-{i}.png',f'Original Mark {i}'+(' - picked direction' if i==5 else '')) for i in range(1,9)]+[(f'd045-logo-{i}.png',f'Smoke logo {i}') for i in range(1,5)]:
 base(title,'Navy on warm paper. Fraunces wordmark is typeset separately. Compare small-size clarity.');image(id,175,430,245)
 if id.startswith('d045-'):image('logo-5.png',65,535,75);c.setFont('Helvetica',9);c.drawString(58,522,'Original Mark 5')
 for pixels,y in [(32,340),(48,260),(64,170)]:
  points=pixels*.75;image(id,60,y,points,points);c.setFont('Fraunces',22);c.setFillColor(HexColor('#14213d'));c.drawString(135,y+8,'Refund Genie');c.setFont('Helvetica',10);c.drawString(415,y+8,f'{pixels}px mark')
 c.showPage()
for i in range(1,7):
 base(f'Mascot {i}','Original friendly genie. Full body below, plus a 64px head. Draft, not approved for placement.');image(f'd045-mascot-{i}.webp',55,220,485);image(f'd045-mascot-{i}-head.png',70,110,48,48);c.setFont('Helvetica',11);c.drawString(145,127,'64px head');c.showPage()
for id,title in [(f'{id}-draft.webp',f'Original scene: {id}') for id in ['airport','on-hold','refund-coming','family']]+[('d045-on-hold.webp','Revised scene: on hold'),('d045-refund-coming.webp','Revised scene: refund coming')]:
 base(title,'Accepted scene direction / low-quality revision. No brand logos or words inside the art.');image(id,55,220,485);c.showPage()
c.save()
doc=fitz.open(path);assert len(doc)==25
for i,p in enumerate(doc):p.get_pixmap(matrix=fitz.Matrix(.6,.6)).save(qa/f'pdf-{i+1:02}.png')
# A contact sheet is a quick whole-document layout check, not a substitute for selected page review.
thumbs=[Image.open(qa/f'pdf-{i+1:02}.png').convert('RGB') for i in range(len(doc))]
w,h=thumbs[0].size;sheet=Image.new('RGB',(w*5,h*5),'white')
for i,im in enumerate(thumbs):sheet.paste(im,((i%5)*w,(i//5)*h))
sheet.save(qa/'pdf-contact-sheet.jpg')
print(f'Created and rendered {len(doc)} review pages. PDF bytes: {path.stat().st_size}')
