import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://reserveereenvoudig.nl/AddReservering";
const BEDRIJFS_GUID =
  process.env.RESERVATION_BEDRIJFS_GUID || "6e0889dc3ea244c3bb87adacb5278f0e";

type ReservationBody = {
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  message?: string;
  nation?: "NL" | "EN" | "DE";
  arrangementId?: number;
  waitingList?: 0 | 1;
  requestList?: 0 | 1;
  approval?: 0 | 1;
  allergens?: string;
};

function toBase64Url(value: string): string {
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function buildParams(body: ReservationBody, options: { rawDateTime: boolean }) {
  const dateValue = options.rawDateTime
    ? body.date
    : body.date.replaceAll("-", "");

  const timeValue = options.rawDateTime
    ? body.time
    : `${body.time.replace(":", "")}00`;

  return new URLSearchParams({
    BedrijfsGUID: BEDRIJFS_GUID,
    nSelectedArrangementID: String(body.arrangementId ?? 0),
    tTijd: timeValue,
    dDatum: dateValue,
    nAantalPersonen: String(body.guests),
    sEmail: toBase64Url(body.email),
    sTelefoon: toBase64Url(body.phone),
    sOpmerking: toBase64Url(body.message ?? ""),
    sNaam: toBase64Url(body.name),
    sNation: body.nation ?? "EN",
    bZetOpWachtlijst: String(body.waitingList ?? 0),
    bZetOpAanvraag: String(body.requestList ?? 0),
    Goedkeuring: String(body.approval ?? 0),
    tGeselecteerdeEindTijd: "000000",
    tGeselecteerdeActiviteitTijd: "000000",
    sGeselecteerdeActiviteitTijdTekst: "",
    sVervolgkeuzes: "",
    Bron: "8",
    sAllergenen: (body.allergens ?? "000000000000000")
      .padEnd(15, "0")
      .slice(0, 15),
  });
}

async function callProvider(
  label: string,
  method: "GET" | "POST",
  params: URLSearchParams,
) {
  let response: Response;

  if (method === "GET") {
    response = await fetch(`${API_URL}?${params.toString()}`, {
      method: "GET",
      cache: "no-store",
    });
  } else {
    response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
      cache: "no-store",
    });
  }

  const text = await response.text();

  return {
    label,
    ok: response.ok,
    status: response.status,
    providerResponse: text,
    sentParams: Object.fromEntries(params.entries()),
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ReservationBody;

    const formattedParams = buildParams(body, { rawDateTime: false });
    const rawParams = buildParams(body, { rawDateTime: true });

    const results = await Promise.all([
      callProvider("GET + formatted date/time", "GET", formattedParams),
      callProvider("POST + formatted date/time", "POST", formattedParams),
      callProvider("GET + raw date/time", "GET", rawParams),
      callProvider("POST + raw date/time", "POST", rawParams),
    ]);

    const firstSuccess = results.find((r) => r.ok);

    return NextResponse.json(
      {
        success: Boolean(firstSuccess),
        recommended: firstSuccess ?? null,
        attempts: results,
      },
      { status: firstSuccess ? 200 : 400 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unexpected server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
