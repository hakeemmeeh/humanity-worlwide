from fpdf import FPDF

MARGIN = 15
PAGE_W = 210
CONTENT_W = PAGE_W - 2 * MARGIN


class PDF(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 16)
        self.cell(0, 10, "Humanity Worldwide (HWW)", new_x="LMARGIN", new_y="NEXT", align="C")
        self.set_font("Helvetica", "B", 13)
        self.cell(0, 8, "Website Requirements Checklist", new_x="LMARGIN", new_y="NEXT", align="C")
        self.ln(4)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.cell(0, 10, f"Page {self.page_no()}", align="C")

    def section_title(self, title: str) -> None:
        self.ln(3)
        self.set_x(MARGIN)
        self.set_font("Helvetica", "B", 11)
        self.set_fill_color(240, 244, 248)
        self.cell(CONTENT_W, 8, title, new_x="LMARGIN", new_y="NEXT", fill=True)
        self.ln(2)

    def checkbox_item(self, text: str) -> None:
        self.set_x(MARGIN)
        self.set_font("Helvetica", "", 10)
        self.multi_cell(CONTENT_W, 6, f"[ ]  {text}")


sections = [
    (
        "1. Brand & accuracy",
        [
            'Official HWW logo used (hands mark + "Humanity Worldwide" + "for a better world")',
            "No donor or partner names unless HWW has a verified direct relationship",
            "No named PDF reports listed - users contact HWW to request reports",
            "Program pages show what we do and where, not unverified stat blocks",
        ],
    ),
    (
        "2. Homepage",
        [
            "Site launches at / (homepage) with no redirect elsewhere",
            "Homepage does not open with a donation form - donation is via buttons/CTAs",
            "Homepage includes rich overview: programs, impact, regions, emergency, stories, news, partners, CTAs",
        ],
    ),
    (
        "3. About page",
        [
            "Mission reflects 4 countries: South Sudan, Somalia, Sudan, Kenya",
            'Quick stats: 4 Countries Served, 4 Core Pillars (no "7 regions" or "1M+" figures)',
            'Removed: "Journey of impact" timeline',
            "Removed: Leadership & field staff section",
            "Voices from the field: realistic stories linked to Education, Livelihoods, Protection, WASH",
        ],
    ),
    (
        "4. Programs & shelter",
        [
            "Program pages list implementation locations (states/counties/regions)",
            "Program pages do not show headline stat counters",
            "Shelter content describes work without naming unverified funders (e.g. KOICA, UNHCR)",
        ],
    ),
    (
        "5. Emergency response",
        [
            "Covers South Sudan, Sudan, Somalia - organized by country (and states where relevant)",
            "Crisis types included: floods, displacement, drought, conflict, etc.",
            "Jonglei flood response is an informational case story - no fundraising progress bar or appeal",
            'Bottom of Emergency Response page: "Donate to our emergency response" with country selector',
            "Emergency donation is general - not tied to the Jonglei appeal",
        ],
    ),
    (
        "6. Field documentaries",
        [
            "Section renamed: Field Documentaries & Successes (route: /media)",
            "News & press removed from this section (news remains at /news)",
        ],
    ),
    (
        "7. Navigation consistency",
        [
            "Same link labels in header, mobile menu, and footer Explore (single naming standard)",
            "Current labels include: About, Our Work, Where We Work, Emergency Response, Success Stories, Field Documentaries & Successes, News, Get Involved, Resources, Contact",
        ],
    ),
    (
        "8. Resources",
        [
            "Resources page = request via contact only (no downloadable report catalog)",
        ],
    ),
]

pdf = PDF()
pdf.set_margins(MARGIN, MARGIN, MARGIN)
pdf.set_auto_page_break(auto=True, margin=20)
pdf.add_page()
pdf.set_font("Helvetica", "", 10)

pdf.cell(0, 6, "Purpose: Confirm agreed scope before final launch.", new_x="LMARGIN", new_y="NEXT")
pdf.cell(0, 6, "Site: humanity-worldwide.org (Next.js static site)", new_x="LMARGIN", new_y="NEXT")
pdf.cell(0, 6, "Date: August 2026", new_x="LMARGIN", new_y="NEXT")
pdf.ln(4)
pdf.set_font("Helvetica", "I", 10)
pdf.multi_cell(CONTENT_W, 6, "Please review each item and mark Approved or note changes needed.")
pdf.ln(2)

for title, items in sections:
    pdf.section_title(title)
    for item in items:
        pdf.checkbox_item(item)

pdf.add_page()
pdf.section_title("Sign-off")

col_w = [50, 45, 55, 30]
pdf.set_x(MARGIN)
pdf.set_font("Helvetica", "B", 10)
for i, header in enumerate(["Role", "Name", "Signature", "Date"]):
    pdf.cell(col_w[i], 8, header, border=1)
pdf.ln()
pdf.set_font("Helvetica", "", 10)
for row in ["HWW representative", "Developer / agency"]:
    pdf.set_x(MARGIN)
    pdf.cell(col_w[0], 10, row, border=1)
    pdf.cell(col_w[1], 10, "", border=1)
    pdf.cell(col_w[2], 10, "", border=1)
    pdf.cell(col_w[3], 10, "", border=1)
    pdf.ln()

pdf.ln(6)
pdf.set_font("Helvetica", "B", 10)
pdf.cell(0, 6, "Notes / changes requested:", new_x="LMARGIN", new_y="NEXT")
pdf.ln(2)
pdf.set_font("Helvetica", "", 10)
for _ in range(3):
    pdf.set_x(MARGIN)
    pdf.cell(CONTENT_W, 8, "_" * 85, new_x="LMARGIN", new_y="NEXT")
    pdf.ln(2)

pdf.ln(6)
pdf.set_font("Helvetica", "I", 9)
pdf.multi_cell(
    CONTENT_W,
    5,
    "This checklist reflects requirements communicated during site review. Items marked complete in development should be verified on the live/staging site before final approval.",
)

pdf.output("CLIENT-REQUIREMENTS.pdf")
print("Created CLIENT-REQUIREMENTS.pdf")
