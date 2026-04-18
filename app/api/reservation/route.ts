import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://reserveereenvoudig.nl/AddReservering";
const BEDRIJFS_GUID = "6e0889dc3ea244c3bb87adacb5278f0e";

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

function formatDate(date: string): string {
  return date.replaceAll("-", "");
}

function formatTime(time: string): string {
  return `${time.replace(":", "")}00`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ReservationBody;

    if (
      !body.name ||
      !body.email ||
      !body.phone ||
      !body.date ||
      !body.time ||
      !body.guests
    ) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 },
      );
    }

    const query = new URLSearchParams({
      BedrijfsGUID: BEDRIJFS_GUID,
      nSelectedArrangementID: String(body.arrangementId ?? 0),
      tTijd: formatTime(body.time),
      dDatum: formatDate(body.date),
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
      sAllergenen: body.allergens ?? "00000000000000",
    });

    const response = await fetch(`${API_URL}?${query.toString()}`, {
      method: "GET",
      cache: "no-store",
    });

    const text = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Reservation API request failed.",
          providerStatus: response.status,
          providerResponse: text,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      providerResponse: text,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unexpected server error.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
